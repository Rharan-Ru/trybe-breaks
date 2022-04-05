from .views import MusicsView, PlayListView, playlist_password, like_view, dislike_view, CreateNewPlaylist
from django.urls import path


urlpatterns = [
    path('musics/<str:slug>', MusicsView.as_view(), name='musics-view'),
    path('', PlayListView.as_view(), name='playlist-view'),
    path('new-playlist', CreateNewPlaylist.as_view(), name='new-playlist'),
    path('pass/<str:slug>', playlist_password, name='playlist-password'),
    path('like/<str:slug>', like_view, name='like-playlist'),
    path('dislike/<str:slug>', dislike_view, name='dislike-playlist'),
]
