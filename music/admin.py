from django.contrib import admin
from .models import MusicModel, PlaylistModel
# Register your models here.

admin.site.register(MusicModel)
admin.site.register(PlaylistModel)
