def quick(arr):
    if len(arr)  <=1:
        return arr
    
    pivot=arr[0]
    left=[]
    right=[]
    for i in arr[1:]:
        if i <=pivot:
            left.append(i)
        else :
            right.append(i)
    return quick(left)+ [pivot] + quick (right)
a=[3,4,1,8,5,2,0]
print(quick(a)) 