n=int(input("Enter the number "))
p=list(map(int,input("Enter the project:").split()))
w=list(map(int,input("Enter a weight:").split()))

W=int (input("Enter a capacity:"))
def knap(i,profite,weight):
    global ans

    if i==n:
        ans=max(ans,n)
        return

    if weight + w[i] <= W:
        knap()