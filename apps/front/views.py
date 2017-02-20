from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.templatetags.static import static

class IndexView(TemplateView):
    template_name = "front/index.html"
    title = "DrnkTank"


class SoundsJSON(APIView):
    def get(self, request, slug, format=None):
        if slug == 'make':
            sound_urls = [static('sounds/make{}.mp3'.format(i)) for i in range(4)]
        elif slug == 'miss':
            sound_urls = [static('sounds/miss{}.mp3'.format(i)) for i in range(3)]
        else:
            return Response({})
        return Response({"sounds": sound_urls})


class TestView(APIView):
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
        }
        return Response(content)
