import axios from 'axios'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000',
//   timeout: 5000,
// })
const api = axios.create({
  // Menghapus 'http://127.0.0.1:5000' dan menggantinya dengan string kosong ''
  // agar Axios menembak ke domain Vercel itu sendiri secara relatif
  baseURL: import.meta.env.VITE_API_BASE_URL || '', 
  timeout: 5000,
})

const buildLocalNutritionRecommendations = (query, riskLevel = 'safe') => {
  const text = String(query || '').trim().toLowerCase()
  const isRisky = String(riskLevel || '').toLowerCase() === 'warning'
  const baseSummary = 'Pilih makanan kaya serat, rendah gula tambahan, dan hindari makanan olahan untuk menjaga kestabilan gula darah.'

  let summary = baseSummary
  let recommendedFoods = [
    { name: 'Sayuran hijau', reason: 'Kaya serat dan membantu mengontrol kadar gula.' },
    { name: 'Oatmeal', reason: 'Karbohidrat kompleks yang memberi energi lebih stabil.' },
    { name: 'Ikan', reason: 'Sumber protein tinggi dan lemak baik untuk jantung.' },
  ]
  let avoidFoods = [
    { name: 'Minuman manis', reason: 'Cepat menaikkan kadar gula darah.' },
    { name: 'Makanan olahan', reason: 'Sering mengandung gula tambahan dan sodium tinggi.' },
  ]
  let tips = ['Pilih porsi lebih kecil namun lebih sering.', 'Pastikan setiap makan ada sumber protein dan serat.']

  if (text.includes('oatmeal') || text.includes('sereal') || text.includes('sarapan')) {
    summary = 'Oatmeal dan sereal tanpa gula tambahan cocok untuk sarapan yang lebih stabil.'
    recommendedFoods = [
      { name: 'Oatmeal tanpa gula', reason: 'Memberi energi lebih lambat dan membantu rasa kenyang.' },
      { name: 'Buah beri', reason: 'Menambah serat dan antioksidan tanpa gula berlebih.' },
    ]
  } else if (text.includes('ikan') || text.includes('salmon') || text.includes('tuna')) {
    summary = 'Ikan adalah pilihan protein yang sangat baik untuk pola makan sehat.'
    recommendedFoods = [
      { name: 'Ikan salmon', reason: 'Kaya omega-3 untuk kesehatan jantung.' },
      { name: 'Ikan tuna', reason: 'Protein tinggi dan praktis untuk makanan sehari-hari.' },
    ]
  } else if (text.includes('nasi') || text.includes('roti') || text.includes('mie') || text.includes('karbohidrat')) {
    summary = 'Pilih karbohidrat kompleks dan kurangi porsi yang terlalu besar.'
    recommendedFoods = [
      { name: 'Nasi merah', reason: 'Memberikan energi lebih stabil dibanding nasi putih.' },
      { name: 'Roti gandum', reason: 'Lebih kaya serat dan lebih kenyang.' },
    ]
  } else if (text.includes('susu') || text.includes('yogurt') || text.includes('keju')) {
    summary = 'Pilih produk susu rendah gula untuk mengurangi beban gula.'
    recommendedFoods = [
      { name: 'Yogurt rendah gula', reason: 'Cocok untuk camilan dengan protein yang baik.' },
      { name: 'Susu rendah lemak', reason: 'Memberikan nutrisi tanpa kalori berlebih.' },
    ]
  }

  if (isRisky) {
    tips = [
      'Prioritaskan asupan serat 25-30 gram per hari dan batasi gula tambahan.',
      ...tips,
    ]
  } else {
    tips = [...tips, 'Jaga jadwal makan teratur dan minum cukup air putih.']
  }

  return {
    summary,
    message: summary,
    recommended_foods: recommendedFoods,
    recommendedFoods,
    avoid_foods: avoidFoods,
    avoidFoods,
    tips,
  }
}

const fetchExternalNutrition = async (query) => {
  const response = await fetch(`https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(query)}&search_simple=1&json=1`)
  if (!response.ok) {
    throw new Error('External nutrition API unavailable')
  }

  const data = await response.json()
  const product = data.products?.[0]

  return {
    summary: `${product?.product_name || query} bisa menjadi pilihan yang baik bila dipilih dalam bentuk yang rendah gula dan kaya serat.`,
    message: `${product?.product_name || query} bisa menjadi pilihan yang baik bila dipilih dalam bentuk yang rendah gula dan kaya serat.`,
    recommended_foods: [
      { name: product?.product_name || query, reason: 'Dipilih karena lebih sesuai dengan kata kunci pencarian.' },
      { name: 'Sayuran hijau', reason: 'Membantu menjaga kadar gula tetap stabil.' },
    ],
    recommendedFoods: [
      { name: product?.product_name || query, reason: 'Dipilih karena lebih sesuai dengan kata kunci pencarian.' },
      { name: 'Sayuran hijau', reason: 'Membantu menjaga kadar gula tetap stabil.' },
    ],
    avoid_foods: [
      { name: 'Minuman manis', reason: 'Cepat menaikkan kadar gula darah.' },
      { name: 'Makanan olahan', reason: 'Sering mengandung gula tambahan dan sodium tinggi.' },
    ],
    avoidFoods: [
      { name: 'Minuman manis', reason: 'Cepat menaikkan kadar gula darah.' },
      { name: 'Makanan olahan', reason: 'Sering mengandung gula tambahan dan sodium tinggi.' },
    ],
    tips: ['Pantau ukuran porsi.', 'Kombinasikan dengan protein dan serat.'],
  }
}

export const predictDiabetes = async (payload) => {
  const response = await api.post('/predict', payload)
  return response.data
}

export const getNutritionRecommendations = async (query, riskLevel = 'safe') => {
  try {
    const response = await api.post('/nutrition-recommendations', {
      query,
      risk_level: riskLevel,
    })
    return response.data
  } catch (backendError) {
    try {
      return await fetchExternalNutrition(query)
    } catch (externalError) {
      return buildLocalNutritionRecommendations(query, riskLevel)
    }
  }
}
