from pyexpat import model
from django.db import models
from django.utils.timezone import now
from django.utils.text import slugify
import requests


class MusicModel(models.Model):
    video_url = models.CharField(max_length=255)
    title = models.CharField(
        max_length=255, blank=True, null=True)
    music_id = models.CharField(max_length=100, blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    add_at = models.DateField(default=now())

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        try:
            api_url = 'https://www.youtube.com/oembed?url='
            video_url = self.video_url
            complete_url = api_url + video_url
            video_meta = requests.get(complete_url)
            data = video_meta.json()

            self.title = data['title']
            self.music_id = self.video_url.split('=')[-1]
            self.author = data['author_name']
            self.image_url = data['thumbnail_url']

            super(MusicModel, self).save(*args, **kwargs)
        except Exception as error:
            print(error)
            return


class PlaylistModel(models.Model):
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    author = models.CharField(max_length=255)
    musics = models.ManyToManyField(MusicModel, blank=True, null=True)
    privacy = models.BooleanField(default=False)
    password = models.CharField(max_length=30, blank=True, null=True)
    # thumb = models.ImageField(upload_to='thumb/', blank=True, null=True)
    created_at = models.DateField(default=now())
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    thumb_url = models.CharField(max_length=10000, null=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        try:
            super(PlaylistModel, self).save(*args, **kwargs)
            if self.musics:
                music_test = self.musics.all().order_by('?')[0]
                self.thumb_url = music_test.image_url
                print('teste')
            self.slug = slugify(self.title)
            super(PlaylistModel, self).save(*args, **kwargs)
        except Exception as error:
            print(error)
            return
