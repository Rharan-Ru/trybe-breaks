from django.shortcuts import render
from django.views import View

# Create your views here.


class MusicView(View):
    def get(self, request):
        return render(request, 'music/index.html')
