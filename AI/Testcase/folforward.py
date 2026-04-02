class FOLForwardChaining:

    def __init__(self):
        self.facts = set()
        self.rules = []

    def add_fact(self, fact):
        self.facts.add(fact)

    def add_rule(self, premises, conclusion):
        self.rules.append((premises, conclusion))

    def infer(self):
        changed = True

        while changed:
            changed = False

            for premises, conclusion in self.rules:
                if all(p in self.facts for p in premises) and conclusion not in self.facts:
                    self.facts.add(conclusion)
                    changed = True

        return self.facts


fc = FOLForwardChaining()

fc.add_fact("Parent(A,B)")
fc.add_fact("Parent(B,C)")

fc.add_rule(["Parent(A,B)"], "Ancestor(A,B)")
fc.add_rule(["Parent(B,C)"], "Ancestor(B,C)")

result = fc.infer()
print("Inferred Facts:", result)