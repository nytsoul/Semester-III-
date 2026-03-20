import math
import copy

class TicTacToeGame:

    def __init__(self):
        self.board = [[' ']*3 for _ in range(3)]
        self.current_player = 'X'

    def display_board(self):
        for i in range(3):
            print(" | ".join(self.board[i]))
            if i < 2:
                print("---------")

    def generate_successor_states(self, player):
        states = []
        for i in range(3):
            for j in range(3):
                if self.board[i][j] == ' ':
                    b = copy.deepcopy(self.board)
                    b[i][j] = player
                    states.append((i, j, b))
        return states

    def is_moves_left(self):
        for row in self.board:
            if ' ' in row:
                return True
        return False

    def check_winner(self):
        for i in range(3):
            if self.board[i][0] == self.board[i][1] == self.board[i][2] != ' ':
                return self.board[i][0]

            if self.board[0][i] == self.board[1][i] == self.board[2][i] != ' ':
                return self.board[0][i]

        if self.board[0][0] == self.board[1][1] == self.board[2][2] != ' ':
            return self.board[0][0]

        if self.board[0][2] == self.board[1][1] == self.board[2][0] != ' ':
            return self.board[0][2]

        return None

    def is_terminal(self):
        return self.check_winner() is not None or not self.is_moves_left()

    def utility(self):
        if self.check_winner() == 'O':
            return 1
        if self.check_winner() == 'X':
            return -1
        return 0

    def alpha_beta(self, alpha, beta, maximizing):

        if self.is_terminal():
            return self.utility()

        if maximizing:
            value = -math.inf
            for i, j, b in self.generate_successor_states('O'):
                old = self.board
                self.board = b

                value = max(value, self.alpha_beta(alpha, beta, False))

                self.board = old
                alpha = max(alpha, value)

                if beta <= alpha:
                    break

            return value

        else:
            value = math.inf
            for i, j, b in self.generate_successor_states('X'):
                old = self.board
                self.board = b

                value = min(value, self.alpha_beta(alpha, beta, True))

                self.board = old
                beta = min(beta, value)

                if beta <= alpha:
                    break

            return value

    def find_best_move(self):
        best = -math.inf
        move = None

        for i, j, b in self.generate_successor_states('O'):
            old = self.board
            self.board = b

            val = self.alpha_beta(-math.inf, math.inf, False)

            self.board = old

            if val > best:
                best = val
                move = (i, j)

        return move

    def play_game(self):

        while True:

            self.display_board()

            if self.current_player == 'X':

                r = int(input("Row: "))
                c = int(input("Col: "))

                if self.board[r][c] == ' ':
                    self.board[r][c] = 'X'
                    self.current_player = 'O'

            else:
                r, c = self.find_best_move()
                self.board[r][c] = 'O'
                self.current_player = 'X'

            if self.is_terminal():

                self.display_board()

                if self.check_winner():
                    print("Winner:", self.check_winner())
                else:
                    print("Draw")

                break
game = TicTacToeGame()
game.play_game()