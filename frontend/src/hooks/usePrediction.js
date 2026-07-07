import { useState } from 'react';
import { predictDiabetes } from '../services/api';
import { validateDiabetesForm } from '../utils/validators';

export const usePrediction = () => {
  const [data, setData] = useState({
    Kehamilan: '', Glukosa: '', Tekanan_Darah: '', Ketebalan_kulit: '',
    Insulin: '', BMI: '', Riwayat_Keluarga: '', Usia: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const submitPrediction = async (e) => {
    e.preventDefault();
    const validationErrors = validateDiabetesForm(data);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      // Pastikan data dikirim sebagai number
      const payload = Object.keys(data).reduce((acc, key) => {
        acc[key] = Number(data[key]);
        return acc;
      }, {});

      const res = await predictDiabetes(payload);
      setResult(res);
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  return { data, result, loading, errors, handleChange, submitPrediction };
};