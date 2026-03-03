import math

# track best solution found so far
BEST_ROUTE = None
BEST_COST = math.inf


def branch_bound_route(dist, visited, current, cost, n):
    global BEST_ROUTE, BEST_COST
    # if we have visited all locations, try to return to start
    if len(visited) == n:
        if dist[current][0] == math.inf:
            return  # cannot return
        total_cost = cost + dist[current][0]
        if total_cost < BEST_COST:
            BEST_COST = total_cost
            BEST_ROUTE = visited + [0]
        return
    # compute a very simple lower bound: add smallest outgoing edges
    lb = cost
    # cheapest move from current to any unvisited
    min_edge = min(dist[current][j] for j in range(n) if j not in visited and dist[current][j] < math.inf)
    lb += min_edge
    # for each other unvisited, add its cheapest outgoing edge (or to base)
    for j in range(n):
        if j not in visited:
            lb += min(dist[j][k] for k in range(n) if k not in visited or k == 0)
    # prune if even this optimistic estimate is worse than best
    if lb >= BEST_COST:
        return
    # try each next location
    for j in range(1, n):
        if j not in visited and dist[current][j] < math.inf:
            branch_bound_route(dist, visited + [j], j, cost + dist[current][j], n)


def solve_emergency(dist):
    # entry point: dist is a matrix of travel times, inf for blocked
    global BEST_ROUTE, BEST_COST
    n = len(dist)
    BEST_ROUTE = None
    BEST_COST = math.inf
    branch_bound_route(dist, [0], 0, 0, n)
    return BEST_ROUTE, BEST_COST


if __name__ == "__main__":
    # example distance matrix; math.inf represents blocked routes
    dist = [
        [0, 10, 8, math.inf],
        [10, 0, 5, 3],
        [8, 5, 0, 7],
        [math.inf, 3, 7, 0]
    ]
    route, cost = solve_emergency(dist)
    print(f"Best route: {route}")
    print(f"Minimum time = {cost}")
