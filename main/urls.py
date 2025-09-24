from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('blog/', views.blog, name='blog'),
    path('single-blog/', views.single_blog, name='single_blog'),
    path('performer/', views.performer, name='performer'),
    path('program/', views.program, name='program'),
    path('venue/', views.venue, name='venue'),
    path('elements/', views.elements, name='elements'),
]
