def dfs(residual, source, sink, visited, parent):
    visited.add(source)

    if source == sink:
        return True

    for neighbor in residual[source]:
        if neighbor not in visited and residual[source][neighbor] > 0:
            parent[neighbor] = source
            if dfs(residual, neighbor, sink, visited, parent):
                return True
    return False


def ford_fulkerson(graph, source, sink):
    residual = {u: dict(v) for u, v in graph.items()}
    max_flow = 0

    while True:
        visited = set()
        parent = {}
        if not dfs(residual, source, sink, visited, parent):
            break

        path_flow = float("inf")
        s = sink
        while s != source:
            path_flow = min(path_flow, residual[parent[s]][s])
            s = parent[s]

        s = sink
        while s != source:
            u = parent[s]
            residual[u][s] -= path_flow
            if s not in residual:
                residual[s] = {}
            residual[s][u] = residual[s].get(u, 0) + path_flow
            s = parent[s]

        max_flow += path_flow

    return max_flow


# Sample Input
graph = {
    "S": {"A": 10, "B": 5},
    "A": {"B": 15, "T": 10},
    "B": {"T": 10},
    "T": {}
}

max_flow = ford_fulkerson(graph, "S", "T")

print("Maximum Flow =", max_flow)