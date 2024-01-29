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

    # Consume the generator and store its content in a list
    audio_content = list(audio)

    # Check if the audio content is not empty
    if audio_content:
        # Stream the audio content to the client
        return Response(audio_content, mimetype="audio/wav")
    else:
        # Handle the case where the audio content is empty
        return Response("Audio content is empty", status=500, mimetype="text/plain")

    return response


if __name__ == "__main__":
    app.run(debug=True)
