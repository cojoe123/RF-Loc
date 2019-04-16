from rest_framework import serializers
from .models import ProbeRequestFrame, WhiteListRequests

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProbeRequestFrame
        fields = ('id', 'mac_address', 'time_stamp', 'signal_strength', 'detector',)

class WhitelistSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhiteListRequests
        fields = ('id', 'user', 'mac_address',)