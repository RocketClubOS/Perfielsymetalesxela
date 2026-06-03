from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import answer_customer

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Bobby is alive!"

@app.route("/preguntar", methods=["POST"])
def preguntar():
    data = request.get_json()
    question = data.get("question", "")

    if not question:
        return jsonify({"answer": "¿Qué producto necesitas?"})

    try:
        answer = answer_customer(question)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"answer": f"Error interno en Bobby: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)