import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "redmart_project.settings")
django.setup()

import jwt
from django.conf import settings

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3MTAzMTE1LCJpYXQiOjE3NTcxMDI4MTUsImp0aSI6IjRiYzRmNzFlY2EyYTQxYzg5NWQ0NDYyYjk0MTVmMGQyIiwidXNlcl9pZCI6MX0.lVLDdgPl3b0uWSU6BFlPdtfEf39ZYPmWoloBE7hVWCQ"
decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
print(decoded)