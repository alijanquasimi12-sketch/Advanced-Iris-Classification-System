import urllib.request
import json
import traceback

req = urllib.request.Request('http://127.0.0.1:8000/api/train', data=b'{"n_neighbors": 5}', headers={'Content-Type': 'application/json'})
try:
    res = urllib.request.urlopen(req)
    print("SUCCESS", res.read())
except Exception as e:
    print("ERROR", e)
    try:
        print(e.read().decode())
    except:
        pass
