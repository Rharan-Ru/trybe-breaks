from .views import MusicView, PlayListView, playlist_password
from django.urls import path


urlpatterns = [
    path('musics/<str:slug>', MusicView.as_view(), name='music-view'),
    path('', PlayListView.as_view(), name='playlist-view'),
    path('pass/<str:slug>', playlist_password, name='playlist-password'),

]
