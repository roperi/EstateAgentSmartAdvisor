import os
import sys
import openai
import tempfile
import logging


# Create logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
# Get paths
scriptdir = os.path.dirname(os.path.abspath(__file__))
mypath = os.path.join(scriptdir, 'log', 'ai.log')
# Create file handler which logs even DEBUG messages
fh = logging.FileHandler(mypath)
fh.setLevel(logging.DEBUG)
# Create console handler
ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
# create formatter and add it to the handlers
formatter = logging.Formatter('[%(levelname)s. %(name)s, (line #%(lineno)d) - %(asctime)s] %(message)s')
fh.setFormatter(formatter)
ch.setFormatter(formatter)
# add handlers to logger
logger.addHandler(fh)
logger.addHandler(ch)


# Get credentials
openai.api_key = os.environ.get('OPENAI_API_KEY')


# AI Agent

conversation = []


def get_ai_response(question):

    messages = [
        {
            "role": "system",
            "content": """
            You are an agent assisting a website visitor interested in a product. You always reply with "Yes, sir" or "No, sir".
            """

        }, {
            "role": "assistant",
            "content": "Hello, my name is Joe and I am calling from Interactive Estate Agents. How are you doing today?"
        }
    ]

    for message in conversation:
        if "assistant" in message:
            messages.append({
                "role": "assistant",
                "content": message["assistant"]
            })
        if "user" in message:
            messages.append({
                "role": "user",
                "content": message["user"]
            })

    messages.append({
        "role": "user",
        "content": question
    })

    conversation.append({
        "user": question
    })

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        temperature=0,
        messages=messages,
        stream=True
    )
    logger.info(response)

    def generate():
        ai_response = ""

        for chunk in response:
            if "content" in chunk.choices[0].delta:
                logger.debug(chunk)
                ai_response = ai_response + chunk.choices[0].delta.content
                yield chunk.choices[0].delta.content

        conversation.append({
            "assistant": ai_response
        })
    return generate


def transcribe(request):
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
        temp_file_name = temp_file.name

    data = request.files

    audio_content = data["audio"]
    
    with open(temp_file_name, "wb") as f:
        f.write(audio_content.read())
    audio_file = open(temp_file_name, "rb")

    transcription = openai.Audio.transcribe("whisper-1", audio_file)

    os.remove(temp_file_name)

    return transcription["text"]
