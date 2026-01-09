
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0009_fix_payment_proof_path'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='created_by_syndic',
            field=models.ForeignKey(blank=True, limit_choices_to={'role': 'SYNDIC'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_residents', to=settings.AUTH_USER_MODEL),
        ),
    ]
