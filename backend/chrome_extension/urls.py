# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('screen_recorder.urls')),
# ]

from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from screen_recorder.views import APIView
from django.contrib import admin

# router = DefaultRouter()
# router.register(r'recorded-screens', APIView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('screen_recorder.urls')),
]
