from django.db import models

# Create your models here.
class Album(models.Model):
  title = models.CharField(max_length=100)
  artist = models.CharField(max_length=100)
  rating = models.PositiveIntegerField(default=1)

  def _str_(self):
    return self.title
