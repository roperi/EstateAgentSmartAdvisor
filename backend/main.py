import os
from flask import Flask, request, Response
from flask_cors import CORS#, cross_origin
from ai import get_ai_response, transcribe
from elevenlabs import generate, stream, set_api_key


# Get credentials
ELEVEN_API_KEY = os.environ.get('ELEVEN_API_KEY')
set_api_key(ELEVEN_API_KEY)
API_BASE_URL = os.environ.get('API_URL')

# Flask

app = Flask(__name__)
CORS(app)


@app.route("/speak", methods=["POST"])
# @cross_origin(origin=API_BASE_URL)
def speak():
    # Transcribe audio input from customer
    question = transcribe(request)
    # Generate a text response to customer
    generate_response = get_ai_response(question)
    # Convert generated response to speech
    audio = generate(
        text=generate_response(),
        voice="Dorothy",
        model="eleven_multilingual_v2",
        stream=True
    )
    stream(audio)

    response = Response(audio, mimetype="audio/wav")

    return response


if __name__ == "__main__":
    app.run(debug=True)
