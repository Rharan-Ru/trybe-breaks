from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views import View
from .models import PlaylistModel, MusicModel
from .forms import MyForm
import requests
from django.views.decorators.csrf import csrf_exempt


class MusicsView(View):
    def get(self, request, slug):
        try:
            if request.session['slug'] == slug:
                request.session[slug] = ''
                playlist = PlaylistModel.objects.get(slug=slug)
                context = {
                    'playlist': playlist,
                }
                return render(request, 'music/index.html', context)
        except:
            playlist = PlaylistModel.objects.get(slug=slug)
            context = {
                'playlist': playlist,
            }
            return render(request, 'music/index.html', context)


class PlayListView(View):
    def get(self, request):
        playlists = PlaylistModel.objects.all().order_by('-created_at')
        context = {
            'playlists': playlists,
        }
        return render(request, 'music/playlists.html', context)

    def post(self, request):
        title = request.POST['title']
        author = request.POST['author']
        privacy = request.POST['playlist-priv']
        links_list = request.POST.getlist('links-list')
        image = request.FILES['image']

        try:
            new_playlist = PlaylistModel(
                title=title,
                author=author,
                privacy=privacy,
                thumb=image
            )
        except Exception as error:
            return JsonResponse({"msg": "Este título já existe, por favor adicione outro."}, status=400)

        if privacy == 1:
            playlist_password = request.POST['playlist-password']
            new_playlist.password = playlist_password

        if len(links_list) > 0:
            new_playlist.save()
            for link in links_list:
                if MusicModel.objects.filter(video_url=link).exists():
                    music = MusicModel.objects.get(video_url=link)
                    new_playlist.musics.add(music)
                else:
                    try:
                        music = MusicModel.objects.create(video_url=link)
                        new_playlist.musics.add(music)
                    except Exception as error:
                        new_playlist.delete()
                        return JsonResponse({"msg": "Link inválido, adicione apenas a url do video."}, status=400)
        new_playlist.save()
        return redirect('playlist-view')


@csrf_exempt
def playlist_password(request, slug):
    if request.method == "POST":
        print(request.POST)
        playlist = PlaylistModel.objects.get(slug=slug)
        playlist_password_input = request.POST['playlist-password-enter']
        if playlist.password == playlist_password_input:
            request.session[slug] = True
            return JsonResponse({"url": f'/musics/{slug}'}, status=200)
        return JsonResponse({"msg": "Senha inválida."}, status=400)


@csrf_exempt
def like_view(request, slug):
    if request.method == "POST":
        print(slug)
        playlist = PlaylistModel.objects.get(slug=slug)
        playlist.likes += 1
        playlist.save()
        return JsonResponse({"msg": "Liked"}, status=200)


@csrf_exempt
def dislike_view(request, slug):
    if request.method == "POST":
        print(slug)
        playlist = PlaylistModel.objects.get(slug=slug)
        playlist.likes -= 1
        playlist.save()
        return JsonResponse({"msg": "Disliked"}, status=200)
