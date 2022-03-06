from .views import MusicView, PlayListView
from django.urls import path


urlpatterns = [
    path('musics/<str:slug>', MusicView.as_view(), name='music-view'),
    path('', PlayListView.as_view(), name='playlist-view'),
]
