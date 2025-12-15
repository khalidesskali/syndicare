# Generated migration for removing ReunionAttendee model

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ReunionAttendee',
        ),
    ]
