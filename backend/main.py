# Copyright © 2024 roperi

import os
from flask import Flask, request, Response
from flask_cors import CORS
from ai import get_ai_response, transcribe
from elevenlabs import generate, stream, set_api_key
from dotenv import load_dotenv


# Load environment variables
load_dotenv()

# Get credentials
ELEVEN_API_KEY = os.environ.get('ELEVEN_API_KEY')
set_api_key(ELEVEN_API_KEY)

# Flask

app = Flask(__name__)
CORS(app)


@app.route("/speak", methods=["POST"])
def speak():
    # Transcribe audio input from customer
    question = transcribe(request)
    # Generate a text response to customer
    generate_response = get_ai_response(question)
    # Convert generated response to speech
    audio = generate(
        text=generate_response(),
        voice="Daniel",
        model="eleven_multilingual_v2",
        stream=True
    )
    stream(audio)

    response = Response(audio, mimetype="audio/wav")

    return response


if __name__ == "__main__":
    app.run(debug=True)
