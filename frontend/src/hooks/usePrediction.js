import { useState } from 'react'
import { predictDiabetes } from '../services/api'
import { toPredictionPayload, validateDiabetesForm } from '../utils/validators'

const INITIAL_FORM = {
  Kehamilan: '',
  Glukosa: '',
  Tekanan_Darah: '',
  Ketebalan_kulit: '',
  Insulin: '',
  BMI: '',
  Riwayat_Keluarga: '',
  Usia: '',
}

export function usePrediction() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const submitPrediction = async (event) => {
    event.preventDefault()
    const validationErrors = validateDiabetesForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setResult(null)
      setMessage('Harap perbaiki data yang belum valid.')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const payload = toPredictionPayload(formData)
      const data = await predictDiabetes(payload)
      const probability = Number(data?.probability ?? data?.risiko ?? 0)
      const prediction = Number(data?.prediction ?? data?.Prediksi ?? 0)
      const normalizedResult = {
        prediction,
        probability,
        status: data?.status ?? data?.Status ?? (prediction === 1 ? 'warning' : 'safe'),
        message:
          data?.message ??
          data?.Message ??
          (prediction === 1
            ? 'Berpotensi memiliki risiko diabetes. Segera konsultasikan dengan tenaga kesehatan.'
            : 'Risiko diabetes rendah. Tetap menjaga pola makan dan aktivitas fisik.'),
      }
      setResult(normalizedResult)
    }  catch (error) {
  setResult(null)
  // Memastikan yang dimasukkan ke setMessage ADALAH STRING, bukan object bawaan Axios/Vercel
  const errorMsg = error.response?.data?.error || error.message || 'Prediksi gagal. Periksa koneksi backend Anda.'
  setMessage(String(errorMsg))
} finally {
  setIsLoading(false)
}
  }

  return {
    formData,
    errors,
    isLoading,
    result,
    message,
    handleChange,
    submitPrediction,
  }
}
