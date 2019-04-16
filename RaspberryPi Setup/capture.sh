#!/bin/bash

sudo ifconfig mon0 up
touch tshark.txt
sudo tshark -i mon0 -c 1 -V wlan type mgt subtype probe-req > tshark.txt
sudo ifconfig mon0 down
