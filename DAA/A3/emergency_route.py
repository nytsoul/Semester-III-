INF = 999

g = [
    [INF,10,15,20],
    [10,INF,35,25],
    [15,35,INF,30],
    [20,25,30,INF]
]

n = 4
vis = [0]*n
ans = INF

def tsp(u, cnt, cost):
    global ans
    if cnt == n:
        ans = min(ans, cost + g[u][0])
        return
    for v in range(n):
        if not vis[v] and g[u][v] != INF:
            vis[v] = 1
            tsp(v, cnt+1, cost+g[u][v])
            vis[v] = 0

vis[0] = 1
tsp(0,1,0)

print(ans)