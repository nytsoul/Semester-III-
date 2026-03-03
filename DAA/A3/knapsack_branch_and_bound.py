class Item:
    def __init__(self, profit, weight, priority):
        self.profit = profit
        self.weight = weight
        self.priority = priority


def bound(i, current_weight, current_profit, capacity, items):

    if current_weight >= capacity:
        return current_profit
    total = current_profit
    w = current_weight
    for j in range(i, len(items)):
        item = items[j]
        if w + item.weight <= capacity:
            w += item.weight
            total += item.profit
        else:
            total += item.profit * (capacity - w) / item.weight
            break
    return total


def knapsack_bnb(items, capacity):

    items = sorted(items, key=lambda x: x.profit / x.weight, reverse=True)
    best = 0
    n = len(items)

    def recurse(i, cw, cp):
        nonlocal best
        if i == n:
            best = max(best, cp)
            return
        if bound(i, cw, cp, capacity, items) <= best:
            return
        if cw + items[i].weight <= capacity:
            recurse(i + 1, cw + items[i].weight, cp + items[i].profit)
        recurse(i + 1, cw, cp)

    recurse(0, 0, 0)
    return best


if __name__ == "__main__":
    raw = [
        Item(10, 5, 1),
        Item(40, 20, 2),
        Item(30, 10, 3),
        Item(50, 25, 2)
    ]
    cap = 30
    print(f"Max profit with capacity {cap} = {knapsack_bnb(raw, cap)}")
