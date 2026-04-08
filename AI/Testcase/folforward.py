class FOLForwardChaining:

    def __init__(self):
        self.facts = []
        self.rules = []

    def add_fact(self, fact):
        self.facts.append(self.parse(fact))

    def add_rule(self, premises, conclusion):
        self.rules.append((list(map(self.parse, premises)), self.parse(conclusion)))

    def parse(self, expr):
        name = expr[:expr.index("(")]
        args = expr[expr.index("(")+1:expr.index(")")].split(",")
        return (name, args)

    def is_variable(self, x):
        return x.islower()

    def unify(self, x, y, theta):
        if theta is None:
            return None
        if x == y:
            return theta
        if self.is_variable(x):
            return self.unify_var(x, y, theta)
        if self.is_variable(y):
            return self.unify_var(y, x, theta)
        return None

    def unify_var(self, var, val, theta):
        if var in theta:
            return self.unify(theta[var], val, theta)
        theta[var] = val
        return theta

    def substitute(self, expr, theta):
        name, args = expr
        return (name, [theta.get(a, a) for a in args])

    def infer(self):
        new = []

        while True:
            for premises, conclusion in self.rules:
                for fact in self.facts:
                    theta = {}
                    if premises[0][0] == fact[0]:
                        theta = self.unify(premises[0][1][0], fact[1][0], {})
                        if theta is not None:
                            inferred = self.substitute(conclusion, theta)
                            if inferred not in self.facts and inferred not in new:
                                new.append(inferred)

            if not new:
                break

            self.facts.extend(new)
            new.clear()

        return self.facts


# ----------------------------
# Example
# ----------------------------

fc = FOLForwardChaining()

fc.add_fact("Parent(A,B)")
fc.add_fact("Parent(B,C)")

fc.add_rule(["Parent(x,y)"], "Ancestor(x,y)")

result = fc.infer()

print("Inferred Facts:")
for f in result:
    print(f)