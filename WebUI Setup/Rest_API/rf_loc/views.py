'''
The way each page is shown
'''

from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import ProbeRequestFrame, WhiteListRequests
from .serializers import RequestSerializer, WhitelistSerializer
from .permissions import IsOwnedOrReadOnly

# Default root page view /
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'Probe Requests': reverse('request-list', request=request, format=format),
        'Whitelist Requests': reverse('whitelist-list', request=request, format=format)
    })

# request list view probeRequest/
class RequestList(generics.ListAPIView):
    queryset = ProbeRequestFrame.objects.all()
    serializer_class = RequestSerializer
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # allow for querying values associated with specified detector name
    def get_queryset(self):
        queryset = ProbeRequestFrame.objects.all()
        detector = self.request.query_params.get('detector', None)
        if detector is not None:
            queryset = queryset.filter(detector=detector)
        return queryset


# request details view probeRequest/<pk>/
class RequestDetail(generics.RetrieveAPIView):
    queryset = ProbeRequestFrame.objects.all()
    serializer_class = RequestSerializer
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication, )
    permission_classes = (permissions.IsAuthenticated,)

# whitelist request endpoint allowing post
class WhitelistRequestList(generics.ListCreateAPIView):
    queryset = WhiteListRequests.objects.all()
    serializer_class = WhitelistSerializer

