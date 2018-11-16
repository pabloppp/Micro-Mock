# Micro Mock
## Ultra simple NodeJs app for locally mocking endpoints using JSON files
**v1.0.0**

The purpose of this small app to expose simple plain JSONs in specific endpoints, simulating a REST API.

You can then plug those endpoints in your app (web client, android/ios app) in order to mock a specific endpoint 
that will be updated in real time each time you modify the json.

### Usage
You don't need to modify the code, just run `node .` from the console in the root directory, and you'll see a list of 
available endpoints associated with each JSON appear, you can just copy the full url and use it in your app.

The mocked endpoints will be defined by the JSON files in the `/endpoints` directory (I added a sample for convenience).
You can edit, add or even remove JSON files from that directory and the mocks and available endpoints will be updated 
in real time (that's specially useful when you're testing an endpoint that can return different things, and you want 
to easily change the server response and be able to just refresh your app and see the updates).

All changes to the JSONs, and requests to the endpoints will be logged in the console to help you debug.

### JSON format

The json structure has to follow this schema

```json
{
  "delay": 100,
  "response": {
    "foo": "put whatever you want your mock server to return inside the 'respose' field"
  }
}
```

The `delay` field is optional, but it's a very nice way for you to provide a fake delay (simulate a slow response) 
in case you need to test that.  

The `response` field is what the mocked endpoint will return, it can be a JSON object, an array or even a value, but whatever you put in
there will be returned in the endpoint associated with that json.



