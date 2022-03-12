from django.shortcuts import render
from django.views import View
from .models import PlaylistModel, MusicModel
import requests


class MusicView(View):
    def get(self, request, slug):
        playlist = PlaylistModel.objects.get(slug=slug)
        context = {
            'playlist': playlist,
        }
        return render(request, 'music/index.html', context)


class PlayListView(View):
    def get(self, request):
        playlists = PlaylistModel.objects.all()
        # for x in range(12):
        #     new = PlaylistModel.objects.create(
        #         title = playlists[0].title + str(x),
        #         author = "monke",
        #     )
        #     new.save()
        context = {
            'playlists': playlists,
        }
        return render(request, 'music/playlists.html', context)
