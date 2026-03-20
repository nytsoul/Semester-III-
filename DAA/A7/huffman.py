import heapq

def dijkstra(n, adj, source):
    dist = [float('inf')] * n
    dist[source] = 0

    pq = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist[u]:
            continue

        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))

    return dist


# Example
adj = {
    0: [(1, 4), (2, 1)],
    1: [(3, 1)],
    2: [(1, 2), (3, 5)],
    3: []
}

print(dijkstra(4, adj, 0))