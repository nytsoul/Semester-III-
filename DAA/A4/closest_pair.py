
import math
def distance(p1, p2):
    return math.hypot(p1[0] - p2[0], p1[1] - p2[1])


def brute_force(points):
    best = float('inf')
    best_pair = None
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            d = distance(points[i], points[j])
            if d < best:
                best = d
                best_pair = (points[i], points[j])
    return best, best_pair

def strip_closest(strip, d):
    best = d
    best_pair = None
    for i in range(len(strip)):
        j = i + 1
        while j < len(strip) and (strip[j][1] - strip[i][1]) < best:
            dist = distance(strip[i], strip[j])
            if dist < best:
                best = dist
                best_pair = (strip[i], strip[j])
            j += 1
    return best, best_pair



def closest_pair_rec(px, py):
    if len(px) <= 3:
        return brute_force(px)
    mid = len(px) // 2
    mid_x = px[mid][0]
    left_x = px[:mid]
    right_x = px[mid:]

    left_y = [p for p in py if p[0] <= mid_x]
    right_y = [p for p in py if p[0] > mid_x]

    dl, pair_l = closest_pair_rec(left_x, left_y)
    dr, pair_r = closest_pair_rec(right_x, right_y)
    if dl < dr:
        d = dl
        pair = pair_l
    else:
        d = dr
        pair = pair_r

    strip = [p for p in py if abs(p[0] - mid_x) < d]
    ds, strip_pair = strip_closest(strip, d)
    if ds < d:
        return ds, strip_pair
    return d, pair



def closest_pair(points):
    px = sorted(points, key=lambda p: p[0])
    py = sorted(points, key=lambda p: p[1])
    return closest_pair_rec(px, py)


if __name__ == "__main__":
    pts = [(2,3), (12,30), (40,50), (5,1), (12,10)]
    print("Points =", pts)
    d, pair = closest_pair(pts)
    print("Closest Pair =", pair[0], "and", pair[1])
    print("Minimum Distance =", f"{d:.2f}")

