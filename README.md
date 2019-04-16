# Captsone Project 
##### By Zachary Gold, Travis Ng, Joseph Zambrano

----

# RF-Loc 
RF-Loc is a hardware/software system for locating individuals in emergency-response scenarios. This is done by detecting the radio signals coming from their cell phones. There are three components within the system: the detectors, the manager-access point, and the system that hosts a database that is used by the user interface. Our system will use a protocol named MQTT which is a lightweight messaging protocol based on the publish-subscribe messaging method. Once the data has been inserted into the database, registered users can access data via a web site. Information will include an overlay of the location of the detectors and, based on signal strength, a circle approximating how close the individuals device is to the detector. By design, the system is completely amnesic, which means that the physically accessible components hold no usable personally identifying information, this minimizes the privacy concerns related to intercepting wireless communications.

----

# How it will be achieved: Hardware
There are three discrete components in the RF-Loc system: the detectors, the manager-access point, and the system that hosts a database that is used by the user interface.  
* The Detectors
	* We will use Raspberry Pi Zero-W’s, with antennas placed into monitor mode, which allows us to passively intercept wireless network traffic without being connected to a network. This will be used to capture probe request frames, which are sent from client devices every 100 milliseconds, as outlined in the 802.11 protocol. If a device’s wireless antenna is on, it is sending probe request frames.
	* These request frames are referred to as management frames, packets that facilitate effective network management and are generally not based on user requests. 
	* These probe request frames contain a plethora of useful information such as the MAC address of the source device, the time the request was sent, and the wireless networks that device remembers. The detectors will parse the contents of the probe request frames and pull a MAC address, a timestamp, and signal strength (used to approximate the distance from the detector). 
* The Broker
	* Once the required data has been parsed, it is sent to the manager (a Raspberry Pi 3B+), which in turn forwards the data to the database. Once the manager has received verification that the data has been entered into the database successfully, it sends a message to the detector to flush all captured data and start over. 
	* In addition, the tshark packet capture program allows the use of capture filters, which allow us to specify the kinds of packets that the detectors can see (and therefore store), meaning that no other network traffic besides probe requests will ever pass through our system. This is necessary in order to minimize the potential security concerns related to capturing unrelated, potentially private information. 

----

# Website - Work in progress
To view sample data of our project visit https://www.alteredcloud.com/rf-loc

----

###### Note: This was done for educational purposes
