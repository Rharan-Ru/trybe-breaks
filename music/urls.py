from .views import MusicsView, PlayListView, playlist_password
from django.urls import path


urlpatterns = [
    path('musics/<str:slug>', MusicsView.as_view(), name='musics-view'),
    path('', PlayListView.as_view(), name='playlist-view'),
    path('pass/<str:slug>', playlist_password, name='playlist-password'),

]
