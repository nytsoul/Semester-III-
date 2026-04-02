class refutaion:
    def _init__(self):
        self.clauses=[]
    def add_rule(self,clause):
        self.clauses.append(set(clause))
    def resolve(self,c1,c2):
        resolvents=[]
        for literal in c1:
            if ('~ '+ literal ) in c2:
                new_clause=(c1-{literal}) | (c2 - {'~'+ literal})
                resolvents.append(new_clause)
            if literal.startswith('~') and literal[1:] in c2:
                new_clause=(c1-{literal}) | (c2 - {literal[1:]})
                resolvents.append(new_clause)
    def resolution_procedure(self):
        new =[]
        while True:
            n=len(self.clauses)
            for i in range(n):
                for j in range(i+1,n):
                    resolvents=self.resolve(self.clauses[i],self.clause[j])
                    for clause in resolvents:
                        if len(clause)==0:
                            return True
                        new.append(clause)
            if all ( c in self.clause for c in new):
                return False
            for c in new:
                if c not in self.clauses:
                    self.clauses.append(c)
prover = ResolutionProver()

prover.add_rule(['¬P', 'Q'])
prover.add_rule(['¬R', 'Q'])
prover.add_rule(['¬Q'])
prover.add_rule(['S'])
prover.add_rule(['¬S', 'P'])
prover.add_rule(['¬S', 'R'])
prover.add_rule(['P'])

result= prover.resol
