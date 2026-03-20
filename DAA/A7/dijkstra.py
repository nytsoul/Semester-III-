"""Dijkstra's Shortest Path algorithm (single source, non-negative weights)."""
import heapq


def dijkstra(n, edges, source):
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        graph[u].append((v, w))

    dist = [float('inf')] * n
    parent = [-1] * n
    dist[source] = 0

    pq = [(0, source)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                parent[v] = u
                heapq.heappush(pq, (nd, v))

    return dist, parent


def path(parent, t):
    if parent[t] == -1:
        return [t]
    p = []
    while t != -1:
        p.append(t)
        t = parent[t]
    return list(reversed(p))


if __name__ == '__main__':
    n = int(input('Vertices: ').strip())
    m = int(input('Edges: ').strip())
    edges = [tuple(map(int, input('u v w: ').split())) for _ in range(m)]
    s = int(input('Source: ').strip())
    dist, parent = dijkstra(n, edges, s)
    print('Distances from', s)
    for i in range(n):
        if dist[i] == float('inf'):
            print(i, 'inf')
        else:
            print(i, dist[i], 'path', '->'.join(map(str, path(parent, i))))
    print('\nDijkstra failure case: negative edge weights possible cause incorrect answer, e.g., 0->1(4), 0->2(1), 2->1(-3).')
