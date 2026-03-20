import heapq

def prim_msf(n, adj):
    visited = [False] * n
    result = []

    for start in range(n):
        if visited[start]:
            continue

        pq = [(0, start, -1)]  # (weight, node, parent)

        while pq:
            w, u, parent = heapq.heappop(pq)

            if visited[u]:
                continue

            visited[u] = True

            if parent != -1:
                result.append((min(parent, u), max(parent, u), w))

            for v, weight in adj[u]:
                if not visited[v]:
                    heapq.heappush(pq, (weight, v, u))

    # sort lexicographically when weights equal
    result.sort(key=lambda x: (x[2], x[0], x[1]))

    return result


n = 4
adj = {
    0: [(1, 1), (2, 4)],
    1: [(0, 1), (2, 2), (3, 5)],
    2: [(0, 4), (1, 2)],
    3: [(1, 5)]
}

print(prim_msf(n, adj))