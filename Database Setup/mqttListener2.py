#TODO:
#error handling
#key generation

import paho.mqtt.client as mqtt
import psycopg2
import time

username=""
password=""
broker="broker address"
port=8883
conn = psycopg2.connect("dbname=rest_back user=user password=password host=localhost")
cur = conn.cursor()


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    #sub to detectors
    client.subscribe("dt2db/d2")
    
    #sub to detector crypto
    client.subscribe("dt2db/d2crypto")


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic",message.topic)
        
    if message.topic=="dt2db/d2" and len(str(message.payload.decode("utf-8"))) > 10:    
        #SQL Code Here
        s1=str(message.payload.decode("utf-8"))
        m1,s1,t1=s1.split(",")
        try: 
            cur.execute("INSERT INTO rf_loc_proberequestframe (mac_address, time_stamp, signal_strength, detector) VALUES (%s, %s, %s, %s)", (m1,t1,s1, "detector-2"))
        except psycopg2.Error as e:
            pass
        status=cur.rowcount
        #if insertion worked, publish "Good!" to corresponding topic, else publish "Bad!"
        if status==1:
            client.publish("db2dt/d2", "Good!")
            conn.commit()
        else:
            client.publish("db2dt/d2", "Bad")
        
#<----------------------------------------------------Handling Crypto--------------------------------------------->
#                                            (Travis or Joe Please try to do this)

    elif message.topic=="dt2db/d2crypto":            
        pass
            
       
    else:
        print("Couldnt insert")
        client.publish("db2dt/d2", "Bad")
#logging callback function
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

#connect to the broker using connect_async() so the on_connect() callback gets called and subscribes to the topics
print("Connecting to broker at "+broker)
client.connect_async(broker, port, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
client.loop_forever()
#logs may be out of order as the log function runs on a separate thread and runs asynchronous to the loop
