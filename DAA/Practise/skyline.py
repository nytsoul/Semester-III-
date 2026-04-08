def merge_skyline(left, right):
    h1 = h2 = 0
    i = j = 0
    result = []

    while i < len(left) and j < len(right):
        if left[i][0] < right[j][0]:
            x, h1 = left[i]
            i += 1
        else:
            x, h2 = right[j]
            j += 1

        max_h = max(h1, h2)
        if not result or result[-1][1] != max_h:
            result.append([x, max_h])

    result += left[i:] + right[j:]
    return result


def skyline(buildings):
    if len(buildings) == 1:
        x1, x2, h = buildings[0]
        return [[x1, h], [x2, 0]]

    mid = len(buildings)//2
    left = skyline(buildings[:mid])
    right = skyline(buildings[mid:])

    return merge_skyline(left, right)


buildings = [[2,9,10],[3,7,15],[5,12,12]]

result = skyline(buildings)

print("Skyline:", result)
print("Length:", len(result))