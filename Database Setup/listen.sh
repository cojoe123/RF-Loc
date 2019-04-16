#!/bin/bash/
#start the listeners and push them to the background
#nohup ensures the proccesses keep running even if the terminal session is closed
#output will be sent to log files specific to each thread
sudo python3 -u mqttListener1.py > listen1.log &
sudo python3 -u mqttListener2.py > listen2.log &
sudo python3 -u mqttListener3.py > listen3.log &
sudo python3 -u mqttListener4.py > listen4.log &

#get the PID of the listeners so we can kill the proccess if we need to
ps ax | grep mqttListener1.py
ps ax | grep mqttListener2.py
ps ax | grep mqttListener3.py
ps ax | grep mqttListener4.py