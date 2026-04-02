from itertools import product

P_C = {
    True: 0.5,
    False: 0.5
}

P_R_given_C = {
    True: 0.7,
    False: 0.2
}

P_T_given_C = {
    True: 0.4,
    False: 0.7
}

P_S_given_R = {
    True: 0.9,
    False: 0.3
}

P_I_given_ST = {
    (True, True): 0.1,
    (True, False): 0.2,
    (False, True): 0.8,
    (False, False): 0.6
}

def prob_C(c):
    return P_C[c]

def prob_R(r, c):
    p = P_R_given_C[c]
    return p if r else 1 - p

def prob_T(t, c):
    p = P_T_given_C[c]
    return p if t else 1 - p

def prob_S(s, r):
    p = P_S_given_R[r]
    return p if s else 1 - p

def prob_I(i, s, t):
    p = P_I_given_ST[(s, t)]
    return p if i else 1 - p

def joint_prob(c, r, t, s, i):
    return (prob_C(c) *
            prob_R(r, c) *
            prob_T(t, c) *
            prob_S(s, r) *
            prob_I(i, s, t))

def enumeration(query_i, evidence_s):
    total = 0.0
    for c, r, t in product([True, False], repeat=3):
        total += joint_prob(c, r, t, evidence_s, query_i)
    return total

S_low = False

numerator = enumeration(True, S_low)
denominator = enumeration(True, S_low) + enumeration(False, S_low)

result = numerator / denominator

print("P(I = On | S = Low) =", round(result, 4))