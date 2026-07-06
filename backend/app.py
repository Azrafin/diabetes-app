import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

app= Flask(__name__)
#Menyalakan CORS untuk mengizinkan permintaan dari domain lain
CORS(app)

# Load the Trained Model and Scaler
try:
    model= joblib.load('diabetes_model.pkl')
    scaler= joblib.load('scaler.pkl')
except Exception as e: #jika terjadi kesalahan saat memuat model atau scaler, cetak pesan error
    print(f"Error Loading Model or Scaler: {e}")

@app.route('/predict', methods=["POST"]) # mendefinisikan endpoint/ predict dengan metode POST
def predict():
    try:
        data= request.get_json() #mengambil data dari request dalam format JSON

        # Extract fitur dari data JSON
        features = np.array([
                float(data.get('Kehamilan', 0)),
                float(data.get('Glukosa', 0)),
                float(data.get('Tekanan_Darah', 0)),
                float(data.get('Ketebalan_kulit', 0)),
                float(data.get('Insulin', 0)),
                float(data.get('BMI', 0)),
                float(data.get('Riwayat_Keluarga', 0)),
                float(data.get('Usia', 0))
                ])

        # Input validation: bukan negatif dan bukan NaN
        if any(f<0 for f in features) or np.isnan(features).any():
            return jsonify({'error': 'Input Value tidak valid'}), 400
        
        # Reshape fitur menjadi 2D Array untuk prediksi
        input_data= scaler.transform(features.reshape(1,-1)) #mengubah bentuk array menjadi 2D
        prediction= model.predict(input_data)[0] 
        probability= model.predict_proba(input_data)[0][1]*100  #mengambil probabilitas kelas positif

        # Format response JSON
        return jsonify({
            'Prediksi': int(prediction),
            'Status': 'Diabetes' if prediction==1 else 'Tidak Diabetes',
            'risiko': round(probability,2)
        })
    
    except ValueError as ve:
        return jsonify({'error': 'Tipe data tidak valid. Pastikan semua input adalah angka.'}), 400
    except Exception as e:
        # print(e)
        # exit()
        return jsonify({'error': f'Terjadi kesalahan: {str(e)}'}), 500
    
if __name__== '__main__':
    #jalankan aplikasi flask pada host
    port= int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)