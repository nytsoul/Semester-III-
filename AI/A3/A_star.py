import heapq

# Manhattan distance heuristic
def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def a_star(grid):
    rows, cols = len(grid), len(grid[0])

    # Locate start and exits
    exits = []
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == 'S':
                start = (i, j)
            if grid[i][j] == 'E':
                exits.append((i, j))

    open_list = []
    heapq.heappush(open_list, (0, 0, start))
    came_from = {}
    g_cost = {start: 0}
    visited = set()

    nodes_expanded = 0

    while open_list:
        _, g, current = heapq.heappop(open_list)
        nodes_expanded += 1

        if current in exits:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            path.reverse()
            return path, nodes_expanded

        visited.add(current)

        x, y = current
        for dx, dy in [(1,0), (-1,0), (0,1), (0,-1)]:
            nx, ny = x + dx, y + dy
            neighbor = (nx, ny)

            if 0 <= nx < rows and 0 <= ny < cols:
                if grid[nx][ny] == '#' or neighbor in visited:
                    continue

                new_g = g + 1
                if neighbor not in g_cost or new_g < g_cost[neighbor]:
                    g_cost[neighbor] = new_g
                    h = min(heuristic(neighbor, e) for e in exits)
                    f = new_g + h
                    heapq.heappush(open_list, (f, new_g, neighbor))
                    came_from[neighbor] = current

    return None, nodes_expanded


# ---------------- GRID 1 (7 x 7) ----------------
grid1 = [
    ['S','.','.','.','.','.','.'],
    ['#','#','#','#','#','#','.'],
    ['.','.','.','.','.','#','.'],
    ['.','#','#','#','.','#','.'],
    ['.','.','.','#','.','#','E'],
    ['.','#','.','#','.','.','.'],
    ['.','#','.','.','.','.','.']
]

# ---------------- GRID 2 (9 x 9) ----------------
grid2 = [
    ['S','.','.','.','.','.','.','.','.'],
    ['#','#','#','#','#','.','#','#','#'],
    ['.','.','.','.','#','.','.','.','#'],
    ['.','#','#','.','#','#','#','.','#'],
    ['.','#','.','.','.','.','.','.','.'],
    ['.','#','.','#','#','#','#','#','.'],
    ['.','.','.','.','.','.','.','.','.'],
    ['#','#','#','#','#','.','#','#','#'],
    ['.','.','.','.','.','.','.','.','E']
]

# ---------------- RUN TEST CASES ----------------
for idx, grid in enumerate([grid1, grid2], start=1):
    path, nodes = a_star(grid)
    print(f"\nGrid {idx} Results:")
    if path:
        print("Path:", path)
        print("Path Length:", len(path) - 1)
    else:
        print("No path found")
    print("Nodes Expanded:", nodes)
