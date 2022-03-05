from django.db import models
from django.utils.timezone import now


class MusicModel(models.Model):
    title = models.CharField(max_length=255, unique=True)
    music_id = models.CharField(max_length=100)
    author = models.CharField(max_length=255)
    add_at = models.DateField(default=now())

    def __str__(self):
        return self.title


class PlaylistModel(models.Model):
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    author = models.CharField(max_length=255)
    musics = models.ManyToManyField(MusicModel)
    created_at = models.DateField(default=now())

    def __str__(self):
        return self.title
