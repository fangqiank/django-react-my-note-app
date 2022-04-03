from django.db import models
import datetime


# Create your models here.

class Note(models.Model):
    now = datetime.datetime.now().strftime('%a, %b %d %H:%M')
    title = models.TextField(null=False, blank=False,
                             default=f'New Note {now}')
    body = models.TextField(null=True, blank=True)
    updatedAt = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
