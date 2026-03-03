class Interview:
    def __init__(self, duration, priority, deadline):
        self.duration = duration
        self.priority = priority
        self.deadline = deadline


def schedule_bnb(interviews, total_time):
    # want to choose interviews to fit within total_time and deadlines
    interviews = sorted(interviews, key=lambda iv: iv.deadline)
    n = len(interviews)
    best = 0
    best_sched = None

    def recurse(i, used, profit, sched):
        nonlocal best, best_sched
        if i == n:
            if profit > best:
                best = profit
                best_sched = sched.copy()
            return
        # upper bound: current profit plus sum of remaining priorities
        ub = profit + sum(iv.priority for iv in interviews[i:])
        if ub <= best:
            return
        iv = interviews[i]
        # try scheduling it if there's time and before deadline
        if used + iv.duration <= total_time and used + iv.duration <= iv.deadline:
            sched.append(iv)
            recurse(i + 1, used + iv.duration, profit + iv.priority, sched)
            sched.pop()
        # also try skipping it
        recurse(i + 1, used, profit, sched)

    recurse(0, 0, 0, [])
    return best, best_sched


if __name__ == "__main__":
    data = [
        Interview(1, 10, 2),
        Interview(2, 5, 3),
        Interview(1, 8, 1),
        Interview(3, 12, 4)
    ]
    total = 5
    bestp, sched = schedule_bnb(data, total)
    print(f"Max priority = {bestp}")
    print(f"Scheduled interviews = {[ (iv.duration, iv.priority, iv.deadline) for iv in sched ]}")
