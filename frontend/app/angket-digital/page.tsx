'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Smartphone, CheckCircle, AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react';

export default function AngketDigital() {
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState<{ skor: number; kategori: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setHasil(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    try {
      const res = await api.kirimAngketDigital(data);
      setHasil(res.hasil);
      // Scroll ke hasil
      setTimeout(() => {
        document.getElementById('hasil-deteksi')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-jabar-green mb-4">Angket Deteksi Dini</h1>
        <div className="w-24 h-1 bg-jabar-gold mx-auto mb-4"></div>
        <p className="text-gray-600">
          Kuesioner anonim untuk mendeteksi risiko perundungan pada diri sendiri atau teman.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-xl border-t-4 border-jabar-green space-y-6">
        
        <div>
          <label className="flex items-center gap-2 font-bold mb-2 text-jabar-dark text-sm">
            <Smartphone className="w-4 h-4 text-jabar-green" /> Inisial Nama (Boleh dikosongkan)
          </label>
          <input name="inisial" className="w-full border border-gray-300 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-jabar-green" placeholder="Contoh: A.R." />
        </div>

        {[
          { name: 'd1', q: 'Pernahkah kamu merasa di-bully (diejek, dipukul, atau dikucilkan)?' },
          { name: 'd2', q: 'Pernahkah kamu menyaksikan temanmu di-bully?' },
          { name: 'd3', q: 'Pernahkah kamu menerima pesan ancaman/ejekan lewat media sosial?' },
          { name: 'd4', q: 'Apakah kamu tahu ke mana harus melapor jika terjadi bullying?' },
        ].map((item) => (
          <div key={item.name} className="bg-gray-50 p-4 rounded-sm border border-gray-200">
            <label className="block font-bold mb-3 text-jabar-dark text-sm">{item.q}</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                <input type="radio" name={item.name} value="ya" required className="w-4 h-4 accent-jabar-green" /> Ya
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                <input type="radio" name={item.name} value="tidak" required className="w-4 h-4 accent-jabar-green" /> Tidak
              </label>
            </div>
          </div>
        ))}

        <button disabled={loading} className="w-full bg-jabar-green hover:bg-emerald-800 text-white font-bold py-3 rounded-sm transition disabled:opacity-50 mt-4 shadow-md">
          {loading ? 'Menganalisis...' : 'Kirim & Lihat Hasil Deteksi'}
        </button>
      </form>

      {/* HASIL DETEKSI (Muncul setelah submit) */}
      {hasil && (
        <div id="hasil-deteksi" className="mt-10 animate-fade-in">
          <div className={`p-8 rounded-sm shadow-xl border-l-8 ${
            hasil.kategori === 'tinggi' ? 'bg-red-50 border-red-500' : 
            hasil.kategori === 'sedang' ? 'bg-orange-50 border-orange-500' : 
            'bg-green-50 border-green-500'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              {hasil.kategori === 'tinggi' && <AlertTriangle className="w-10 h-10 text-red-500" />}
              {hasil.kategori === 'sedang' && <HeartPulse className="w-10 h-10 text-orange-500" />}
              {hasil.kategori === 'rendah' && <ShieldCheck className="w-10 h-10 text-green-500" />}
              
              <div>
                <h3 className="font-serif text-2xl font-bold text-jabar-dark">
                  Hasil: Risiko {hasil.kategori.toUpperCase()} (Skor: {hasil.skor})
                </h3>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              {hasil.kategori === 'tinggi' && 'Kamu mungkin sedang mengalami perundungan. Jangan hadapi sendiri, segera laporkan ke guru BK atau orang tua. Kamu berharga dan berhak merasa aman.'}
              {hasil.kategori === 'sedang' && 'Ada indikasi perundungan di sekitarmu. Jangan diam saja, bantu temanmu atau laporkan jika kamu merasa tidak aman.'}
              {hasil.kategori === 'rendah' && 'Kondisimu relatif aman. Tetap waspada, jadilah teman yang baik, dan jangan ragu menolong teman yang membutuhkan.'}
            </p>

            <Link href="/laporan" className="inline-block bg-jabar-green text-white font-bold px-6 py-2.5 rounded-sm hover:bg-emerald-800 transition">
              Buat Laporan Sekarang
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}