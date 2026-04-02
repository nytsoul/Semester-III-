class ForwardChain:
    def __init__(self):
        self.facts=set()
        self.rule=[]
    def addfacts(self,fact):
        self.facts.add(fact)
    def addrules(self,premise,conclusion):
        self.rule.append((premise,conclusion))
    def forwardchain(self,query):
        step=1
        print("Initial Facts:",self.facts)
        while True:
            new_inferred=False
            for premise,conclusion in self.rule:
                if all(p in self.facts for p in premise) and conclusion not in self.facts:
                    
                    print("step:",step)
                    print ("Rule Appliled:" ,"^".join(premise),"->",conclusion)
                    self.facts.add(conclusion)
                    print("New Facts:",conclusion)
                    print("current facts",self.facts)

                    step+=1
                    new_inferred=True
                    if conclusion == query:
                        print("\nQuery", query, "is TRUE. It is entailed by the Knowledge Base.")
                        return True
            if not new_inferred:
                print("\nQuery", query, "cannot be proved.")
                return False
prover = ForwardChain()

prover.addfacts("A1")
prover.addfacts("A2")

prover.addrules(["A2"], "D1")
prover.addrules(["D1"], "B1")
prover.addrules(["B1", "A2"], "C1")
prover.addrules(["A1", "B1"], "D2")
prover.addrules(["D2"], "E1")

prover.forwardchain("E1")