from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AlbumSerializer
from .models import Album

# Create your views here.
class AlbumView(viewsets.ModelViewSet):
  serializer_class = AlbumSerializer
  queryset = Album.objects.all()
