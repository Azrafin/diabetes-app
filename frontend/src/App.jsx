import React from 'react';
import { HeartPulse } from 'lucide-react';
import DiabetesForm from './component/DiabetesForm';
import PredictionResult from './component/PredictionResult';
import NutritionSearch from './component/NutritionSearch';
import { usePrediction } from './hooks/usePrediction';

function App() {
  const { data, result, loading, errors, handleChange, submitPrediction } = usePrediction();

  return (
    <div className="min-h-screen pb-12 font-sans selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-4">
          <div className="bg-gradient-to-br from-primary to-emerald-600 p-2.5 rounded-xl shadow-lg shadow-primary/30 text-white">
            <HeartPulse size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Prediksi Risiko Diabetes</h1>
            <p className="text-sm font-medium text-slate-500">Analisis risiko diabetes berdasarkan data kesehatan Anda</p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Kiri - Form Prediksi */}
          <div className="lg:col-span-7 xl:col-span-8">
            <DiabetesForm 
              data={data} 
              errors={errors} 
              loading={loading} 
              onChange={handleChange} 
              onSubmit={submitPrediction} 
            />
          </div>
          
          {/* Kanan - Hasil & Informasi Edukasi */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
            <PredictionResult result={result} />
            <NutritionSearch />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;