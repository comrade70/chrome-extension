# views.py
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SCREEN_RECORDING_UPLOAD_PATH, RecordedScreen
from .serializers import RecordedScreenSerializer
import os
import uuid

def saveAndGenerateLink(recorded_screen, screen_data, audio_data):
    # Generate unique filenames for screen and audio recordings
    screen_filename = str(uuid.uuid4()) + '.webm'
    audio_filename = str(uuid.uuid4()) + '.webm'

    # Define the paths where the files will be stored
    screen_path = os.path.join(SCREEN_RECORDING_UPLOAD_PATH, screen_filename)
    audio_path = os.path.join(SCREEN_RECORDING_UPLOAD_PATH, audio_filename)

    # Save the screen and audio data to the specified paths
    with open(screen_path, 'wb') as screen_file:
        screen_file.write(screen_data)

    with open(audio_path, 'wb') as audio_file:
        audio_file.write(audio_data)

    # Update the `screen_recording` and `audio_recording` fields of the RecordedScreen instance
    recorded_screen.screen_recording = screen_path
    recorded_screen.audio_recording = audio_path

    # Generate a unique shareable link and save it to the instance
    def generate_shareable_link():
        return str(uuid.uuid4())[:8]  # Example: '1a2b3c4d'
    recorded_screen.shareable_link = generate_shareable_link()

    # Save the RecordedScreen instance to the database
    recorded_screen.save()

    return recorded_screen.shareable_link

class RecordedScreenDetail(APIView):
    def get(self, request, shareable_link):
        try:
            recorded_screen = get_object_or_404(RecordedScreen, shareable_link=shareable_link)
            serializer = RecordedScreenSerializer(recorded_screen)
            return Response(serializer.data)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RecordedScreenUpload(APIView):
    def post(self, request):
        serializer = RecordedScreenSerializer(data=request.data)
        if serializer.is_valid():
            screen_data = request.FILES.get('screen_recording')
            audio_data = request.FILES.get('audio_recording')

            if screen_data and audio_data:
                recorded_screen = RecordedScreen()
                recorded_screen.screen_recording = screen_data
                recorded_screen.audio_recording = audio_data

                # Call your saveAndGenerateLink function to save data and generate the link
                recorded_screen.shareable_link = saveAndGenerateLink(recorded_screen, screen_data.read(), audio_data.read())
                recorded_screen.save()

                # Return a JSON response with the shareable link
                serializer = RecordedScreenSerializer(recorded_screen)
                return JsonResponse(serializer.data, status=201)
            else:
                return JsonResponse({'error': 'Both screen_recording and audio_recording are required.'}, status=status.HTTP_400_BAD_REQUEST)

        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

