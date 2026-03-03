def stable_matching(men_pref, women_pref):
    n = len(men_pref)
    
    free_men = list(men_pref.keys())
    women_partner = {}
    men_next_proposal = {man: 0 for man in men_pref}

    while free_men:
        man = free_men.pop(0)
        woman = men_pref[man][men_next_proposal[man]]
        men_next_proposal[man] += 1

        if woman not in women_partner:
            women_partner[woman] = man
        else:
            current_man = women_partner[woman]
            if women_pref[woman].index(man) < women_pref[woman].index(current_man):
                women_partner[woman] = man
                free_men.append(current_man)
            else:
                free_men.append(man)

    return women_partner


# Sample Input
men_preferences = {
    "M1": ["W1", "W2", "W3"],
    "M2": ["W2", "W1", "W3"],
    "M3": ["W1", "W2", "W3"]
}

women_preferences = {
    "W1": ["M2", "M1", "M3"],
    "W2": ["M1", "M2", "M3"],
    "W3": ["M1", "M2", "M3"]
}

result = stable_matching(men_preferences, women_preferences)

print("Stable Matching:")
for woman, man in result.items():
    print(man, "-", woman)