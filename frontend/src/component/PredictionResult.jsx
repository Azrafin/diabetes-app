import React from 'react';
import { AlertTriangle, CheckCircle, Percent, Activity } from 'lucide-react';

export default function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center text-slate-400 flex flex-col items-center justify-center min-h-[250px]">
        <Activity className="mb-4 opacity-40 text-slate-400" size={56} />
        <p className="text-sm font-medium text-slate-500">Hasil prediksi akan muncul di sini setelah Anda mengisi form.</p>
      </div>
    );
  }

  const isWarning = result.prediction === 1;
  const cardBg = isWarning ? 'bg-orange-50' : 'bg-emerald-50';
  const borderColor = isWarning ? 'border-warning/30' : 'border-success/30';
  const textColor = isWarning ? 'text-warning' : 'text-success';
  const Icon = isWarning ? AlertTriangle : CheckCircle;

  return (
    <div className={`rounded-2xl shadow-sm border p-6 sm:p-8 transition-all duration-500 ${cardBg} ${borderColor}`}>
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className={`p-4 rounded-full bg-white shadow-sm ${textColor}`}>
          <Icon size={40} />
        </div>
        
        <h2 className={`text-2xl font-black ${textColor}`}>
          {result.message}
        </h2>

        {result.probability !== undefined && (
          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100 mt-2">
            <Percent size={18} className="text-slate-400"/>
            <span className="font-semibold text-slate-700">
              Probabilitas: {(result.probability * 100).toFixed(1)}%
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200/60">
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          *Hasil ini merupakan prediksi berbasis Machine Learning dan bukan pengganti diagnosis medis resmi. Konsultasikan dengan dokter untuk evaluasi lebih lanjut.
        </p>
      </div>
    </div>
  );
}