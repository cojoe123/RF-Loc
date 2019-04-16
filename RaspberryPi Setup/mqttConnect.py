
import paho.mqtt.client as mqtt
import time
import sys
import socket

username=""
password=""
broker="broker address"
port=8883
payload=sys.argv[1]
hostname=socket.gethostname()
accepted_topics = {'db2dt/d1', 'db2dt/d2', 'db2dt/d3', 'db2dt/d4'}
try_again=0
# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    if hostname=="detector-1":
        client.subscribe("db2dt/d1")
        client.publish("dt2db/d1", payload)
        print("payload sent")
        
    elif hostname=="detector-2":
        client.subscribe("db2dt/d2")
        client.publish("dt2db/d2", payload)
        print("payload sent")
        
    elif hostname=="detector-3":
        client.subscribe("db2dt/d3")
        client.publish("dt2db/d3", payload)
        print("payload sent")
        
    elif hostname=="detector-4":
        client.subscribe("db2dt/d4")
        client.publish("dt2db/d4", payload)
        print("payload sent")
        
    else:
        print("Error! Unexpected Hostname.")


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, message):
    if message.topic in accepted_topics:
            
            # if insert was successful
            if str(message.payload.decode("utf-8")) == "Good!":
                print("DB insertion successful")
                sys.exit(0)
                
            # if insert was unsuccessful    
            elif str(message.payload.decode("utf-8")) == "Bad":
                print("DB insertion unsuccessful")
                print("Is the data below in the following format? [XX:XX:XX:XX:XX:XX,-00,00:00:00]")
                print (payload)
                sys.exit(1)
                   
    else:
        print("Unexpected topic!")
        

#logging callback (handled in a different thread, may not be printed in order unless time.sleep() gets called at the beginning 
#    and just before the end of the loop
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

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
client.loop_forever()