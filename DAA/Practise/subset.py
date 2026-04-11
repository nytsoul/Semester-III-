arr=[1,2,3]
n=len(arr)
s=[]
def subset(i,cun):
    if i == n:
        s.append(cun)
        return
    subset(i + 1, cun + [arr[i]])
    subset (i +1, cun)
subset(0,[])
print(s)   