from django.db import models

# table model for holding mac address, time stamp, and signal strength from pcap file
class ProbeRequestFrame(models.Model):
    mac_address = models.CharField(max_length=18, blank=False)
    time_stamp = models.CharField(max_length=25, blank=False)
    signal_strength = models.IntegerField(blank=False)
    detector = models.CharField(max_length=30)

# table for people who are whitelisted
class WhiteListRequests(models.Model):
    user = models.CharField(max_length=25, blank=False)
    mac_address = models.CharField(max_length=18, blank=False)

