'''
site wide urls
'''

from django.contrib import admin
from django.urls import path, include
# from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('auth/', ObtainAuthToken.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('', include('rf_loc.urls')),


    path(r'api-token-auth/', obtain_jwt_token),
    path(r'api-token-refresh/', refresh_jwt_token),
]
