from .views import MusicsView, PlayListView, playlist_password, like_view, dislike_view, CreateNewPlaylist
from django.urls import path
from django.views.decorators.cache import cache_page


urlpatterns = [
    path('musics/<str:slug>', cache_page(60 * 15)(MusicsView.as_view()), name='musics-view'),
    path('', PlayListView.as_view(), name='playlist-view'),
    path('new-playlist', cache_page(60 * 15)(CreateNewPlaylist.as_view()), name='new-playlist'),
    path('pass/<str:slug>', playlist_password, name='playlist-password'),
    path('like/<str:slug>', like_view, name='like-playlist'),
    path('dislike/<str:slug>', dislike_view, name='dislike-playlist'),
]
