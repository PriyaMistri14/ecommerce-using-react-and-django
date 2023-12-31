# Generated by Django 4.2.3 on 2023-08-07 05:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0009_coupon_order_total_amount_order_coupon'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='discount',
            name='minimum_order',
        ),
        migrations.AddField(
            model_name='discount',
            name='due_date',
            field=models.DateField(default=datetime.date(2023, 8, 12)),
        ),
        migrations.AlterField(
            model_name='discount',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]
