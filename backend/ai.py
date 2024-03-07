# Copyright © 2024 roperi

import os
import sys
import openai
import tempfile
import logging
from dotenv import load_dotenv

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


# Load environment variables
load_dotenv()

# Get credentials
openai.api_key = os.environ.get('OPENAI_API_KEY')


# AI Agent

conversation = []


def get_ai_response(question):

    messages = [
        {
            "role": "system",
            "content": """
            You are an estate agent assisting a website visitor interested in a property.
            Your goal is to engage in an interactive conversation, ask pre-qualified questions, provide general 
            information about the property, and ultimately arrange a viewing. Mention key features, 
            pricing details, and additional property information. Provide short and concise answers. 
            
            Property Information:
        
            Property location:
            Duchess Walk, London Bridge, SE1
        
            Description:
            A beautifully finished 3 bedroom new build apartment, set on the 9th floor, boasting 2 Ensuites and 1 
            bathroom, with 2 sizable Terraces with stunning views of Tower Bridge and toward Canary Wharf.
        
            Price: two million two hundred thousand pounds.
        
            Key features:
            - 3 bedroom new build apartment
            - 9th floor with lift access
            - Sleek open plan living space
            - Contemporary fixtures and fittings
            - 2 Ensuite showers and 1 bathroom
            - 2 Terraces with brilliant views
            - Close to local shops and amenities
            - Sought after London Bridge location
        
            Further details:
            - Tenure: Leasehold
            - Total Square foot: one thousand sixty seven.
        
            Near stations:
            - Tower Hill station
            - London Bridge station
            - Tower Gateway station
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
        model="gpt-3.5-turbo",
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
