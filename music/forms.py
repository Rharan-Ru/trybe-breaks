from django import forms
from .models import PlaylistModel

class MyForm(forms.ModelForm):
    class Meta:
        model = PlaylistModel
        fields = ('__all__')
