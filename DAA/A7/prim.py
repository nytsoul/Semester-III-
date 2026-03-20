"""Prim's algorithm for Minimum Spanning Forest (handles disconnected graphs)."""
import heapq
from collections import defaultdict
from typing import List, Tuple


def prim_msf(n: int, edges: List[Tuple[int, int, int]]) -> Tuple[List[Tuple[int, int, int]], float]:
    g = defaultdict(list)
    for u, v, w in edges:
        g[u].append((w, u, v))
        g[v].append((w, v, u))

    used = [False] * n
    all_mst_edges: List[Tuple[int, int, int]] = []
    total = 0.0

    for start in range(n):
        if used[start]:
            continue
        pq = []
        used[start] = True
        for edge in g[start]:
            heapq.heappush(pq, edge)

        while pq:
            w, u, v = heapq.heappop(pq)
            if used[v]:
                continue
            used[v] = True
            all_mst_edges.append((u, v, w))
            total += w
            for nxt in g[v]:
                if not used[nxt[2]]:
                    heapq.heappush(pq, nxt)

    all_mst_edges.sort(key=lambda x: (x[2], min(x[0], x[1]), max(x[0], x[1])))
    return all_mst_edges, total


if __name__ == '__main__':
    n = int(input('Vertices: ').strip())
    m = int(input('Edges: ').strip())
    edges = [tuple(map(int, input('u v w: ').split())) for _ in range(m)]
    mst_edges, total = prim_msf(n, edges)
    print('Prim MSF edges:')
    for u, v, w in mst_edges:
        print(u, v, w)
    print('Total:', total)
