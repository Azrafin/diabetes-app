import { Activity, AlertCircle, Sparkles } from 'lucide-react'

const inputFields = [
  { name: 'Kehamilan', label: 'Jumlah Kehamilan', type: 'number' },
  { name: 'Glukosa', label: 'Kadar Glukosa', type: 'number' },
  { name: 'Tekanan_Darah', label: 'Tekanan Darah', type: 'number' },
  { name: 'Ketebalan_kulit', label: 'Ketebalan Kulit', type: 'number' },
  { name: 'Insulin', label: 'Kadar Insulin', type: 'number' },
  { name: 'BMI', label: 'Indeks Massa Tubuh', type: 'number' },
  { name: 'Riwayat_Keluarga', label: 'Riwayat Keluarga Diabetes', type: 'number' },
  { name: 'Usia', label: 'Usia', type: 'number' },
]

function DiabetesForm({ formData, errors, onChange, onSubmit, isLoading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Form Prediksi Diabetes</h2>
          <p className="mt-1 text-sm text-slate-400">Isi data kesehatan Anda dengan angka yang valid untuk mendapatkan hasil prediksi.</p>
        </div>
        <div className="rounded-full bg-cyan-500/15 p-2 text-cyan-300">
          <Sparkles size={20} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {inputFields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
              <Activity size={16} className="text-cyan-300" />
              {field.label}
            </span>
            <input
              name={field.name}
              type={field.type}
              min="0"
              step="any"
              value={formData[field.name]}
              onChange={onChange}
              placeholder={`Masukkan ${field.label.toLowerCase()}`}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm text-white shadow-sm outline-none transition focus:border-cyan-400 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/20"
            />
            {errors[field.name] ? (
              <p className="mt-2 flex items-center gap-1 text-sm text-rose-400">
                <AlertCircle size={14} />
                {errors[field.name]}
              </p>
            ) : null}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Memproses prediksi...' : 'Prediksi Sekarang'}
      </button>
    </form>
  )
}

export default DiabetesForm
