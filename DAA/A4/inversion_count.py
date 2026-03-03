
def merge_count(left, right):

    i = j = 0
    merged = []
    inv_count = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
        
            merged.append(right[j])
            j += 1
            inv_count += len(left) - i

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged, inv_count


def sort_and_count(arr):
    
    if len(arr) <= 1:
        return arr, 0
    mid = len(arr) // 2
    left, inv_left = sort_and_count(arr[:mid])
    right, inv_right = sort_and_count(arr[mid:])
    merged, inv_split = merge_count(left, right)
    total = inv_left + inv_right + inv_split
    return merged, total


if __name__ == "__main__":
    data = [7, 5, 3, 1]
    print("Array =", data)
    _, inversions = sort_and_count(data)
    print("Number of Inversions =", inversions)

