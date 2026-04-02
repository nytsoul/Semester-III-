
import heapq
class uniformcostsearch:
    def __init__(self,graph):
        self.graph=graph
    def ucs (self,start,goal):
        pq=[]
        heapq.heappush(pq,(0,start))
        visited=set()
        while pq:
            cost,node=heapq.heappop(pq)

            if node in visited:
                continue
            visited.add(node)

            if node==goal:
                return cost
            for neighbor,weighted in self.graph[node]:
                if neighbor not in visited:
                    heapq.heappush(pq,(cost+weighted,neighbor))
        return -1

graph={
    'A': [('B', 1), ('C', 4)],
    'B': [('D', 2), ('E', 5)],
    'C': [('F', 3)],
    'D': [],
    'E': [('G', 1)],
    'F': [],
    'G': []

}
ucs=uniformcostsearch(graph)
print("minimum:",ucs.ucs('A','G'))
