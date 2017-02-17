from django.conf.urls import url, include
from django.contrib import admin
from .views import *


urlpatterns = [
    url(r'^$', IndexView.as_view()),
    url(r'^test/', TestView.as_view()),
]
