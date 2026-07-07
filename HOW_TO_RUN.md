# HOW TO RUN

## 1. Nama Project

Diabetes App adalah aplikasi web full-stack untuk memprediksi risiko diabetes menggunakan model machine learning yang diintegrasikan dengan frontend React dan backend Flask.

## 2. Tujuan Project

Project ini memungkinkan pengguna:

- mengisi data kesehatan melalui form web,
- mengirim data ke backend Flask,
- mendapatkan prediksi risiko diabetes berdasarkan model ML,
- melihat rekomendasi nutrisi yang lebih sehat.

## 3. Tech Stack

- Frontend: React 18, Vite, Tailwind CSS, Axios, Lucide React
- Backend: Python, Flask, Flask-CORS
- Machine Learning: scikit-learn, joblib, pandas, numpy
- Model assets: diabetes_model.pkl, scaler.pkl

## 4. Struktur Folder Utama

```text
diabetes-app/
├── backend/
│   ├── app.py
│   ├── diabetes_model.pkl
│   ├── scaler.pkl
│   └── requirements.txt
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── utils/
└── README.md
```

### Penjelasan singkat

- backend/: berisi API Flask dan file model ML
- frontend/: berisi aplikasi React/Vite
- src/components/: komponen UI form, hasil prediksi, dan nutrisi
- src/hooks/: logic state untuk prediksi
- src/services/: koneksi ke API backend

## 5. Prasyarat

Pastikan perangkat Anda sudah memiliki:

- Python 3.10+ atau 3.11+
- Node.js 18+ dan npm
- Git

### Catatan

- Saat ini repository tidak memiliki Dockerfile, docker-compose.yml, database, atau file .env.example.
- Tidak ada test suite otomatis yang terkonfigurasi saat ini.

## 6. Clone Repository

```bash
git clone <URL-repository>
cd diabetes-app
```

## 7. Install Dependency

### Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### Frontend

```bash
cd ../frontend
npm install
```

## 8. Menjalankan Backend

Masuk ke folder backend dan jalankan:

```bash
cd backend
python app.py
```

Server akan berjalan di:

- http://127.0.0.1:5000

### Endpoint utama

- GET /health
- POST /predict
- POST /nutrition-recommendations

## 9. Menjalankan Frontend

Buka terminal baru lalu jalankan:

```bash
cd frontend
npm run dev
```

Frontend biasanya tersedia di:

- http://localhost:5173

## 10. Environment Variable

Saat ini project tidak memerlukan file .env untuk menjalankan fitur inti.

Namun jika Anda ingin mengganti base URL backend dari frontend, buat file frontend/.env lalu tambahkan:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

### Variabel yang tersedia

| Variabel | Kebutuhan | Keterangan |
|---|---|---|
| VITE_API_BASE_URL | Opsional | Base URL backend untuk frontend |
| PORT | Opsional | Port backend Flask, default 5000 |

## 11. Menjalankan dengan Docker

Saat ini tidak tersedia Dockerfile atau docker-compose.yml di repository, sehingga Docker belum dapat digunakan untuk project ini.

## 12. Build untuk Production

### Frontend

```bash
cd frontend
npm run build
```

Hasil build akan dihasilkan di folder frontend/dist.

### Backend

Backend tidak memiliki build step khusus. Jalankan langsung dengan:

```bash
cd backend
python app.py
```

## 13. Testing

Project ini belum memiliki script testing otomatis seperti pytest atau Vitest.

### Verifikasi manual backend

Gunakan payload berikut untuk menguji endpoint /predict:

```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Kehamilan": 2,
    "Glukosa": 148,
    "Tekanan_Darah": 72,
    "Ketebalan_kulit": 35,
    "Insulin": 0,
    "BMI": 33.6,
    "Riwayat_Keluarga": 0.627,
    "Usia": 50
  }'
```

### Verifikasi manual frontend

- buka http://localhost:5173
- isi form prediksi
- klik tombol prediksi
- hasil prediksi akan tampil di panel hasil

## 14. Alur Kerja Aplikasi

1. User mengisi form prediksi di frontend React.
2. Frontend mengirim data ke endpoint Flask /predict.
3. Backend memetakan field input ke kolom fitur model ML.
4. Data di-scaling sesuai model yang digunakan.
5. Model menghasilkan prediksi dan probabilitas.
6. Hasil dikembalikan ke frontend dan ditampilkan di UI.
7. User juga bisa melihat rekomendasi nutrisi melalui endpoint /nutrition-recommendations.

## 15. Contoh Hasil yang Diharapkan

### Backend health

```json
{
  "status": "ok",
  "model_loaded": true,
  "scaler_loaded": true
}
```

### Endpoint prediksi

```json
{
  "prediction": 1,
  "probability": 54.55,
  "status": "warning",
  "message": "Berpotensi memiliki risiko diabetes"
}
```

### Frontend

- halaman utama menampilkan form prediksi,
- hasil prediksi muncul setelah submit,
- panel nutrisi menampilkan rekomendasi makanan sehat.

## 16. Error yang Sering Terjadi

### A. Port sudah digunakan

Jika port 5000 atau 5173 sudah dipakai, ubah port:

- backend: set environment variable PORT
- frontend: ubah port di vite.config.js

### B. Module tidak ditemukan

Pastikan virtual environment backend sudah aktif dan dependency sudah terinstall:

```bash
pip install -r requirements.txt
```

### C. Model atau scaler gagal dimuat

Pastikan file berikut ada di folder backend:

- diabetes_model.pkl
- scaler.pkl

### D. Frontend tidak bisa terhubung ke backend

Pastikan backend sedang berjalan di http://127.0.0.1:5000.
Jika perlu, set VITE_API_BASE_URL di frontend/.env.

### E. CORS error

Backend sudah dikonfigurasi untuk mengizinkan request dari frontend. Jika masih terjadi, pastikan frontend berjalan di localhost:5173 dan backend di 127.0.0.1:5000.

## 17. Ringkasan Singkat

Project ini adalah aplikasi prediksi diabetes berbasis ML yang memadukan frontend React dan backend Flask. Untuk menjalankannya, cukup install dependency Python dan Node.js, jalankan backend, jalankan frontend, lalu isi form prediksi.
