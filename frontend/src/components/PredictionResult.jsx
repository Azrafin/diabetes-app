import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react'

function PredictionResult({ result, message }) {
  if (!result && !message) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-cyan-300" />
          <h2 className="text-xl font-black tracking-tight text-white">Hasil Prediksi</h2>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/70 p-4 text-sm font-medium text-slate-400">
          Belum ada hasil prediksi. Isi form untuk mendapatkan analisis risiko diabetes.
        </div>
      </div>
    )
  }

  if (message) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-300" />
          <h2 className="text-xl font-black tracking-tight text-white">Hasil Prediksi</h2>
        </div>
        <div className="rounded-2xl border border-amber-400/40 bg-amber-500/25 p-4 text-sm font-black text-amber-50">{message}</div>
      </div>
    )
  }

  const prediction = Number(result?.prediction ?? 0)
  const probability = Number(result?.probability ?? result?.risiko ?? 0)
  const isRisky = prediction === 1

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {isRisky ? <AlertTriangle size={18} className="text-amber-400" /> : <CheckCircle2 size={18} className="text-emerald-400" />}
        <h2 className="text-xl font-black tracking-tight text-white">Hasil Prediksi</h2>
      </div>

      <div className={`rounded-2xl border p-4 ${isRisky ? 'border-amber-400/40 bg-amber-500/25' : 'border-emerald-400/40 bg-emerald-500/25'}`}>
        <p className={`text-lg font-black ${isRisky ? 'text-amber-50' : 'text-emerald-50'}`}>
          {isRisky ? 'Berpotensi memiliki risiko diabetes' : 'Risiko diabetes rendah'}
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-100">{result?.message || 'Hasil prediksi berdasarkan model machine learning.'}</p>
        <div className="mt-4 rounded-xl bg-slate-900/70 p-3 shadow-sm">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
            <span>Probabilitas</span>
            <span className="text-base font-black text-white">{probability.toFixed(2)}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full rounded-full bg-slate-700">
            <div className={`h-2.5 rounded-full ${isRisky ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${Math.min(probability, 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionResult
