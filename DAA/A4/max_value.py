
def max_divide_conquer(arr, low, high):
    if low == high:
        return arr[low]
    mid = (low + high) // 2
    left_max = max_divide_conquer(arr, low, mid)
    right_max = max_divide_conquer(arr, mid + 1, high)
    
    if left_max > right_max:
        return left_max
    else:
        return right_max


if __name__ == "__main__":
    data = [15, 42, 7, 29, 88, 54]
    print("Array =", data)
    maximum = max_divide_conquer(data, 0, len(data) - 1)
    print("Maximum element =", maximum)

