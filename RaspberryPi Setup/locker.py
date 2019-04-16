import paho.mqtt.client as mqtt
import socket
import subprocess
import sys

username=""
password=""
broker="broker address"
port=8883
hostname=socket.gethostname()
action=sys.argv[1]


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
     if hostname=="detector-1":
        client.subscribe("db2dt/d1Crypto")
        
    elif hostname=="detector-2":
        client.subscribe("db2dt/d2Crypto")
        
    elif hostname=="detector-3":
        client.subscribe("db2dt/d3Crypto")
        
    elif hostname=="detector-4":
        client.subscribe("db2dt/d4Crypto")
        
    else:
        print("Error! Unexpected Hostname.")
        
def on_message(client, userdata, message):
    #when a message is received, the payload is decoded into a string, which is then saved as a crypto key
    
def on_log(client, userdata, level, buf):
    print("log: "+buf)

#initialize client
client = mqtt.Client()

#bind callback functions
client.on_connect = on_connect
client.on_message = on_message
client.on_log = on_log

#set TLS and authentication up
client.tls_set('/etc/ssl/certs/ca-certificates.crt')
client.username_pw_set(username, password)

#connect to the broker
print("Connecting to broker at "+broker)
client.connect_async(broker, port, 60)

client.loop_start()

#if tshark.txt is currently unlocked...
if action==0:
#statements for encrypting tshark.txt go here
    key='/path/to/key/'
    subprocess.run(#encrypt tshark.txt using key)
    subprocess.run(#delete local key)

#if tshark.txt is currently locked
elif action==1:
#statements fo decrypting tshark.txt go here
    key='/path/to/key/'
    subprocess.run(#decrypt tshark.txt using key)
    subprocess.run(#delete local key)
else:
    print("IDK What I'm Supposed to do")
client.loop_stop()