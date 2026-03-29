from dataclasses import dataclass
from typing import List, Dict, Tuple
import heapq

@dataclass
class Region:
    id: str
    priority: int
    demand: int
    deadline: int
    unit_cost: float
    travel_time: int

@dataclass
class Truck:
    id: str
    capacity: int
    available_time: int = 0
    load: int = 0

def greedy_relief(regions: List[Region], trucks: List[Truck]) -> Tuple[List[Tuple[str, str]], float]:
    regions_sorted = sorted(
        regions,
        key=lambda r: (r.priority / (r.unit_cost + 1e-9)) / (r.deadline + 1),
        reverse=True,
    )

    assignments = []
    total_cost = 0.0

    for region in regions_sorted:
        for truck in sorted(trucks, key=lambda t: t.available_time):
            if (truck.capacity - truck.load) >= region.demand:
                arrival = truck.available_time + region.travel_time
                if arrival <= region.deadline:
                    truck.load += region.demand
                    truck.available_time = arrival
                    assignments.append((region.id, truck.id))
                    total_cost += region.unit_cost * region.demand
                    break

    return assignments, total_cost

class Edge:
    def __init__(self, v: int, cap: int, cost: float, rev: int):
        self.v = v
        self.cap = cap
        self.cost = cost
        self.rev = rev

class MinCostMaxFlow:
    def __init__(self, n: int):
        self.n = n
        self.adj = [[] for _ in range(n)]

    def add_edge(self, u: int, v: int, cap: int, cost: float):
        self.adj[u].append(Edge(v, cap, cost, len(self.adj[v])))
        self.adj[v].append(Edge(u, 0, -cost, len(self.adj[u]) - 1))

    def min_cost_flow(self, s: int, t: int, maxf: int) -> Tuple[int, float]:
        n = self.n
        dist = [0.0] * n
        potential = [0.0] * n
        parent_v = [0] * n
        parent_e = [0] * n
        flow = 0
        cost = 0.0

        while flow < maxf:
            for i in range(n):
                dist[i] = float('inf')
            dist[s] = 0
            pq = [(0, s)]

            while pq:
                d, u = heapq.heappop(pq)
                if d > dist[u]:
                    continue
                for i, e in enumerate(self.adj[u]):
                    if e.cap > 0:
                        nd = d + e.cost + potential[u] - potential[e.v]
                        if nd < dist[e.v]:
                            dist[e.v] = nd
                            parent_v[e.v] = u
                            parent_e[e.v] = i
                            heapq.heappush(pq, (nd, e.v))

            if dist[t] == float('inf'):
                break

            for v in range(n):
                if dist[v] < float('inf'):
                    potential[v] += dist[v]

            addf = maxf - flow
            v = t
            while v != s:
                u = parent_v[v]
                e = self.adj[u][parent_e[v]]
                addf = min(addf, e.cap)
                v = u

            v = t
            while v != s:
                u = parent_v[v]
                e = self.adj[u][parent_e[v]]
                e.cap -= addf
                self.adj[v][e.rev].cap += addf
                cost += addf * e.cost
                v = u

            flow += addf

        return flow, cost


def mcmf_relief(regions: List[Region], trucks: List[Truck]) -> Tuple[List[Tuple[str, str]], float, int]:
    n_trucks = len(trucks)
    n_regions = len(regions)

    node_source = 0
    node_trucks = 1
    node_regions = 1 + n_trucks
    node_sink = node_regions + n_regions
    mcmf = MinCostMaxFlow(node_sink + 1)

    total_demand = 0

    for i, truck in enumerate(trucks):
        mcmf.add_edge(node_source, node_trucks + i, truck.capacity, 0.0)

    for j, region in enumerate(regions):
        mcmf.add_edge(node_regions + j, node_sink, region.demand, 0.0)
        total_demand += region.demand

    for i, truck in enumerate(trucks):
        for j, region in enumerate(regions):
            if truck.available_time + region.travel_time <= region.deadline:
                base = region.unit_cost * region.demand
                priority_adjustment = -region.priority * 1000.0
                cost = base + priority_adjustment
                mcmf.add_edge(node_trucks + i, node_regions + j, region.demand, cost)

    flow, total_cost = mcmf.min_cost_flow(node_source, node_sink, total_demand)

    assignments = []
    for i, truck in enumerate(trucks):
        u = node_trucks + i
        for idx, e in enumerate(mcmf.adj[u]):
            # edges to region nodes originally have positive rev cost or not
            if node_regions <= e.v < node_regions + n_regions:
                region_index = e.v - node_regions
                used = regions[region_index].demand - e.cap
                if used > 0:
                    assignments.append((regions[region_index].id, truck.id))
\
    pure_transport_cost = 0.0
    for r_id, t_id in assignments:
        region = next(r for r in regions if r.id == r_id)
        pure_transport_cost += region.unit_cost * region.demand
    return assignments, pure_transport_cost, flow

def sample_run():
    regions = [
        Region('R1', priority=5, demand=8, deadline=7, unit_cost=10.0, travel_time=3),
        Region('R2', priority=4, demand=6, deadline=5, unit_cost=8.0, travel_time=2),
        Region('R3', priority=2, demand=5, deadline=9, unit_cost=4.0, travel_time=5),
        Region('R4', priority=1, demand=3, deadline=6, unit_cost=3.0, travel_time=1),
    ]

    trucks = [
        Truck('T1', capacity=10),
        Truck('T2', capacity=8),
    ]

    print('--- Greedy solution ---')
    greedy_assignments, greedy_cost = greedy_relief([r for r in regions], [t for t in trucks])
    print('Assigned regions -> trucks:', greedy_assignments)
    print('Total transportation cost (greedy):', greedy_cost)

    print('\n--- Min-cost max-flow solution ---')
    mcmf_assignments, mcmf_cost, served_flow = mcmf_relief([r for r in regions], [t for t in trucks])
    print('Assigned regions -> trucks:', mcmf_assignments)
    print('Total transport cost (MCMF):', mcmf_cost)
    print('Total served units:', served_flow)


if __name__ == '__main__':
    sample_run()
