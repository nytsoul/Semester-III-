
def power_iterative(x, n):
    result = 1
    for _ in range(n):
        result *= x
    return result

def power_recursive(x, n):
    if n == 0:
        return 1
    return x * power_recursive(x, n - 1)


if __name__ == "__main__":
    print("Power Function:")
    print(power_iterative(2, 5))
    print(power_recursive(2, 5))
