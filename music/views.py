from django.shortcuts import render, redirect
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
        context = {
            'playlists': playlists,
        }
        return render(request, 'music/playlists.html', context)

    def post(self, request):
        title = request.POST['title']
        author = request.POST['author']
        privacy = request.POST['playlist-priv']
        links_list = request.POST.getlist('links-list')

        new_playlist = PlaylistModel.objects.create(
            title=title,
            author=author,
        )
        for link in links_list:
            music = MusicModel.objects.create(video_url=link)
            music.save()
            new_playlist.musics.add(music)
        new_playlist.save()
        return redirect('playlist-view')
