import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib

app = Flask(__name__)
# Aktifkan CORS untuk frontend (allow all origins untuk development)
# CORS(app)
CORS(app, origins=["http://localhost:5173"])

# Gunakan path aman relatif terhadap file app.py berjalan
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'diabetes_model.pkl')
SCALER_PATH = os.path.join(BASE_DIR, 'scaler.pkl')

# Load Model dan Scaler
models_loaded = False
try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    models_loaded = True
    print(f"✓ Model loaded successfully from {MODEL_PATH}")
    print(f"✓ Scaler loaded successfully from {SCALER_PATH}")
except FileNotFoundError as e:
    print(f"✗ Error: Model files not found. Make sure diabetes_model.pkl and scaler.pkl exist in {BASE_DIR}")
    print(f"  Details: {e}")
except Exception as e:
    print(f"✗ Error loading model files: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    # Check apakah model sudah ter-load
    if not models_loaded:
        return jsonify({"error": "Model belum dimuat. Server belum siap."}), 503
    
    try:
        # data = request.json
        data = request.get_json()
        if not data:
            return jsonify({"error": "Data input tidak lengkap"}), 400

        # Urutan fitur WAJIB
        feature_keys = [
            "Kehamilan", "Glukosa", "Tekanan_Darah", 
            "Ketebalan_kulit", "Insulin", "BMI", 
            "Riwayat_Keluarga", "Usia"
        ]
        
        features = {}

        for key in feature_keys:
            if key not in data or data[key] == "":
                return jsonify({
                    "error": f"Data input tidak lengkap (Kehilangan {key})"
                }), 400

            try:
                val = float(data[key])

                if val < 0:
                    return jsonify({
                        "error": f"Input {key} tidak boleh negatif"
                    }), 400

                features[key] = val

            except ValueError:
                return jsonify({
                    "error": f"Input {key} harus angka"
                }), 400


        input_dataframe = pd.DataFrame([features])

        input_scaled = scaler.transform(input_dataframe)

        prediction = int(model.predict(input_scaled)[0])
        
        # Ambil probabilitas jika model mendukung
        probability = None
        if hasattr(model, "predict_proba"):
            probability = float(model.predict_proba(input_scaled)[0][1])

        # Formatting Response
        if prediction == 1:
            response = {
                "prediction": 1,
                "status": "warning",
                "message": "Berpotensi memiliki risiko diabetes"
            }
        else:
            response = {
                "prediction": 0,
                "status": "safe",
                "message": "Risiko diabetes rendah"
            }
            
        if probability is not None:
            response["probability"] = round(probability, 4)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": "Terjadi kesalahan server", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False, port=5000, host='127.0.0.1')