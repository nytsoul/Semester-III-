
def sum_digits_iterative(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

def sum_digits_recursive(n):
    if n == 0:
        return 0
    return (n % 10) + sum_digits_recursive(n // 10)


if __name__ == "__main__":
    print("Sum of Digits:")
    print(sum_digits_iterative(12345))
    print(sum_digits_recursive(12345))
