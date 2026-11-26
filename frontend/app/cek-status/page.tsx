'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { Search, FileText, Calendar, AlertCircle, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

// --- KAMUS BAHASA UNTUK CEK STATUS ---
const cekStatusTranslations = {
  id: {
    title: "Lacak Status Laporan",
    subtitle: "Masukkan Nomor Tiket yang Anda terima saat membuat laporan.",
    placeholder: "Masukkan No. Tiket (Cth: JB-A1B2C3)",
    btnSearch: "Lacak",
    btnLoading: "Mencari...",
    errorMsg: "Nomor tiket tidak ditemukan. Pastikan penulisan sudah benar (Contoh: JB-A1B2C3).",
    ticketLabel: "NOMOR TIKET",
    statusLabel: "STATUS SAAT INI",
    typeLabel: "JENIS LAPORAN",
    dateLabel: "TANGGAL DIBUAT",
    responseTitle: "Tanggapan Petugas",
    statusDescTitle: "Keterangan:",
    statusDesc: {
      Baru: "Laporan sedang dalam antrean untuk diverifikasi oleh admin.",
      Verifikasi: "Laporan sedang diperiksa dan diklasifikasikan oleh tim TPPK.",
      Intervensi: "Tim sedang melakukan pendampingan dan mediasi.",
      Dirujuk: "Kasus telah dirujuk ke pihak berwenang (UPTD PPA / Kepolisian).",
      Selesai: "Kasus telah diselesaikan dengan baik."
    }
  },
  su: {
    title: "Lacak Status Laporan",
    subtitle: "Lebetkeun Nomer Tikét anu anjeun tampi nalika damél laporan.",
    placeholder: "Lebetkeun No. Tikét (Conto: JB-A1B2C3)",
    btnSearch: "Lacak",
    btnLoading: "Milarian...",
    errorMsg: "Nomer tikét henteu kapendak. Pastikeun panulisanna leres (Conto: JB-A1B2C3).",
    ticketLabel: "NOMER TIKÉT",
    statusLabel: "STATUS AYEUNA",
    typeLabel: "JINIS LAPORAN",
    dateLabel: "TANGGAL DIBUAT",
    responseTitle: "Tanggapan Patugas",
    statusDescTitle: "Katerangan:",
    statusDesc: {
      Baru: "Laporan nuju dina antrean pikeun diverifikasi ku admin.",
      Verifikasi: "Laporan nuju dipariksa sareng diklasifikasikeun ku tim TPPK.",
      Intervensi: "Tim nuju ngalakukeun pendampingan sareng mediasi.",
      Dirujuk: "Kasus parantos dirujuk ka pihak berwajib (UPTD PPA / Kapulisian).",
      Selesai: "Kasus parantos réngsé kalayan saé."
    }
  },
  en: {
    title: "Track Report Status",
    subtitle: "Enter the Ticket Number you received when making the report.",
    placeholder: "Enter Ticket No. (Ex: JB-A1B2C3)",
    btnSearch: "Track",
    btnLoading: "Searching...",
    errorMsg: "Ticket number not found. Make sure the writing is correct (Example: JB-A1B2C3).",
    ticketLabel: "TICKET NUMBER",
    statusLabel: "CURRENT STATUS",
    typeLabel: "REPORT TYPE",
    dateLabel: "DATE CREATED",
    responseTitle: "Officer Response",
    statusDescTitle: "Description:",
    statusDesc: {
      Baru: "The report is in the queue to be verified by the admin.",
      Verifikasi: "The report is being reviewed and classified by the TPPK team.",
      Intervensi: "The team is conducting mentoring and mediation.",
      Dirujuk: "The case has been referred to the authorities (UPTD PPA / Police).",
      Selesai: "The case has been resolved properly."
    }
  },
  ja: {
    title: "レポートステータスの追跡",
    subtitle: "レポート作成時に受け取ったチケット番号を入力してください。",
    placeholder: "チケット番号を入力 (例: JB-A1B2C3)",
    btnSearch: "追跡",
    btnLoading: "検索中...",
    errorMsg: "チケット番号が見つかりません。正しく入力されているか確認してください (例: JB-A1B2C3)。",
    ticketLabel: "チケット番号",
    statusLabel: "現在のステータス",
    typeLabel: "レポートの種類",
    dateLabel: "作成日",
    responseTitle: "担当者からの回答",
    statusDescTitle: "説明:",
    statusDesc: {
      Baru: "レポートは管理者による確認待ちの状態です。",
      Verifikasi: "レポートはTPPKチームによって確認および分類されています。",
      Intervensi: "チームはメンタリングと調停を行っています。",
      Dirujuk: "事件は当局（UPTD PPA / 警察）に付託されました。",
      Selesai: "事件は適切に解決されました。"
    }
  },
  es: {
    title: "Rastrear Estado del Informe",
    subtitle: "Ingrese el Número de Ticket que recibió al realizar el informe.",
    placeholder: "Ingrese Núm. de Ticket (Ej: JB-A1B2C3)",
    btnSearch: "Rastrear",
    btnLoading: "Buscando...",
    errorMsg: "Número de ticket no encontrado. Asegúrese de que la escritura sea correcta (Ejemplo: JB-A1B2C3).",
    ticketLabel: "NÚMERO DE TICKET",
    statusLabel: "ESTADO ACTUAL",
    typeLabel: "TIPO DE INFORME",
    dateLabel: "FECHA DE CREACIÓN",
    responseTitle: "Respuesta del Oficial",
    statusDescTitle: "Descripción:",
    statusDesc: {
      Baru: "El informe está en la cola para ser verificado por el administrador.",
      Verifikasi: "El informe está siendo revisado y clasificado por el equipo de TPPK.",
      Intervensi: "El equipo está realizando tutoría y mediación.",
      Dirujuk: "El caso ha sido remitido a las autoridades (UPTD PPA / Policía).",
      Selesai: "El caso ha sido resuelto correctamente."
    }
  }
};

