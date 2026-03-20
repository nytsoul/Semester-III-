
joint = {
    ('H','F','L'):0.12,
    ('H','F','~L'):0.08,
    ('H','~F','L'):0.06,
    ('H','~F','~L'):0.04,
    ('~H','F','L'):0.05,
    ('~H','F','~L'):0.15,
    ('~H','~F','L'):0.10,
    ('~H','~F','~L'):0.40
}


P_H = sum(p for (h,f,l),p in joint.items() if h=='H')
P_F = sum(p for (h,f,l),p in joint.items() if f=='F')
P_L = sum(p for (h,f,l),p in joint.items() if l=='L')


P_HF = sum(p for (h,f,l),p in joint.items() if h=='H' and f=='F')
P_H_given_F = P_HF / P_F

P_HL = sum(p for (h,f,l),p in joint.items() if h=='H' and l=='L')
P_H_given_L = P_HL / P_L

P_FL = sum(p for (h,f,l),p in joint.items() if f=='F' and l=='L')
P_H_given_FL = joint[('H','F','L')] / P_FL

P_F_given_H = P_HF / P_H

P_notH = 1 - P_H
P_L_notH = sum(p for (h,f,l),p in joint.items() if h=='~H' and l=='L')
P_L_given_notH = P_L_notH / P_notH


print("Marginal Probabilities")
print("P(H) =",P_H)
print("P(F) =",P_F)
print("P(L) =",P_L)

print("\nConditional Probabilities")
print("P(H|F) =",P_H_given_F)
print("P(H|L) =",P_H_given_L)
print("P(H|F,L) =",P_H_given_FL)
print("P(F|H) =",P_F_given_H)
print("P(L|~H) =",P_L_given_notH)

if P_HF == P_H * P_F:
    print("\nH and F are Independent")
else:
    print("\nH and F are NOT Independent")