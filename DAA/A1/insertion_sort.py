
def insertion_sort_iterative(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

def insertion_sort_recursive(arr, n):
    if n <= 1:
        return
    insertion_sort_recursive(arr, n - 1)
    last = arr[n - 1]
    j = n - 2
    while j >= 0 and arr[j] > last:
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = last


if __name__ == "__main__":
    print("Insertion Sort:")
    arr1 = [5, 2, 4, 6, 1, 3]
    print(insertion_sort_iterative(arr1.copy()))
    arr2 = [9, 7, 5, 3, 1]
    insertion_sort_recursive(arr2, len(arr2))
    print(arr2)
