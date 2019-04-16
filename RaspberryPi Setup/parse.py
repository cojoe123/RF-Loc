#open tshark
tshark = open("tshark.txt", "r")

#look for mac address
for line in tshark:
    if "Source" in line:
        d = line[35:].strip( "( ) \n")
    
#look for timestamp        
    if "Arrival" in line:
        e = line[31:].rstrip("ABCDEFGHIJKLMNOPQRSTUVWXYZ \n") 
       
#look for signal strength
    if "Signal strength (dBm)" in line:
        f = line[27:].rstrip("dBm \n") 
      
#concatenate the strings, separated by a comma and no white space
str = (d + "," + f + "," + e)

#send the string to STDOUT, which sets the value of the $data var in RFLoc.sh
print(str)
tshark.close()