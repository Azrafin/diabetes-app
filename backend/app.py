import os
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / 'diabetes_model.pkl'
SCALER_PATH = BASE_DIR / 'scaler.pkl'

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
except Exception as exc:
    model = None
    scaler = None
    print(f'Error Loading Model or Scaler: {exc}')

FEATURE_COLUMNS = [
    'Pregnancies',
    'Glucose',
    'BloodPressure',
    'SkinThickness',
    'Insulin',
    'BMI',
    'DiabetesPedigreeFunction',
    'Age',
]

REQUIRED_FIELDS = [
    'Kehamilan',
    'Glukosa',
    'Tekanan_Darah',
    'Ketebalan_kulit',
    'Insulin',
    'BMI',
    'Riwayat_Keluarga',
    'Usia',
]


def _build_feature_frame(payload):
    values = []
    for field in REQUIRED_FIELDS:
        if field not in payload:
            raise ValueError('Data input tidak lengkap')

        raw_value = payload[field]
        if raw_value is None or (isinstance(raw_value, str) and not raw_value.strip()):
            raise ValueError('Data input tidak lengkap')

        try:
            value = float(raw_value)
        except (TypeError, ValueError) as exc:
            raise ValueError('Input harus berupa angka') from exc

        if not np.isfinite(value) or value < 0:
            raise ValueError('Input tidak boleh negatif')

        values.append(value)

    frame = pd.DataFrame([values], columns=FEATURE_COLUMNS)
    return frame


def _build_nutrition_recommendation(query, risk_level=None):
    text = str(query or '').strip().lower()
    risk = str(risk_level or '').strip().lower()

    recommendation = {
        'summary': 'Pilih makanan kaya serat, rendah gula tambahan, dan hindari makanan olahan untuk menjaga kestabilan gula darah.',
        'recommended_foods': [
            {'name': 'Sayuran hijau', 'reason': 'Kaya serat dan membantu mengontrol kadar gula.'},
            {'name': 'Oatmeal', 'reason': 'Karbohidrat kompleks yang memberikan energi lebih stabil.'},
            {'name': 'Ikan', 'reason': 'Sumber protein tinggi dan lemak baik untuk jantung.'},
        ],
        'avoid_foods': [
            {'name': 'Minuman manis', 'reason': 'Cepat menaikkan kadar gula darah.'},
            {'name': 'Makanan olahan', 'reason': 'Sering mengandung gula tambahan dan sodium tinggi.'},
        ],
        'tips': [
            'Coba makan porsi lebih kecil namun lebih sering.',
            'Pastikan setiap makan ada sumber protein dan serat.',
        ],
    }

    if any(keyword in text for keyword in ['oatmeal', 'sereal', 'sarapan']):
        recommendation['summary'] = 'Oatmeal dan sereal tanpa gula tambahan cocok untuk sarapan yang lebih stabil.'
        recommendation['recommended_foods'] = [
            {'name': 'Oatmeal tanpa gula', 'reason': 'Memberi energi lebih lambat dan membantu rasa kenyang.'},
            {'name': 'Buah beri', 'reason': 'Menambah serat dan antioksidan tanpa gula berlebih.'},
        ]
    elif any(keyword in text for keyword in ['ikan', 'salmon', 'tuna']):
        recommendation['summary'] = 'Ikan adalah pilihan protein yang sangat baik untuk pola makan sehat.'
        recommendation['recommended_foods'] = [
            {'name': 'Ikan salmon', 'reason': 'Kaya omega-3 untuk kesehatan jantung.'},
            {'name': 'Ikan tuna', 'reason': 'Protein tinggi dan praktis untuk makanan sehari-hari.'},
        ]
    elif any(keyword in text for keyword in ['nasi', 'roti', 'mie', 'karbohidrat']):
        recommendation['summary'] = 'Pilih karbohidrat kompleks dan kurangi porsi yang terlalu besar.'
        recommendation['recommended_foods'] = [
            {'name': 'Nasi merah', 'reason': 'Memberikan energi lebih stabil dibanding nasi putih.'},
            {'name': 'Roti gandum', 'reason': 'Lebih kaya serat dan lebih kenyang.'},
        ]
    elif any(keyword in text for keyword in ['susu', 'yogurt', 'keju']):
        recommendation['summary'] = 'Pilih produk susu rendah gula untuk mengurangi beban gula.'
        recommendation['recommended_foods'] = [
            {'name': 'Yogurt rendah gula', 'reason': 'Cocok untuk camilan dengan protein yang baik.'},
            {'name': 'Susu rendah lemak', 'reason': 'Memberikan nutrisi tanpa kalori berlebih.'},
        ]

    if risk == 'warning':
        recommendation['tips'].insert(0, 'Prioritaskan asupan serat 25-30 gram per hari dan batasi gula tambahan.')
    else:
        recommendation['tips'].append('Jaga jadwal makan teratur dan minum cukup air putih.')

    return recommendation


@app.get('/health')
def health():
    return jsonify({'status': 'ok', 'model_loaded': model is not None, 'scaler_loaded': scaler is not None})


@app.post('/predict')
def predict():
    if model is None or scaler is None:
        return jsonify({'error': 'Model atau scaler tidak tersedia'}), 500

    try:
        payload = request.get_json(silent=True) or {}
        if not isinstance(payload, dict):
            return jsonify({'error': 'Data input tidak lengkap'}), 400

        feature_frame = _build_feature_frame(payload)
        scaled_features = scaler.transform(feature_frame)
        scaled_frame = pd.DataFrame(scaled_features, columns=FEATURE_COLUMNS)

        prediction = int(model.predict(scaled_frame)[0])
        probability = float(model.predict_proba(scaled_frame)[0][1] * 100)
        probability_value = round(probability, 2)
        status = 'warning' if prediction == 1 else 'safe'
        message = 'Berpotensi memiliki risiko diabetes' if prediction == 1 else 'Risiko diabetes rendah'

        return jsonify({
            'prediction': prediction,
            'Prediksi': prediction,
            'status': status,
            'Status': status,
            'message': message,
            'Message': message,
            'probability': probability_value,
            'risiko': probability_value,
            'detail': 'Hasil prediksi berhasil diterima.',
            'Detail': 'Hasil prediksi berhasil diterima.',
        })
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    except Exception as exc:
        return jsonify({'error': 'Terjadi kesalahan server'}), 500


@app.post('/nutrition-recommendations')
def nutrition_recommendations():
    try:
        payload = request.get_json(silent=True) or {}
        if not isinstance(payload, dict):
            payload = {}

        query = payload.get('query', '')
        risk_level = payload.get('risk_level') or payload.get('risk') or 'safe'
        recommendation = _build_nutrition_recommendation(query, risk_level)

        return jsonify({
            'query': str(query),
            'risk_level': str(risk_level),
            'summary': recommendation['summary'],
            'message': recommendation['summary'],
            'recommended_foods': recommendation['recommended_foods'],
            'recommendedFoods': recommendation['recommended_foods'],
            'avoid_foods': recommendation['avoid_foods'],
            'avoidFoods': recommendation['avoid_foods'],
            'tips': recommendation['tips'],
        })
    except Exception as exc:
        return jsonify({'error': 'Gagal membuat rekomendasi nutrisi'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
