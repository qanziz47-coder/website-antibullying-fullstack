'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { School, MapPin, Layers, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

// --- KAMUS BAHASA UNTUK ANGKET NASIONAL ---
const angketNasionalTranslations = {
  id: {
    title: "Angket Nasional Anti-Bullying",
    desc: "Survei terstandar untuk memetakan prevalensi perundungan di sekolah-sekolah Jawa Barat.",
    sekolahLabel: "Nama Sekolah",
    sekolahPlaceholder: "Contoh: SMAN 1 Bandung",
    kabkotaLabel: "Kabupaten/Kota",
    kabkotaPlaceholder: "-- Pilih Wilayah --",
    jenjangLabel: "Jenjang Pendidikan",
    jenjangPlaceholder: "-- Pilih Jenjang --",
    q1Label: "1. Dalam 1 bulan terakhir, pernahkah Anda melihat bullying di sekolah?",
    q1Options: { sering: "Sering", kadang: "Kadang", tidak: "Tidak Pernah" },
    q2Label: "2. Bentuk bullying apa yang paling sering terjadi?",
    q2Options: { verbal: "Verbal", fisik: "Fisik", siber: "Siber (Online)", sosial: "Sosial" },
    q3Label: "3. Apakah sekolah Anda memiliki Tim Pencegahan dan Penanganan Kekerasan (TPPK)?",
    q3Options: { ada: "Ada", tidak: "Tidak", tidakTahu: "Tidak Tahu" },
    btnSubmit: "Kirim Angket Nasional",
    btnLoading: "Mengirim Data...",
    successMsg: "Angket Nasional berhasil dikirim. Terima kasih atas partisipasi Anda!",
  },
  su: {
    title: "Angkét Nasional Anti-Bullying",
    desc: "Survei terstandar pikeun memetakan prévalénsi ririwit di sakola-sakola Jawa Barat.",
    sekolahLabel: "Ngaran Sakola",
    sekolahPlaceholder: "Conto: SMAN 1 Bandung",
    kabkotaLabel: "Kabupatén/Kota",
    kabkotaPlaceholder: "-- Pilih Wewengkon --",
    jenjangLabel: "Jenjang Atikan",
    jenjangPlaceholder: "-- Pilih Jenjang --",
    q1Label: "1. Dina 1 sasih kamari, pernah anjeun ningali ririwit di sakola?",
    q1Options: { sering: "Sering", kadang: "Kadang-kadang", tidak: "Henteu Pernah" },
    q2Label: "2. Wangun ririwit naon anu paling sering kajadian?",
    q2Options: { verbal: "Verbal", fisik: "Fisik", siber: "Siber (Online)", sosial: "Sosial" },
    q3Label: "3. Naha sakola anjeun gaduh Tim Pencegahan sareng Penanganan Kekerasan (TPPK)?",
    q3Options: { ada: "Aya", tidak: "Henteu", tidakTahu: "Henteu Terang" },
    btnSubmit: "Kirim Angkét Nasional",
    btnLoading: "Ngemalkeun Data...",
    successMsg: "Angkét Nasional hasil dikirim. Hatur nuhun kana partisipasi anjeun!",
  },
  en: {
    title: "National Anti-Bullying Survey",
    desc: "Standardized survey to map the prevalence of bullying in West Java schools.",
    sekolahLabel: "School Name",
    sekolahPlaceholder: "Example: SMAN 1 Bandung",
    kabkotaLabel: "Regency/City",
    kabkotaPlaceholder: "-- Select Region --",
    jenjangLabel: "Education Level",
    jenjangPlaceholder: "-- Select Level --",
    q1Label: "1. In the last 1 month, have you seen bullying at school?",
    q1Options: { sering: "Often", kadang: "Sometimes", tidak: "Never" },
    q2Label: "2. What form of bullying occurs most often?",
    q2Options: { verbal: "Verbal", fisik: "Physical", siber: "Cyber (Online)", sosial: "Social" },
    q3Label: "3. Does your school have a Violence Prevention and Handling Team (TPPK)?",
    q3Options: { ada: "Yes", tidak: "No", tidakTahu: "Don't Know" },
    btnSubmit: "Submit National Survey",
    btnLoading: "Sending Data...",
    successMsg: "National Survey submitted successfully. Thank you for your participation!",
  },
  ja: {
    title: "全国いじめ防止アンケート",
    desc: "西ジャワ州の学校におけるいじめの蔓延状況を把握するための標準化された調査。",
    sekolahLabel: "学校名",
    sekolahPlaceholder: "例: SMAN 1 バンドン",
    kabkotaLabel: "県/市",
    kabkotaPlaceholder: "-- 地域を選択 --",
    jenjangLabel: "教育レベル",
    jenjangPlaceholder: "-- レベルを選択 --",
    q1Label: "1. 過去1ヶ月以内に、学校でいじめを見たことがありますか？",
    q1Options: { sering: "よくある", kadang: "時々", tidak: "決してない" },
    q2Label: "2. 最も頻繁に発生するいじめの形態は何ですか？",
    q2Options: { verbal: "言葉による", fisik: "身体的", siber: "サイバー（オンライン）", sosial: "社会的" },
    q3Label: "3. あなたの学校には暴力防止・対応チーム（TPPK）がありますか？",
    q3Options: { ada: "はい", tidak: "いいえ", tidakTahu: "わからない" },
    btnSubmit: "全国調査を送信",
    btnLoading: "データを送信中...",
    successMsg: "全国調査が正常に送信されました。ご協力ありがとうございます！",
  },
  es: {
    title: "Encuesta Nacional Anti-Bullying",
    desc: "Encuesta estandarizada para mapear la prevalencia del acoso escolar en las escuelas de Java Occidental.",
    sekolahLabel: "Nombre de la Escuela",
    sekolahPlaceholder: "Ejemplo: SMAN 1 Bandung",
    kabkotaLabel: "Regencia/Ciudad",
    kabkotaPlaceholder: "-- Seleccionar Región --",
    jenjangLabel: "Nivel Educativo",
    jenjangPlaceholder: "-- Seleccionar Nivel --",
    q1Label: "1. En el último mes, ¿has visto acoso escolar?",
    q1Options: { sering: "A menudo", kadang: "A veces", tidak: "Nunca" },
    q2Label: "2. ¿Qué forma de acoso escolar ocurre con más frecuencia?",
    q2Options: { verbal: "Verbal", fisik: "Físico", siber: "Cibernético (En línea)", sosial: "Social" },
    q3Label: "3. ¿Tu escuela tiene un Equipo de Prevención y Manejo de Violencia (TPPK)?",
    q3Options: { ada: "Sí", tidak: "No", tidakTahu: "No lo sé" },
    btnSubmit: "Enviar Encuesta Nacional",
    btnLoading: "Enviando Datos...",
    successMsg: "Encuesta Nacional enviada con éxito. ¡Gracias por tu participación!",
  }
};

