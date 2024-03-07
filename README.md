<h1 align="center">Estate Agent Smart Advisor - Real Estate Chatbot</h1>
<h2 align="center">Powered by OpenAI + ElevenLabs + Flask + Next.js </h2>


Estate Agent Smart Advisor is a virtual assistant that can handle inquiries about buying, selling, and renting homes from within a property webpage.

----------
## Live demo

https://estate-agent-smart-advisor.roperi.xyz

Demo will stop working when my OpenAI/ElevenLabs balance is zero. Note that you can still test it with your own API keys in localhost.

## Features
- Automated handling of user inquires
- Natural sounding estate agent

## How does it works?
Estate Agent Smart Advisor performs the following tasks:
1. Listens to user inquiry.
2. Transcribes user inquiry.
3. Sends transcript for chat completion.
4. Receives chat completion and turns it into speech.
5. Streams back audio response to user inquiry. 

Note that user can continue chatting with the Smart Advisor and the above process starts again. 

## Requirements

- Python >=3.10
- Transcription processing: OpenAI API key (you need at least 5 dollars in your account balance)
- Text to Speech: ElevenLabs API Key (free)

## Tested Environment

This program has been tested and verified to work correctly in Python 3.10 Debian 10.

## Installation

1. **Create Virtual Environment:** It's recommended to create a virtual environment to isolate the dependencies of this project. You can create a virtual environment with Python 3.10 using the following command:

    ```bash
    python3 -m venv venv
    ```

    This command will create a virtual environment named `venv` in the current directory.


2. **Activate Virtual Environment:** After creating the virtual environment, activate it using the appropriate command for your operating system:

    - On Windows:

        ```bash
        .\venv\Scripts\activate
        ```

    - On macOS and Linux:

        ```bash
        source venv/bin/activate
        ```
      
3. **Clone the repository:**
   
    ```
    git clone https://github.com/roperi/EstateAgentSmartAdvisor.git
    ```

4. **Navigate to the project directory:**
   
    ```
    cd EstateAgentSmartAdvisor/
    ```

5. **Install the required dependencies:**
   
    ```
    pip install -r backend/requirements.txt
    ```

## OpenAI and ElevenLabs API Keys

Create a `.env` file in `backend` folder and paste all your own API keys. 

Example:

```commandline
# ~/EstateAgentSmartAdvisor/backend/.env

OPENAI_API_KEY="YOUR-API-KEY"
ELEVEN_API_KEY="YOUR-API-KEY"

```

### OpenAI

1. `OPENAI_API_KEY="YOUR-API-KEY"`:
   - This is the API key used to authenticate requests to the OpenAI API.
   - You can get your API from https://openai.com
   - It provides access to OpenAI's services, including language models like GPT-3.5 Turbo.
   - You should keep this key secure and avoid sharing it publicly.

### ElevenLabs
1. `ELEVEN_API_KEY="YOUR-API-KEY"`:
   - This is the API key used to authenticate requests to the ElevenLabs API.
   - You can get your API from https://elevenlabs.io
   - You should keep this key secure and avoid sharing it publicly.


## Backend

In one terminal run backend

```
cd backend/

python main.py
```

Backend will start running in http://localhost:5000/


## Frontend

In another terminal:

```commandline
cd frontend/

npm run dev
```


Frontend will start running in http://localhost:3000/


## Chat with Estate Agent Smart Advisor.
Open a browser and go to http://localhost:3000/ 

To start chatting press the START button and talk. Once you are done talking press STOP and the chatbot should reply you back.

## Error messages

If you are getting this error during audio streaming:

```commandline
Traceback (most recent call last):
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/flask/app.py", line 1488, in __call__
    return self.wsgi_app(environ, start_response)
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/flask/app.py", line 1466, in wsgi_app
    response = self.handle_exception(e)
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/flask_cors/extension.py", line 176, in wrapped_function
    return cors_after_request(app.make_response(f(*args, **kwargs)))
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/flask/app.py", line 1463, in wsgi_app
    response = self.full_dispatch_request()
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/flask/app.py", line 872, in full_dispatch_request
    rv = self.handle_user_exception(e)
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/flask_cors/extension.py", line 176, in wrapped_function
    return cors_after_request(app.make_response(f(*args, **kwargs)))
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/flask/app.py", line 870, in full_dispatch_request
    rv = self.dispatch_request()
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/flask/app.py", line 855, in dispatch_request
    return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
  File "/home/user/workspace/EstateAgentSmartAdvisor/backend/main.py", line 37, in speak
    stream(audio)
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/elevenlabs/utils.py", line 74, in stream
    for chunk in audio_stream:
  File "/home/user/.virtualenvs/EstateAgentSmartAdvisor/lib/python3.10/site-packages/elevenlabs/api/tts.py", line 122, in generate_stream_input
    if data["audio"]:
KeyError: 'audio'
```
It's probably because of this:

```
{'message': 'Unusual activity detected. Free Tier usage disabled. If you are using a proxy/VPN you might need to purchase a Paid Plan to not trigger our abuse detectors. Free Tier only works if users do not abuse it, for example by creating multiple free accounts. If we notice that many people try to abuse it, we will need to reconsider Free Tier altogether. \nPlease play fair and purchase any Paid Subscription to continue.', 'error': 'detected_unusual_activity', 'code': 1008}
```

If so, change to a paid subscription in ElevenLabs to make it work.


----------

## Copyright 
Copyright (c) 2024 roperi. 


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
