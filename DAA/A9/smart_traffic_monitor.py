import random
import time
from bisect import bisect_left, insort_left
import heapq
from typing import Dict, List, Tuple


class TrafficMonitorBase:
    def update_traffic(self, intersection_id: int, level: int):
        raise NotImplementedError

    def get_most_congested(self) -> Tuple[int, int]:
        raise NotImplementedError

    def top_k_congested(self, k: int) -> List[Tuple[int, int]]:
        raise NotImplementedError


class TrafficMonitorList(TrafficMonitorBase):
    def __init__(self, initial_data: Dict[int, int]):
        self.data = list(initial_data.items())  # list of (id, level)
        self.id_to_index = {i: idx for idx, (i, _) in enumerate(self.data)}
        self._sort_desc()

    def _sort_desc(self):
        self.data.sort(key=lambda x: (-x[1], x[0]))
        self.id_to_index = {i: idx for idx, (i, _) in enumerate(self.data)}

    def update_traffic(self, intersection_id: int, level: int):
        if intersection_id in self.id_to_index:
            idx = self.id_to_index[intersection_id]
            self.data[idx] = (intersection_id, level)
        else:
            self.data.append((intersection_id, level))
        self._sort_desc()

    def get_most_congested(self) -> Tuple[int, int]:
        return self.data[0] if self.data else (-1, -1)

    def top_k_congested(self, k: int) -> List[Tuple[int, int]]:
        return self.data[:k]


# 2) Priority Queue using binary heap (max-heap via negative level), lazy deletion
class TrafficMonitorHeap(TrafficMonitorBase):
    def __init__(self, initial_data: Dict[int, int]):
        self.heap: List[Tuple[int, int]] = []
        self.current_level: Dict[int, int] = {}
        for i, level in initial_data.items():
            self.current_level[i] = level
            heapq.heappush(self.heap, (-level, i))

    def update_traffic(self, intersection_id: int, level: int):
        self.current_level[intersection_id] = level
        heapq.heappush(self.heap, (-level, intersection_id))

    def _pop_valid(self) -> Tuple[int, int]:
        while self.heap:
            neg_level, i = self.heap[0]
            lvl = -neg_level
            if self.current_level.get(i) == lvl:
                return i, lvl
            heapq.heappop(self.heap)
        return -1, -1

    def get_most_congested(self) -> Tuple[int, int]:
        i, lvl = self._pop_valid()
        return (i, lvl)

    def top_k_congested(self, k: int) -> List[Tuple[int, int]]:
        result = []
        popped = []
        while len(result) < k and self.heap:
            i, lvl = self._pop_valid()
            if i == -1:
                break
            result.append((i, lvl))
            popped.append((-lvl, i))
            heapq.heappop(self.heap)
        for item in popped:
            heapq.heappush(self.heap, item)
        return result


# 3) Balanced Binary Search Tree (sorted list approximation)
class TrafficMonitorBST(TrafficMonitorBase):
    def __init__(self, initial_data: Dict[int, int]):
        self.id_to_level: Dict[int, int] = initial_data.copy()
        self.sorted: List[Tuple[int, int]] = []  # (-level, id)
        for i, lvl in initial_data.items():
            self.sorted.append((-lvl, i))
        self.sorted.sort()

    def update_traffic(self, intersection_id: int, level: int):
        old_level = self.id_to_level.get(intersection_id)
        self.id_to_level[intersection_id] = level
        if old_level is not None:
            key = (-old_level, intersection_id)
            idx = bisect_left(self.sorted, key)
            if idx < len(self.sorted) and self.sorted[idx] == key:
                self.sorted.pop(idx)
        insort_left(self.sorted, (-level, intersection_id))

    def get_most_congested(self) -> Tuple[int, int]:
        if not self.sorted:
            return -1, -1
        level_neg, i = self.sorted[0]
        return i, -level_neg

    def top_k_congested(self, k: int) -> List[Tuple[int, int]]:
        return [(i, -level_neg) for level_neg, i in self.sorted[:k]]


# Benchmark harness
def benchmark(intersections: int, updates: int, queries: int, top_k: int):
    random.seed(0)
    initial_data = {i: random.randint(0, 100) for i in range(intersections)}
    updates_data = [(random.randrange(intersections), random.randint(0, 100)) for _ in range(updates)]

    monitors = {
        'list': TrafficMonitorList(initial_data),
        'heap': TrafficMonitorHeap(initial_data),
        'bst': TrafficMonitorBST(initial_data),
    }

    results = {}

    for name, monitor in monitors.items():
        t0 = time.perf_counter()
        for inter_id, level in updates_data:
            monitor.update_traffic(inter_id, level)
        t1 = time.perf_counter()

        for _ in range(queries):
            monitor.get_most_congested()
        t2 = time.perf_counter()

        for _ in range(queries):
            monitor.top_k_congested(top_k)
        t3 = time.perf_counter()

        results[name] = {
            'update_time': t1 - t0,
            'get_time': (t2 - t1) / queries,
            'topk_time': (t3 - t2) / queries,
        }

    return results


def run_experiment():
    sizes = [100, 500, 1000, 5000, 10000]
    updates = 10000
    queries = 1000
    top_k = 10

    report = []
    print('n, structure, update_time(s), avg_get_time(s), avg_topk_time(s)')
    for n in sizes:
        r = benchmark(n, updates, queries, top_k)
        for name, stats in r.items():
            print(f'{n}, {name}, {stats["update_time"]:.6f}, {stats["get_time"]:.9f}, {stats["topk_time"]:.9f}')
            report.append((n, name, stats))
    return report


if __name__ == '__main__':
    run_experiment()
