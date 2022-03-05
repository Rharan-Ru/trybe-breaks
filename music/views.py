from django.shortcuts import render
from django.views import View
from .models import PlaylistModel, MusicModel


class MusicView(View):
    def get(self, request):
        musics = MusicModel.objects.all()
        context = {
            'musics': musics,
        }
        return render(request, 'music/index.html', context)


class PlayListView(View):
    def get(self, request):
        playlists = PlaylistModel.objects.all()
        context = {
            'playlists': playlists,
        }
        return render(request, 'music/playlists.html', context)
