import math
def distance(p1,p2):
    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

def closest(points):
    min_dist=float('inf')
    pair = None

    for i in range(len(points)):
        for j in range(i+1,len(points)):
            d=distance(points[i],points[j])
            if d< min_dist:
                min_dist=distance(points[i],points[j])
    return pair ,min_dist
points = [(2,3), (12,30), (40,50), (5,1), (12,10)]

pair, dist = closest(points)

print("Points:", points)
print("Length:", len(points))
print("Closest Pair =", pair)
print("Minimum Distance =", round(dist, 2))