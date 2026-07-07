import { Leaf, Search, Sparkles, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'
import { getNutritionRecommendations } from '../services/api'

const defaultRecommendations = {
  summary: 'Pilih makanan kaya serat, rendah gula tambahan, dan hindari makanan olahan untuk menjaga kestabilan gula darah.',
  recommendedFoods: [
    { name: 'Sayuran hijau', reason: 'Kaya serat dan membantu mengontrol kadar gula.' },
    { name: 'Oatmeal', reason: 'Karbohidrat kompleks yang memberi energi lebih stabil.' },
    { name: 'Ikan', reason: 'Sumber protein tinggi dan lemak baik untuk jantung.' },
  ],
  avoidFoods: [
    { name: 'Minuman manis', reason: 'Cepat menaikkan kadar gula darah.' },
    { name: 'Makanan olahan', reason: 'Sering mengandung gula tambahan dan sodium tinggi.' },
  ],
  tips: ['Pilih porsi lebih kecil namun lebih sering.', 'Pastikan setiap makan ada sumber protein dan serat.'],
}

function NutritionSearch({ riskLevel = 'safe' }) {
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [recommendations, setRecommendations] = useState(defaultRecommendations)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (event) => {
    event.preventDefault()
    const input = query.trim()

    if (!input) {
      setRecommendations(defaultRecommendations)
      setMessage('Ketik nama makanan untuk melihat rekomendasi yang sesuai.')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const data = await getNutritionRecommendations(input, riskLevel)
      setRecommendations({
        summary: data?.summary || data?.message || defaultRecommendations.summary,
        recommendedFoods: data?.recommended_foods || data?.recommendedFoods || defaultRecommendations.recommendedFoods,
        avoidFoods: data?.avoid_foods || data?.avoidFoods || defaultRecommendations.avoidFoods,
        tips: data?.tips || defaultRecommendations.tips,
      })
      setMessage(data?.message || 'Rekomendasi nutrisi siap digunakan.')
    } catch (error) {
      setRecommendations(defaultRecommendations)
      setMessage('Gagal mengambil rekomendasi. Tetap pilih makanan rendah gula dan tinggi serat.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="rounded-[30px] border border-slate-700/70 bg-slate-900/80 p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-cyan-500/15 p-2 text-cyan-300">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Rekomendasi Nutrisi</h2>
          <p className="mt-1 text-sm text-slate-400">Dapatkan saran makanan yang lebih praktis dan sesuai dengan kebutuhan Anda.</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/80 px-3 py-2">
          <Search size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Contoh: oatmeal, ikan, yogurt"
            className="w-full bg-transparent text-sm text-white outline-none"
          />
        </div>
        <button type="submit" disabled={isLoading} className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
          {isLoading ? 'Memuat...' : 'Cari'}
        </button>
      </form>

      {message ? <p className="mt-3 text-sm font-medium text-slate-300">{message}</p> : null}

      <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
        <div className="flex items-center gap-2 text-cyan-300">
          <Leaf size={16} />
          <h3 className="font-semibold text-white">Ringkasan</h3>
        </div>
        <p className="mt-2 text-sm text-slate-200">{recommendations.summary}</p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
          <div className="flex items-center gap-2 text-emerald-300">
            <UtensilsCrossed size={16} />
            <h3 className="font-semibold text-white">Disarankan</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {recommendations.recommendedFoods.map((food) => (
              <li key={food.name} className="rounded-xl bg-slate-900/70 px-3 py-2">
                <span className="font-semibold text-white">{food.name}</span>
                <span className="mt-1 block text-slate-400">{food.reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
          <div className="flex items-center gap-2 text-amber-300">
            <Sparkles size={16} />
            <h3 className="font-semibold text-white">Hindari</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {recommendations.avoidFoods.map((food) => (
              <li key={food.name} className="rounded-xl bg-slate-900/70 px-3 py-2">
                <span className="font-semibold text-white">{food.name}</span>
                <span className="mt-1 block text-slate-400">{food.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
        <h3 className="font-semibold text-white">Tips harian</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {recommendations.tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default NutritionSearch
