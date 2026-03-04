class ForwardChainingProver:

    def __init__(self):
        self.facts = set()
        self.rules = []

    def add_fact(self, fact):
        self.facts.add(fact)

    def add_rule(self, premises, conclusion):
        self.rules.append((premises, conclusion))

    def forward_chain(self, query):

        step = 1
        print("Initial Facts:", self.facts)

        while True:
            new_inferred = False

            for premises, conclusion in self.rules:

                if all(p in self.facts for p in premises) and conclusion not in self.facts:

                    print("\nStep", step)
                    print("Rule Applied:", " ∧ ".join(premises), "→", conclusion)

                    self.facts.add(conclusion)

                    print("New Fact Inferred:", conclusion)
                    print("Current Facts:", self.facts)

                    step += 1
                    new_inferred = True

                    if conclusion == query:
                        print("\nQuery", query, "is TRUE. It is entailed by the Knowledge Base.")
                        return True

            if not new_inferred:
                print("\nQuery", query, "cannot be proved.")
                return False


prover = ForwardChainingProver()

prover.add_fact("A1")
prover.add_fact("A2")

prover.add_rule(["A2"], "D1")
prover.add_rule(["D1"], "B1")
prover.add_rule(["B1", "A2"], "C1")
prover.add_rule(["A1", "B1"], "D2")
prover.add_rule(["D2"], "E1")

prover.forward_chain("E1")