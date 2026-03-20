class ResolutionProver:

    def __init__(self):
        self.clauses = []

    def add_clause(self, clause):
        self.clauses.append(clause)

    def negate_query(self, query):
        if query.startswith("~"):
            return query[1:]
        return "~" + query

    def unify(self, x, y, theta={}):
        if theta is None:
            return None
        if x == y:
            return theta
        if isinstance(x, str) and x.islower():
            theta[x] = y
            return theta
        if isinstance(y, str) and y.islower():
            theta[y] = x
            return theta
        return None

    def resolve(self, c1, c2):
        resolvents = []
        for l1 in c1:
            for l2 in c2:
                if l1 == self.negate_literal(l2):
                    new_clause = (c1 - {l1}) | (c2 - {l2})
                    resolvents.append(new_clause)
        return resolvents

    def negate_literal(self, literal):
        if literal.startswith("~"):
            return literal[1:]
        return "~" + literal

    def resolution(self):
        clauses = self.clauses[:]
        while True:
            new = []
            for i in range(len(clauses)):
                for j in range(i + 1, len(clauses)):
                    resolvents = self.resolve(clauses[i], clauses[j])
                    for res in resolvents:
                        print(f"Resolving {clauses[i]} and {clauses[j]} => {res}")
                        if not res:
                            return True
                        if res not in clauses and res not in new:
                            new.append(res)
            if not new:
                return False
            clauses.extend(new)


prover = ResolutionProver()

prover.add_clause({"P(a)"})
prover.add_clause({"Q(a,b)"})
prover.add_clause({"R(b,c)"})
prover.add_clause({"~P(x)", "~Q(x,y)", "S(x,y)"})
prover.add_clause({"~S(x,y)", "~R(y,z)", "T(x)"})
prover.add_clause({"~T(a)"})

result = prover.resolution()

print("\nFinal Result:")
if result:
    print("Query is TRUE (entailed)")
else:
    print("Query is FALSE (not entailed)")