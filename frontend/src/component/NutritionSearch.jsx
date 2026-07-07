import React, { useState } from 'react';
import { Search, Leaf, Wheat, Fish, Nut } from 'lucide-react';

export default function NutritionSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const recommendations = [
    { name: "Sayuran Hijau", desc: "Bayam, brokoli (kaya serat)", icon: <Leaf size={20} className="text-success"/> },
    { name: "Oatmeal", desc: "Karbohidrat kompleks yang baik", icon: <Wheat size={20} className="text-warning"/> },
    { name: "Ikan Omega-3", desc: "Salmon, sarden, tuna", icon: <Fish size={20} className="text-blue-500"/> },
    { name: "Kacang-kacangan", desc: "Almond, kenari, kacang merah", icon: <Nut size={20} className="text-amber-700"/> }
  ];

  const filteredRecommendations = recommendations.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-6">
      <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
        Rekomendasi Nutrisi
      </h3>
      
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search size={18}/>
        </div>
        <input
          type="text"
          placeholder="Cari makanan sehat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-slate-100 hover:border-primary hover:shadow-sm transition-all cursor-pointer">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-50">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-slate-700 text-sm">{item.name}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-slate-400">
            <p className="text-sm">Tidak ada makanan yang cocok dengan pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  );
}