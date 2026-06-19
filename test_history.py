import urllib.request
import json
try:
    res = urllib.request.urlopen('http://127.0.0.1:8000/api/history')
    data = json.loads(res.read())
    print("History length:", len(data))
    if len(data) > 0:
        print("First entry keys:", data[0].keys())
        print("Session key exists:", 'session' in data[0])
except Exception as e:
    print(e)
