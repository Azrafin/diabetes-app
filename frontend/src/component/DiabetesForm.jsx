import React from 'react';
import { Activity, Droplets, Heart, User, ActivitySquare, Scale, Syringe, Users } from 'lucide-react';

const inputFields = [
 { name: "Kehamilan", label: "Jumlah Kehamilan", type: "number", icon: <User size={18}/> },
 { name: "Glukosa", label: "Kadar Glukosa", type: "number", icon: <ActivitySquare size={18}/> },
 { name: "Tekanan_Darah", label: "Tekanan Darah", type: "number", icon: <Heart size={18}/> },
 { name: "Ketebalan_kulit", label: "Ketebalan Kulit", type: "number", icon: <Droplets size={18}/> },
 { name: "Insulin", label: "Kadar Insulin", type: "number", icon: <Syringe size={18}/> },
 { name: "BMI", label: "Indeks Massa Tubuh", type: "number", step: "0.1", icon: <Scale size={18}/> },
 { name: "Riwayat_Keluarga", label: "Riwayat Keluarga Diabetes", type: "number", step: "0.001", icon: <Users size={18}/> },
 { name: "Usia", label: "Usia", type: "number", icon: <Activity size={18}/> }
];

export default function DiabetesForm({ data, errors, loading, onChange, onSubmit }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 transition-all">
      <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">Data Kesehatan Pasien</h2>
      
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {inputFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">{field.label}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary">
                {field.icon}
              </div>
              <input
                name={field.name}
                type={field.type}
                step={field.step || "1"}
                value={data[field.name]}
                onChange={onChange}
                placeholder={`Masukkan ${field.label.toLowerCase()}`}
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 outline-none
                  ${errors[field.name] ? 'border-danger focus:ring-danger/50' : 'border-slate-200'}`}
              />
            </div>
            {errors[field.name] && (
              <span className="text-xs text-danger mt-1 font-medium">{errors[field.name]}</span>
            )}
          </div>
        ))}

        {errors.api && (
          <div className="col-span-1 md:col-span-2 p-4 mt-2 bg-red-50 border-l-4 border-danger text-danger rounded-r-lg text-sm">
            {errors.api}
          </div>
        )}

        <div className="col-span-1 md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 px-4 bg-primary text-white font-bold rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary/20"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses Data...
              </>
            ) : (
              'Prediksi Sekarang'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}