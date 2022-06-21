from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views import View
from requests import session
from .models import PlaylistModel, MusicModel
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import cache_page


def remove_duplicates(list1, list2):
    new_list = []
    for play in list1:
        new_list.append(play)
    for play in list2:
        if play in new_list:
            new_list.remove(play)
        else:
            new_list.append(play)
    return new_list


class CreateNewPlaylist(View):
    def get(self, request):
        return render(request, 'music/create_playlist.html')

    def post(self, request):
        title = request.POST['title']
        author = request.POST['author']
        privacy = request.POST['playlist-priv']
        links_list = request.POST.getlist('links-list')
        try:
            new_playlist = PlaylistModel(
                title=title,
                author=author,
                privacy=privacy,
            )
        except Exception as error:
            return JsonResponse({"msg": "Este título já existe, por favor adicione outro."}, status=400)

        if privacy == '1':
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
        else:
            return JsonResponse({"msg": "Adicione uma url de video do Youtube."}, status=400)
        new_playlist.save()
        return redirect('playlist-view')


class MusicsView(View):
    def get(self, request, slug):
        playlist = PlaylistModel.objects.get(slug=slug)
        if playlist.privacy == True:
            if request.session[slug] == True:
                first_music = playlist.musics.all()[0].music_id
                playlist.views += 1
                playlist.save()
                request.session[slug] = ''
                context = {
                    'playlist': playlist,
                    'first_music': first_music,
                }
                return render(request, 'music/index.html', context)
            else:
                return redirect('playlist-view')
        first_music = playlist.musics.all()[0].music_id
        playlist.views += 1
        playlist.save()
        context = {
            'playlist': playlist,
            'first_music': first_music,
        }
        return render(request, 'music/index.html', context)


class PlayListView(View):
    def get(self, request):
        playlists = PlaylistModel.objects.all()
        lasts_playlists = playlists.order_by('-created_at')[0:5]

        most_view = playlists.order_by('-views').reverse()
        most_view = remove_duplicates(lasts_playlists, most_view)[0:5]

        random_playlists = playlists.order_by('?')
        random_playlists = remove_duplicates(lasts_playlists, random_playlists)
        random_playlists = remove_duplicates(most_view, random_playlists)[0:5]

        context = {
            'playlists': lasts_playlists,
            'most_views': most_view,
            'random_playlists': random_playlists,
        }
        return render(request, 'music/playlists.html', context)


@cache_page(60 * 15)
@csrf_exempt
def playlist_password(request, slug):
    if request.method == "POST":
        playlist = PlaylistModel.objects.get(slug=slug)
        playlist_password_input = request.POST['playlist-password-enter']
        if playlist.password == playlist_password_input:
            request.session[slug] = True
            return JsonResponse({"url": f'/musics/{slug}'}, status=200)
        return JsonResponse({"msg": "Senha inválida."}, status=400)


@cache_page(60 * 15)
@csrf_exempt
def like_view(request, slug):
    if request.method == "POST":
        playlist = PlaylistModel.objects.get(slug=slug)
        playlist.likes += 1
        playlist.save()
        return JsonResponse({"msg": "Liked"}, status=200)


@cache_page(60 * 15)
@csrf_exempt
def dislike_view(request, slug):
    if request.method == "POST":
        playlist = PlaylistModel.objects.get(slug=slug)
        playlist.likes -= 1
        playlist.save()
        return JsonResponse({"msg": "Disliked"}, status=200)
