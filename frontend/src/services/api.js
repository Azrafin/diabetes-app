import axios from 'axios';

// API URL dapat di-override dengan env variable, default ke proxy Vite
const API_URL = import.meta.env.VITE_API_URL || '/api/predict';

export const predictDiabetes = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Terjadi kesalahan server");
    }
    throw new Error("Gagal terhubung ke server");
  }
};