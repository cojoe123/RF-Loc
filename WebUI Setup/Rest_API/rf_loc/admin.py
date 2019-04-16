from django.contrib import admin
from .models import ProbeRequestFrame, WhiteListRequests

# register the model to be used by admins
admin.site.register(ProbeRequestFrame)
admin.site.register(WhiteListRequests)
