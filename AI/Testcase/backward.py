class BackwardChainingProver:

    def __init__(self):
        self.facts = set()
        self.rules = []

    def add_fact(self, fact):
        self.facts.add(fact)

    def add_rule(self, premises, conclusion):
        self.rules.append((premises, conclusion))

    def backward_chain(self, query, visited=None):

        if visited is None:
            visited = set()

        print("\nChecking:", query)

        if query in self.facts:
            print(query, "is a known FACT.")
            return True

        if query in visited:
            return False

        visited.add(query)

        for premises, conclusion in self.rules:

            if conclusion == query:
                print("Trying rule:", " ∧ ".join(premises), "→", conclusion)

                if all(self.backward_chain(p, visited) for p in premises):
                    print("Rule satisfied. So,", query, "is TRUE.")
                    return True

        print(query, "cannot be proved.")
        return False


prover = BackwardChainingProver()

prover.add_fact("A1")
prover.add_fact("A2")

prover.add_rule(["A2"], "D1")
prover.add_rule(["D1"], "B1")
prover.add_rule(["B1", "A2"], "C1")
prover.add_rule(["A1", "B1"], "D2")
prover.add_rule(["D2"], "E1")

result = prover.backward_chain("E1")

if result:
    print("\nFinal Result: Query is TRUE")
else:
    print("\nFinal Result: Query is FALSE")