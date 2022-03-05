from django.db import models
from django.utils.timezone import now
# Create your models here.


class MusicModel(models.Model):
    title = models.CharField(max_length=255, unique=True)
    music_id = models.CharField(max_length=10)
    author = models.CharField(max_length=255)
    add_at = models.DateField(default=now())


class PlaylistModel(models.Model):
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    author = models.CharField(max_length=255)
    musics = models.ManyToManyField(MusicModel, on_delete=models.PROTECT)
    created_at = models.DateField(default=now())
