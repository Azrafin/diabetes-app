import { Activity, HeartPulse, ShieldCheck } from 'lucide-react'
import DiabetesForm from './components/DiabetesForm'
import NutritionSearch from './components/NutritionSearch'
import PredictionResult from './components/PredictionResult'
import { usePrediction } from './hooks/usePrediction'

function App() {
  const { formData, errors, isLoading, result, message, handleChange, submitPrediction } = usePrediction()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_25%),linear-gradient(135deg,_#07111f_0%,_#0f172a_55%,_#111827_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-[30px] border border-slate-700/70 bg-slate-900/80 p-6 shadow-[0_20px_70px_-25px_rgba(34,211,238,0.45)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
                <HeartPulse size={28} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Health Intelligence</p>
                <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Prediksi Risiko Diabetes</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Dashboard medis modern untuk memantau risiko diabetes dengan data kesehatan Anda.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck size={18} />
                <span>Data aman & terverifikasi</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[30px] border border-slate-700/70 bg-slate-900/80 p-5 shadow-sm sm:p-6">
            <DiabetesForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onSubmit={submitPrediction}
              isLoading={isLoading}
            />
          </section>

          <section className="space-y-6">
            <div className="rounded-[30px] border border-slate-700/70 bg-slate-900/80 p-5 shadow-sm sm:p-6">
              <PredictionResult result={result} message={message} />
            </div>
            <div className="rounded-[30px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-5 text-slate-100 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <Activity size={22} className="text-cyan-300" />
                <h2 className="text-lg font-semibold">Tips kesehatan harian</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                <li>• Jaga pola makan tinggi serat dan rendah gula.</li>
                <li>• Lakukan aktivitas fisik 20–30 menit setiap hari.</li>
                <li>• Pantau gula darah dan tekanan darah secara rutin.</li>
              </ul>
            </div>
          </section>
        </div>

        <NutritionSearch riskLevel={result?.status || 'safe'} />
      </div>
    </div>
  )
}

export default App
