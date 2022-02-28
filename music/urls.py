from .views import MusicView
from django.urls import path


urlpatterns = [
    path('', MusicView.as_view(), name='music-view'),
]