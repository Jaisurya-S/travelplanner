from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests

# ── CONFIG ──────────────────────────────────────────────────────────────────
# Get your free API key from https://www.fast2sms.com → Dashboard → Dev API
FAST2SMS_API_KEY = "hDZCqyjuY2KO6VWLAQ3xw5cal8JRpM0SHNInfX1zesGFd9mbPTuXAcBOS3fTtzbJ2LDU1pxm4M0q6yj5"

# Load dataset
df = pd.read_csv("chatbot_tourist_qa_dataset.csv")

# Initialize TF-IDF
vectorizer = TfidfVectorizer()
tfidf = vectorizer.fit_transform(df['User'])

app = Flask(__name__)
CORS(app)

# Chat endpoint
@app.route("/chat", methods=["GET"])
def chat():
    user_msg = request.args.get("message", "")
    if not user_msg:
        return jsonify({"reply": "Please type a message."})

    user_vec = vectorizer.transform([user_msg])
    similarity = cosine_similarity(user_vec, tfidf)
    best_match_idx = similarity.argmax()
    response = df.iloc[best_match_idx]['Bot']

    return jsonify({"reply": response})

# SMS endpoint
@app.route("/send-sms", methods=["POST"])
def send_sms():
    data = request.get_json()
    phone   = data.get("phone", "").strip()
    message = data.get("message", "").strip()

    if not phone or not message:
        return jsonify({"success": False, "error": "Phone and message are required."}), 400

    # Keep only digits, strip country code if present
    digits = "".join(filter(str.isdigit, phone))
    if digits.startswith("91") and len(digits) == 12:
        digits = digits[2:]
    if len(digits) != 10:
        return jsonify({"success": False, "error": "Enter a valid 10-digit Indian mobile number."}), 400

    # Truncate to 160 chars for SMS (Fast2SMS DLT limit)
    sms_body = message[:500]

    try:
        resp = requests.post(
            "https://www.fast2sms.com/dev/bulkV2",
            headers={"authorization": FAST2SMS_API_KEY},
            json={
                "route": "q",          # quick transactional route
                "message": sms_body,
                "language": "english",
                "flash": 0,
                "numbers": digits,
            },
            timeout=10
        )
        result = resp.json()
        if result.get("return"):
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": result.get("message", "SMS failed")}), 500
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)