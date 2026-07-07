export const FEATURE_KEYS = [
  'Kehamilan',
  'Glukosa',
  'Tekanan_Darah',
  'Ketebalan_kulit',
  'Insulin',
  'BMI',
  'Riwayat_Keluarga',
  'Usia',
]

export const FIELD_LABELS = {
  Kehamilan: 'Kehamilan',
  Glukosa: 'Glukosa',
  Tekanan_Darah: 'Tekanan Darah',
  Ketebalan_kulit: 'Ketebalan Kulit',
  Insulin: 'Insulin',
  BMI: 'BMI',
  Riwayat_Keluarga: 'Riwayat Keluarga',
  Usia: 'Usia',
}

export const validateDiabetesForm = (formData) => {
  const errors = {}

  FEATURE_KEYS.forEach((key) => {
    const value = formData[key]

    if (value === null || value === undefined || String(value).trim() === '') {
      errors[key] = 'Field ini harus diisi'
      return
    }

    const number = Number(value)

    if (!Number.isFinite(number)) {
      errors[key] = 'Harus berupa angka'
    } else if (number < 0) {
      errors[key] = 'Tidak boleh negatif'
    }
  })

  return errors
}

export const toPredictionPayload = (formData) => {
  const payload = {}

  FEATURE_KEYS.forEach((key) => {
    payload[key] = Number(formData[key])
  })

  return payload
}
