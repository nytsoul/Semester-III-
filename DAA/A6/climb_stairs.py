def climb_stairs(n):
    if n < 0:
        return 0

    dp = [0] * (n + 1)
    dp[0] = 1
    if n >= 1:
        dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


if __name__ == "__main__":
    n = 5
    print("Number of ways =", climb_stairs(n))
