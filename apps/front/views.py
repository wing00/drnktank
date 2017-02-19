from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class IndexView(TemplateView):
    template_name = "front/index.html"
    title = "DrnkTank"


class TestView(APIView):
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
        }
        return Response(content)
