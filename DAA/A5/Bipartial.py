def bpm(graph, u, visited, matchR):
    for v in graph[u]:
        if not visited[v]:
            visited[v] = True

            if matchR[v] == -1 or bpm(graph, matchR[v], visited, matchR):
                matchR[v] = u
                return True
    return False
def max_bipartite_matching(graph, left_nodes, right_nodes):
    matchR = {v: -1 for v in right_nodes}
    result = 0

    for u in left_nodes:
        visited = {v: False for v in right_nodes}
        if bpm(graph, u, visited, matchR):
            result += 1

    return result, matchR

graph = {
    "A1": ["J1", "J2"],
    "A2": ["J1"],
    "A3": ["J2", "J3"]
}

left = ["A1", "A2", "A3"]
right = ["J1", "J2", "J3"]

max_match, matching = max_bipartite_matching(graph, left, right)

print("Maximum Matching Size =", max_match)
print("Matching:")
for job in matching:
    if matching[job] != -1:
        print(matching[job], "-", job)