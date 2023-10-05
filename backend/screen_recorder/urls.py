# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.RecordedScreenUpload.as_view(), name='recorded-screen-upload'),
    path('recorded-screen/<str:shareable_link>/', views.RecordedScreenDetail.as_view(), name='recorded-screen-detail'),
]


