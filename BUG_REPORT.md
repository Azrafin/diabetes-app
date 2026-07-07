# Bug Report - diabetes-app

## 1. Masalah utama
Aplikasi mengalami ketidakkonsistenan antara backend dan frontend saat membaca hasil prediksi. Backend mengembalikan field JSON yang berbeda dari yang diharapkan UI, sehingga hasil prediksi tidak ditampilkan secara konsisten.

## 2. Temuan bug
- Backend mengembalikan field `prediction`, `status`, `message`, `probability`, tetapi UI sebelumnya mengandalkan field yang berbeda atau tidak selalu tersedia.
- Frontend hook tidak melakukan normalisasi hasil respons sehingga prediksi bisa ditafsirkan salah oleh UI.
- Model dan scaler sudah kompatibel dengan fitur dataset Pima Indians Diabetes, sehingga akar masalah bukan pada preprocessing model itu sendiri.

## 3. Dampak
- Hasil prediksi dapat tampil tidak sesuai harapan atau salah diproses.
- UI tidak stabil saat mengolah respons backend.

## 4. Perbaikan yang diterapkan
- Menambahkan field respons backend yang kompatibel dengan frontend lama dan baru.
- Menormalisasi hasil respons di hook React sebelum ditampilkan ke komponen.
- Memastikan endpoint `/predict` tetap mengirim data yang jelas dan konsisten.
