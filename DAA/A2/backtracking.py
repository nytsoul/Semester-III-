

def subsets(nums):
    result = []
    current = []

    def backtrack(start):
       
        result.append(current.copy())

        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1)
            current.pop()  

    backtrack(0)
    return result

if __name__ == "__main__":
    data = [1, 2, 3]
    print("Input:", data)
    print("All subsets:")
    for s in subsets(data):
        print(s)
