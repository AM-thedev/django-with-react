from django.contrib import admin
from .models import Album

# Register your models here.
class AlbumAdmin(admin.ModelAdmin):
  list = ('title', 'artist', 'rating')

admin.site.register(Album, AlbumAdmin)
