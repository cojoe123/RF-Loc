tshark = open("/users/tjn218/parsetest/tshark1.txt", "r")


for line in tshark:
    if "Source" in line:
       d = line[35:].rstrip("\n") 
    
        
    if "Arrival" in line:
        e = line[30:].rstrip("\n") 
       

    if "Signal strength (dBm)" in line:
        f = line[27:].rstrip("\n") 
      

str = d + " [mac]",f + " [signal]",e + " [timestamp]"

print(str , file=open("/users/tjn218/parsetest/mac addresses.txt", "a"))
print("done")
tshark.close()
