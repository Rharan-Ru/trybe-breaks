# Generated by Django 4.0.4 on 2022-05-06 02:55

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0016_remove_playlistmodel_thumb_alter_musicmodel_add_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musicmodel',
            name='add_at',
            field=models.DateField(default=datetime.datetime(2022, 5, 6, 2, 55, 49, 219470, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='playlistmodel',
            name='created_at',
            field=models.DateField(default=datetime.datetime(2022, 5, 6, 2, 55, 49, 220458, tzinfo=utc)),
        ),
    ]
