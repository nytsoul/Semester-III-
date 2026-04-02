class Minimax:

    def minimax(self, depth, is_max, values, index):

        if depth == 3:
            return values[index]

        if is_max:
            left = self.minimax(depth + 1, False, values, index * 2)
            right = self.minimax(depth + 1, False, values, index * 2 + 1)
            return max(left, right)
        else:
            left = self.minimax(depth + 1, True, values, index * 2)
            right = self.minimax(depth + 1, True, values, index * 2 + 1)
            return min(left, right)


values = [3, 5, 2, 9, 12, 5, 23, 23]

game = Minimax()
result = game.minimax(0, True, values, 0)

print("Optimal Value:", result)