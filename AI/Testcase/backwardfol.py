class folforward:
    def __init__(self):
        self.facts=[]
        self.rule=[]
    def add_fact(self,fact):
        self.facts.add(self.parse(fact))
    def add_rules(self,premises,conclusion):
        self.rule.append((list(map(self.parse,premises),self.parse(conclusion))))
    def parse(self ,exp):
        name=exp[:exp.index("(")]
        args=exp[exp.index("(")+1:exp.index(")")].split(",")
        return name,arg

    def is_variable(self,x):
        return x.islower()
    def unify(self,x,y,theta):
        if theta is None:
            retunr None
        if x==y:
            return theta
        if self.is_variable(x):
            return self.unify_var(x,y,theta)
        if self.is_variable(y):
            return self.unify_var(y,x,theta)
        return None
    def unify_var(self ,var,val,theta):
        if var in theta:
            return self.unify(theta[var],val,theta)
        theta[var]=val
        retun theta