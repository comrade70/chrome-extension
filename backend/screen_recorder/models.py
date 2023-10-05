# models.py
from django.db import models
# from django.contrib.auth.models import User

# Create a directory path for storing screen and audio files.
SCREEN_RECORDING_UPLOAD_PATH = 'screen_recordings/'

class RecordedScreen(models.Model):
    # owner = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    shareable_link = models.CharField(max_length=255, unique=True)

    # Fields to store screen and audio data as files.
    screen_recording = models.FileField(upload_to=SCREEN_RECORDING_UPLOAD_PATH, blank=True, null=True)
    audio_recording = models.FileField(upload_to=SCREEN_RECORDING_UPLOAD_PATH, blank=True, null=True)

    def __str__(self):
        return f"RecordedScreen of {self.shareable_link} at {self.timestamp}"
