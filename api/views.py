from django.shortcuts import render
from rest_framework import generics
from api.serializers import CategorySerializer

from api.models import Category


class CategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
