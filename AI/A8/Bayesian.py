class Bayesian:
    def __init__(self):
        self.P_C{
            True:0.1,False:0.5
        }
        self.P_R_given_c{
            True:0.7,False:0.8
        }
        self.p_T_given_c{
            True:0.5 ,False:0.3
        }
        self.variable['c','r','t']
    def enumerate_ask(self,Query_var,query_value,evidence):
        hidden_vars=[]
        for var in self.evidence:
            if var!= query_value and var not in evidence:
                hidden_vars.append(var)
        numerator=self.enumerate_al(
            self.variable,
            self.extend(evidence,query_var,query_value)
        )
        denominator=numerator+self.enumerate_all(
            self.variable,
            self.extend(evidence,query_var, not query_value)
        )
        return numerator/denominator
    def enumerate_all(self,var_list,assignment):
        if not var_list:
            return 1.0
        y=var_list[0]
        rest=var_list[1:]
        

    def probability(self,assignment,var,value):
        if var=="c":
            return self.p_c[var]
        elif var=="r":
            c_var=assignment["c"]
            prob=self.P_R_given_C[c_var]
            return prob
            if value else (1-prob)
        elif var=="t":
            c_var=assignment["t"]
            prob=self.P_T_given_C[c_var]
            return prob
            if value else (1-prob)
        return 0
    def extend(self ,var,value,assignment):
        new_assign=assignment.copy()
        new_assign=[var]=var
        return new_assign