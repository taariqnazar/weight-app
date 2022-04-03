from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=["GET"])
def chart():
    response = {
      "hello" : "world"        
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug = True, host="0.0.0.0", port=3001)
