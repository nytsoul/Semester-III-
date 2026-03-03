n = 3

conflict = [
    [0,1,0],
    [0,0,1],
    [1,0,0]
]

used = [False] * n
assign = [-1] * n

def backtrack(emp):
    if emp == n:
        print("Valid Assignment:")
        for i in range(n):
            print(f"Employee {i+1} → Task {assign[i]+1}")
        print()
        return
    
    for task in range(n):
        if not used[task] and conflict[emp][task] == 0:
            used[task] = True
            assign[emp] = task
            backtrack(emp + 1)
            used[task] = False

backtrack(0)
