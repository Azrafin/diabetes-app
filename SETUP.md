# 📋 Panduan Setup & Installation

## Prerequisites

Pastikan sudah install:
- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **Python** (v3.8+) - [Download](https://www.python.org/)
- **pip** - Package manager Python (biasanya sudah include)

## 🚀 Quick Start

### 1. Backend Setup (Flask)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Pastikan file model ada
# File yang dibutuhkan: diabetes_model.pkl, scaler.pkl
# Letakkan di folder backend/

# Run server
python app.py
```

**Expected Output:**
```
✓ Model loaded successfully from ...
✓ Scaler loaded successfully from ...
 * Running on http://127.0.0.1:5000
```

### 2. Frontend Setup (React + Vite)

Di terminal baru:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
  ➜  Press h + enter to show help
```

## 🔗 Testing Integration

1. Buka browser ke `http://localhost:5173`
2. Isi form dengan data kesehatan
3. Klik "Prediksi Sekarang"
4. Seharusnya hasil prediksi muncul

### Jika terjadi error:

**Error: "Model belum dimuat. Server belum siap."**
- Pastikan file `diabetes_model.pkl` dan `scaler.pkl` ada di folder `backend/`
- Restart Flask server

**Error: CORS atau "Gagal terhubung ke server"**
- Pastikan Flask berjalan di `http://localhost:5000`
- Pastikan frontend berjalan di `http://localhost:5173`
- Check di browser DevTools > Network tab

## 📦 Build untuk Production

### Frontend Build

```bash
cd frontend
npm run build
```

Output akan di folder `frontend/dist/`

### Environment Variables (Production)

Buat file `.env` di folder frontend:
```
VITE_API_URL=https://your-api-domain.com/predict
```

## 🏗️ Struktur Project

```
diabetes-app/
├── frontend/                 # React + Vite App
│   ├── src/
│   │   ├── component/        # React Components
│   │   ├── hooks/            # Custom Hooks
│   │   ├── services/         # API Service
│   │   ├── utils/            # Validators
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js        # Vite Configuration
│   ├── postcss.config.js     # PostCSS/Tailwind Config
│   ├── tailwind.config.js    # Tailwind CSS Config
│   └── package.json
│
└── backend/                  # Flask API
    ├── app.py               # Main Flask Application
    ├── requirements.txt     # Python Dependencies
    ├── diabetes_model.pkl   # ML Model (binary)
    └── scaler.pkl          # Feature Scaler (binary)
```

## 🔑 API Endpoints

### POST /predict
Request body:
```json
{
  "Kehamilan": 6,
  "Glukosa": 148,
  "Tekanan_Darah": 72,
  "Ketebalan_kulit": 35,
  "Insulin": 0,
  "BMI": 33.6,
  "Riwayat_Keluarga": 0.627,
  "Usia": 50
}
```

Response:
```json
{
  "prediction": 1,
  "status": "warning",
  "message": "Berpotensi memiliki risiko diabetes",
  "probability": 0.7856
}
```

## 📝 Development Tips

### Hot Reload
- Frontend: Otomatis reload saat ada perubahan file
- Backend: Restart manual dengan `Ctrl+C` dan `python app.py`

### Debugging
- Frontend: Buka DevTools (F12) > Console & Network
- Backend: Lihat output terminal

### Troubleshooting

**Issue: "Module not found" di frontend**
- Pastikan semua imports path benar
- Run `npm install` ulang

**Issue: Backend timeout**
- Pastikan model file tidak corrupt
- Check file size kedua .pkl file

## 📚 File Yang Baru Ditambah/Diperbaiki

- ✅ `frontend/vite.config.js` - Vite configuration dengan proxy
- ✅ `frontend/postcss.config.js` - PostCSS/Tailwind configuration
- ✅ `frontend/.env.example` - Environment variable template
- ✅ `backend/.env.example` - Backend env template
- ✅ `frontend/.gitignore` - Git ignore untuk frontend
- ✅ `backend/.gitignore` - Git ignore untuk backend

## 🐛 Fixes Applied

1. ✅ Fixed import path: `./components/` → `./component/`
2. ✅ Added PostCSS configuration untuk Tailwind
3. ✅ Added Vite proxy configuration
4. ✅ Fixed CORS policy (flexible untuk development)
5. ✅ Fixed API URL (environment variable)
6. ✅ Added model loading validation
7. ✅ Removed debug mode in production
8. ✅ Cleaned up commented legacy code
9. ✅ Fixed NutritionSearch color class
10. ✅ Implemented search functionality

## 📞 Support

Jika ada error, check:
1. Python version: `python --version`
2. Node version: `node --version`
3. Semua file `.pkl` ada di backend folder
4. Tidak ada process yang menggunakan port 5000 atau 5173
