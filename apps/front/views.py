from django.shortcuts import render
from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = "front/index.html"
    title = "DrnkTank"


class TestView(TemplateView):
    template_name = "front/test.html"
    title = "DrnkTank"

