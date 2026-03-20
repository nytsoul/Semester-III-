import re
class LogicConverter:
    def convert(self, sentence):
        s = sentence.lower()
        s = s.replace(" if and only if ", " <-> ")
        s = s.replace(" iff ", " <-> ")
        s = s.replace(" if ", " ")
        s = s.replace(" then ", " -> ")

        s = s.replace(" and ", " ∧ ")
        s = s.replace(" or ", " ∨ ")
        s = s.replace(" not ", " ¬")

        words = re.findall(r'[a-z]+', s)
        mapping = {}
        letter = ord('P')

        for w in words:
            if w not in ["and", "or", "not", "then", "if", "only"]:
                if w not in mapping:
                    mapping[w] = chr(letter)
                    letter += 1
        result = s
        for k, v in mapping.items():
            result = re.sub(r'\b' + k + r'\b', v, result)

        return result.upper(), mapping
lc = LogicConverter()
while True:
    text = input("\nEnter English Sentence (type exit to stop): ")

    if text.lower() == "exit":
        break
    logic, mapping = lc.convert(text)
    print("Propositional Logic :", logic)
    print("Symbol Mapping :", mapping)
