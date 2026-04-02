class BayesianNetwork:

    def __init__(self):
        self.P_C = {
            True: 0.5,
            False: 0.5
        }

        self.P_R_given_C = {
            True: 0.7,
            False: 0.2
        }

        self.P_T_given_C = {
            True: 0.4,
            False: 0.7
        }

        self.variables = ["C", "R", "T"]

    def enumerate_ask(self, query_var, query_value, evidence):

        hidden_vars = []
        for var in self.variables:
            if var != query_var and var not in evidence:
                hidden_vars.append(var)

        numerator = self.enumerate_all( 
            self.variables,
            self.extend(evidence, query_var, query_value)
        )

        denominator = numerator + self.enumerate_all(
            self.variables,
            self.extend(evidence, query_var, not query_value)
        )

        return numerator / denominator

    def enumerate_all(self, vars_list, assignment):

        if not vars_list:
            return 1.0

        Y = vars_list[0]
        rest = vars_list[1:]

        if Y in assignment:
            return self.probability(Y, assignment[Y], assignment) * \
                   self.enumerate_all(rest, assignment)
        else:
            total = 0
            for y_val in [True, False]:
                new_assignment = self.extend(assignment, Y, y_val)
                total += self.probability(Y, y_val, new_assignment) * \
                         self.enumerate_all(rest, new_assignment)
            return total

    def probability(self, var, value, assignment):

        if var == "C":
            return self.P_C[value]

        elif var == "R":
            c_val = assignment["C"]
            prob = self.P_R_given_C[c_val]
            return prob if value else (1 - prob)

        elif var == "T":
            c_val = assignment["C"]
            prob = self.P_T_given_C[c_val]
            return prob if value else (1 - prob)

        return 0

    def extend(self, assignment, var, value):
        new_assign = assignment.copy()
        new_assign[var] = value
        return new_assign

bn = BayesianNetwork()
evidence = {"R": True}
result = bn.enumerate_ask("C", True, evidence)
print("P(C=True | R=True) =", result)