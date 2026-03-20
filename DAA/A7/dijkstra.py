import heapq

class Node:
    def __init__(self, freq, char=None, left=None, right=None):
        self.freq = freq
        self.char = char
        self.left = left
        self.right = right

    def __lt__(self, other):
        return self.freq < other.freq


def huffman_coding(chars, freq):
    heap = []

    for i in range(len(chars)):
        heapq.heappush(heap, Node(freq[i], chars[i]))

    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)

        merged = Node(left.freq + right.freq, None, left, right)
        heapq.heappush(heap, merged)

    root = heap[0]

    codes = {}
    
    def generate(node, code=""):
        if node:
            if node.char:
                codes[node.char] = code
            generate(node.left, code + "0")
            generate(node.right, code + "1")

    generate(root)
    return codes


chars = ['a','b','c','d']
freq = [5,9,12,13]

print(huffman_coding(chars, freq))