"""Kruskal's algorithm for Minimum Spanning Tree / Forest (supports negative weights)."""

class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False
        if self.rank[rx] < self.rank[ry]:
            self.parent[rx] = ry
        elif self.rank[ry] < self.rank[rx]:
            self.parent[ry] = rx
        else:
            self.parent[ry] = rx
            self.rank[rx] += 1
        return True


def kruskal_msf(n, edges):
    edges_sorted = sorted(edges, key=lambda x: (x[2], min(x[0], x[1]), max(x[0], x[1])))
    dsu = DSU(n)
    chosen = []
    cost = 0
    for u, v, w in edges_sorted:
        if dsu.union(u, v):
            chosen.append((u, v, w))
            cost += w
    return chosen, cost


if __name__ == '__main__':
    n = int(input('Vertices: ').strip())
    m = int(input('Edges: ').strip())
    edges = [tuple(map(int, input('u v w: ').split())) for _ in range(m)]
    chosen, cost = kruskal_msf(n, edges)
    print('Kruskal MST edges:')
    for u, v, w in chosen:
        print(u, v, w)
    print('Total:', cost)