export default function CekStatus() {
  const [tiket, setTiket] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState<{ 
    status: string; 
    jenis: string; 
    tanggal: string; 
    tiket: string;
    tanggapan?: string | null;
  } | null>(null);
  const [error, setError] = useState('');

  const { language } = useLanguage(); 
  const t = cekStatusTranslations[language as keyof typeof cekStatusTranslations] || cekStatusTranslations.en;

  // Cek Bahasa
  const isJapanese = language === 'ja';
  const isSpanish = language === 'es';

  async function handleCek(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(''); setHasil(null);

    try {
      const res = await api.cekStatus(tiket.toUpperCase());
      setHasil(res);
    } catch (err) {
      setError(t.errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-6 overflow-hidden flex flex-col items-center">
      
      {/* --- ORNAMEN LATAR BELAKANG --- */}
      <div className="absolute top-0 left-0 w-full h-72 bg-jabar-green opacity-5 z-0" 
           style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>
      
      <div className="absolute bottom-10 -left-20 w-80 h-80 opacity-10 pointer-events-none z-0">
        <img 
          src={
            isJapanese ? "/jepang-ornamen.png" : 
            isSpanish ? "/spanyol-ornamen.png" : 
            "/batik.png"
          } 
          alt="Ornamen Kiri" 
          className="w-full h-full object-contain" 
        />
      </div>
      
      <div className="absolute top-20 -right-20 w-80 h-80 opacity-10 pointer-events-none z-0">
        <img 
          src={
            isJapanese ? "/jepang-ornamen.png" : 
            isSpanish ? "/spanyol-ornamen.png" : 
            "/batik.png"
          } 
          alt="Ornamen Kanan" 
          className="w-full h-full object-contain" 
        />
      </div>

      <div className="max-w-2xl w-full relative z-10 mt-10">
        
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-16 h-16 mb-4">
              {/* GANTI IKON DINAMIS */}
              <img 
                src={
                  isJapanese ? "/icon-jp.png" : 
                  isSpanish ? "/spanyol.png" : 
                  "/ku.png"
                } 
                alt="Ikon Budaya" 
                className="w-full h-full object-contain drop-shadow-md" 
              />
          </div>
          <h1 className="font-serif text-4xl font-bold text-jabar-green mb-2">{t.title}</h1>
          
          {/* Aksara / Teks Aksen Budaya */}
          <p className="text-lg mb-4 tracking-widest font-sunda text-jabar-gold">
            {isJapanese ? '追跡' : isSpanish ? 'Rastrear' : 'ᮑᮤᮃᮁ ᮊᮘᮨᮁᮞᮤᮠᮔ᮪'}
          </p>
          
          <p className="text-gray-600">
              {t.subtitle}
          </p>
        </div>

        {/* --- KOTAK PENCARIAN YANG DIBAGUSKAN --- */}
        <form onSubmit={handleCek} className="relative mb-10 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-jabar-green to-jabar-gold rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          
          <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-100 p-2">
            <div className="pl-4 text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <input 
              value={tiket}
              onChange={(e) => setTiket(e.target.value)}
              required
              placeholder={t.placeholder} 
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-800 uppercase font-mono tracking-wider placeholder:normal-case placeholder:font-sans placeholder:tracking-normal" 
            />
            <button 
              disabled={loading} 
              type="submit" 
              className="bg-jabar-green hover:bg-emerald-800 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              {loading ? t.btnLoading : t.btnSearch}
            </button>
          </div>
        </form>

        {/* Pesan Error */}
        {error && (
          <div className="bg-red-50 text-red-800 border-l-4 border-red-500 p-4 rounded-sm flex items-start gap-3 shadow-sm mb-8 animate-fade-in">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Hasil Pencarian */}
        {hasil && (
          <div className="bg-white rounded-xl shadow-2xl border-t-4 border-jabar-gold overflow-hidden animate-fade-in relative">
            {/* Ornamen Batik di dalam hasil */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-jabar-green opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d97706 2px, transparent 2px)', backgroundSize: '15px 15px' }}></div>

            <div className="bg-[#fcfbf7] p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <div>
                <p className="text-xs text-gray-500 font-bold tracking-wider mb-1">{t.ticketLabel}</p>
                <p className="font-mono text-xl font-bold text-jabar-green">{hasil.tiket}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs text-gray-500 font-bold tracking-wider mb-1">{t.statusLabel}</p>
                <span className={`inline-block px-4 py-1.5 text-sm font-bold rounded-full ${
                  hasil.status === 'Selesai' ? 'bg-green-100 text-green-800 border border-green-200' :
                  hasil.status === 'Dirujuk' ? 'bg-red-100 text-red-800 border border-red-200' :
                  hasil.status === 'Intervensi' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  'bg-orange-100 text-orange-800 border border-orange-200'
                }`}>
                  {hasil.status}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-jabar-green/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-jabar-green" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold tracking-wider">{t.typeLabel}</p>
                  <p className="font-medium text-jabar-dark text-lg">{hasil.jenis}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-jabar-green/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-jabar-green" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold tracking-wider">{t.dateLabel}</p>
                  <p className="font-medium text-jabar-dark text-lg">{hasil.tanggal}</p>
                </div>
              </div>
            </div>

            {/* --- KOTAK TANGGAPAN ADMIN --- */}
            {hasil.tanggapan && (
              <div className="bg-blue-50 p-5 border-t border-b border-blue-100 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm font-bold text-blue-800">{t.responseTitle}</h4>
                </div>
                <p className="text-sm text-blue-900 italic pl-7">"{hasil.tanggapan}"</p>
              </div>
            )}

            {/* Keterangan Status */}
            <div className="bg-jabar-green p-5 text-sm text-white relative z-10">
              <strong className="text-jabar-gold">{t.statusDescTitle}</strong> {
                t.statusDesc[hasil.status as keyof typeof t.statusDesc] || 
                (language === 'en' ? "Status unknown." : language === 'su' ? "Status henteu dipikanyaho." : "Status tidak diketahui.")
              }
            </div>
          </div>
        )}

      </div>
    </div>
  );
}