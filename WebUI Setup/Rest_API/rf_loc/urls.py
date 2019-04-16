'''
endpoint urls 
'''
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rf_loc import views

urlpatterns = [
    path('probeRequests/', views.RequestList.as_view(), name='request-list'),
    path('probeRequests/<int:pk>/',views.RequestDetail.as_view(), name='request-detail'),
    path('whitelist/', views.WhitelistRequestList.as_view(), name='whitelist-list'),
    path('', views.api_root),
]

urlpatterns = format_suffix_patterns(urlpatterns)
