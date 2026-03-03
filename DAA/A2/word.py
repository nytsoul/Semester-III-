board = [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
]

word = "ABCCED"

def dfs(r, c, index):
    if index == len(word):
        return True
    
    if r < 0 or c < 0 or r >= len(board) or c >= len(board[0]):
        return False
    
    if board[r][c] != word[index]:
        return False
    
    temp = board[r][c]
    board[r][c] = "#"

    found = (
        dfs(r+1, c, index+1) or
        dfs(r-1, c, index+1) or
        dfs(r, c+1, index+1) or
        dfs(r, c-1, index+1)
    )

    board[r][c] = temp
    return found

exists = any(dfs(i, j, 0) for i in range(len(board)) for j in range(len(board[0])))

print("Word Found" if exists else "Word Not Found")
