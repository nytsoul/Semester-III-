"""Huffman Coding (greedy prefix code from symbol frequencies)."""
import heapq
from typing import Dict


def huffman(freqs: Dict[str, int]) -> Dict[str, str]:
    if not freqs:
        return {}

    heap = [(w, symbol) for symbol, w in freqs.items()]
    heapq.heapify(heap)
    codes = {s: '' for s in freqs}

    if len(heap) == 1:
        symbol = heap[0][1]
        return {symbol: '0'}

    while len(heap) > 1:
        w1, s1 = heapq.heappop(heap)
        w2, s2 = heapq.heappop(heap)

        for symbol in (s1 if isinstance(s1, list) else [s1]):
            codes[symbol] = '0' + codes[symbol]
        for symbol in (s2 if isinstance(s2, list) else [s2]):
            codes[symbol] = '1' + codes[symbol]

        merged_sym = (s1 if isinstance(s1, list) else [s1]) + (s2 if isinstance(s2, list) else [s2])
        heapq.heappush(heap, (w1 + w2, merged_sym))

    return codes


if __name__ == '__main__':
    k = int(input('Number of symbols: ').strip())
    freqs = {}
    for _ in range(k):
        sym, w = input('symbol weight: ').split()
        freqs[sym] = int(w)
    codes = huffman(freqs)
    print('Huffman codes:')
    for sym in sorted(codes):
        print(sym, codes[sym])
