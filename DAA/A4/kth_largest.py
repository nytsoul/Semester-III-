
import random


def partition(arr, low, high):
    pivot_idx = random.randint(low, high)
    arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
    pivot = arr[high]
    i = low
    for j in range(low, high):
        if arr[j] > pivot:  
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[high] = arr[high], arr[i]
    return i


def quickselect(arr, low, high, k):
    if low == high:
        return arr[low]
    pivot_index = partition(arr, low, high)
    rank = pivot_index - low + 1
    if rank == k:
        return arr[pivot_index]
    elif k < rank:
        return quickselect(arr, low, pivot_index - 1, k)
    else:
        return quickselect(arr, pivot_index + 1, high, k - rank)


if __name__ == "__main__":
    data = [7, 5, 3, 1, 12, -16, 4, -2]
    k = 3
    print("Array =", data, "k =", k)
    element = quickselect(data.copy(), 0, len(data) - 1, k)
    print(f"{k}rd largest element = {element}")

