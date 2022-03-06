from django.shortcuts import render
from django.views import View
from .models import PlaylistModel, MusicModel
import requests


class MusicView(View):
    def get(self, request):
        musics = MusicModel.objects.all()
        context = {
            'musics': musics,
        }
        return render(request, 'music/index.html', context)


class PlayListView(View):
    def get(self, request):
        # url = 'https://www.youtube.com/oembed?url=www.youtube.com/watch?v=dQw4w9WgXcQ'
        # video = requests.get(url)
        # video_meta = video.json()
        # print(video_meta['title'])
        # title = video_meta
        video_url = 'www.youtube.com/watch?v=dQw4w9WgXcQ'
        music_id = video_url.split('=')[-1]
        print(music_id)
        playlists = PlaylistModel.objects.all()
        context = {
            'playlists': playlists,
        }
        return render(request, 'music/playlists.html', context)