// Data pilihan wilayah (bisa disesuaikan jika perlu diterjemahkan)
const kabupatenKota = [
  "Kota Bandung", "Kota Bogor", "Kota Bekasi", "Kota Depok", 
  "Kab. Bandung", "Kab. Bogor", "Kab. Garut", "Kab. Cirebon", 
  "Lainnya (Jawa Barat)"
];

export default function AngketNasional() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const { language } = useLanguage(); 
  // Fallback ke bahasa Inggris jika bahasa tidak tersedia
  const t = angketNasionalTranslations[language as keyof typeof angketNasionalTranslations] || angketNasionalTranslations.en;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setMsg(null);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries()) as Record<string, string>;
    
    try {
      await api.kirimAngketNasional(data);
      setMsg({ type: 'success', text: t.successMsg });
      e.currentTarget.reset();
    } catch (err) {
      setMsg({ type: 'error', text: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-6 overflow-hidden">
      <div className="absolute bottom-0 -left-20 w-80 h-80 opacity-10 pointer-events-none z-0">
        <img src="/batik.png" alt="Ornamen Kiri" className="w-full h-full object-contain" />
      </div>
      
      <div className="absolute top-0 -right-20 w-80 h-80 opacity-10 pointer-events-none z-0">
        <img src="/batik.png" alt="Ornamen Kanan" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header Judul */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-16 h-16 mb-2">
            <img src="/ku.png" alt="Kujang" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-jabar-green mb-4">{t.title}</h1>
          <div className="w-24 h-1 bg-jabar-gold mx-auto mb-4"></div>
          <p className="text-gray-600">
            {t.desc}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-2xl relative border border-gray-100">
          
          <div className="absolute top-0 left-0 w-full h-2 batik-border rounded-t-sm"></div>
          
          <div className="space-y-6 mt-2">
            {/* Nama Sekolah */}
            <div>
              <label className="flex items-center gap-2 font-bold mb-2 text-jabar-dark text-sm">
                <School className="w-4 h-4 text-jabar-green" /> {t.sekolahLabel}
              </label>
              <input name="sekolah" required className="w-full border border-gray-300 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-jabar-green bg-gray-50 focus:bg-white transition" placeholder={t.sekolahPlaceholder} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kabupaten/Kota */}
              <div>
                <label className="flex items-center gap-2 font-bold mb-2 text-jabar-dark text-sm">
                  <MapPin className="w-4 h-4 text-jabar-green" /> {t.kabkotaLabel}
                </label>
                <select name="kabkota" required className="w-full border border-gray-300 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-jabar-green bg-gray-50 focus:bg-white transition">
                  <option value="">{t.kabkotaPlaceholder}</option>
                  {kabupatenKota.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              {/* Jenjang */}
              <div>
                <label className="flex items-center gap-2 font-bold mb-2 text-jabar-dark text-sm">
                  <Layers className="w-4 h-4 text-jabar-green" /> {t.jenjangLabel}
                </label>
                <select name="jenjang" required className="w-full border border-gray-300 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-jabar-green bg-gray-50 focus:bg-white transition">
                  <option value="">{t.jenjangPlaceholder}</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA/SMK">SMA/SMK</option>
                </select>
              </div>
            </div>

            {/* Pertanyaan 1 */}
            <div className="bg-[#fcfbf7] p-5 rounded-sm border border-gray-200 border-l-4 border-l-jabar-gold">
              <label className="block font-bold mb-3 text-jabar-dark text-sm">
                {t.q1Label}
              </label>
              <div className="flex flex-wrap gap-6">
                {Object.entries(t.q1Options).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input type="radio" name="q1" value={val} required className="w-4 h-4 accent-jabar-green" /> {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Pertanyaan 2 */}
            <div className="bg-[#fcfbf7] p-5 rounded-sm border border-gray-200 border-l-4 border-l-jabar-gold">
              <label className="block font-bold mb-3 text-jabar-dark text-sm">
                {t.q2Label}
              </label>
              <div className="flex flex-wrap gap-6">
                {Object.entries(t.q2Options).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input type="radio" name="q2" value={val} required className="w-4 h-4 accent-jabar-green" /> {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Pertanyaan 3 */}
            <div className="bg-[#fcfbf7] p-5 rounded-sm border border-gray-200 border-l-4 border-l-jabar-gold">
              <label className="block font-bold mb-3 text-jabar-dark text-sm">
                {t.q3Label}
              </label>
              <div className="flex flex-wrap gap-6">
                {Object.entries(t.q3Options).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input type="radio" name="q3" value={val === 'tidakTahu' ? 'tidak-tahu' : val} required className="w-4 h-4 accent-jabar-green" /> {label}
                  </label>
                ))}
              </div>
            </div>

            <button disabled={loading} className="w-full bg-jabar-green hover:bg-emerald-800 text-white font-bold py-3.5 rounded-sm transition disabled:opacity-50 mt-4 shadow-lg flex justify-center items-center gap-2">
              {loading ? t.btnLoading : t.btnSubmit}
            </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 batik-border rounded-b-sm"></div>
        </form>

        {msg && (
          <div className={`mt-6 p-4 rounded-sm flex items-start gap-3 shadow-md ${msg.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
            {msg.type === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
            <p className="text-sm font-medium">{msg.text}</p>
          </div>
        )}

      </div>
    </div>
  );
}