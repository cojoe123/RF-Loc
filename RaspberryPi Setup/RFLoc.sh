#!/bin/bash/
#master script that runs the RFLoc service on the detectors
looper=true

echo "Initializing RF-Loc..."

#echo "Updating..."

#sudo sh update.sh

while [ $looper = true ]
do
echo "Resetting Variables..." 
goodInsert=1
tries=0
lockState=0

echo "Running RF-Loc Service"

echo "Vacuuming..."

sudo sh housekeeper.sh

echo "Capturing..."

sudo sh capture.sh

while [ $goodInsert = 1 -a $tries -le 1 ]
do
echo "Parsing..."

data=`sudo python3 parse.py`
#for testing purposes
#data="XX:XX:XX:XX:XX:XX,-00,00:00:00.000"
#echo "Locking tshark.txt..."

#sudo python3 locker.py $lockState

echo "Sending Data..."

sudo python3 mqttConnect.py $data
#if insertion was successful, break out of the inner loop
if [ $? = 0 ]
then
	break
#if unsuccessful, increment tries, set lockstate to 1 (telling locker.py that it should run in unlock mode)
elif [ $? = 1 ]
then
	tries=$((tries+1))
	((lockState=1))
	#echo "Insertion issue, unlocking tshark.txt for parsing"
	#sudo python3 locker.py $lockState
	
else 
	echo "something went terribly wrong"

fi

	
done
#if insertion failed twice in a row
if [ $tries = 2 ]
then
	echo "Tried to insert twice, didn't work. Resetting..."
else
	echo "Insertion Successful"
fi
done



