'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Volume2, VolumeX } from 'lucide-react';

const navTranslations = {
  id: { home: 'BERANDA', survey: 'ANGKET', status: 'CEK STATUS', education: 'EDUKASI', report: 'BUAT LAPORAN' },
  su: { home: 'BERANDA', survey: 'ANGKÉT', status: 'PARIKSA STATUS', education: 'ATIKAN', report: 'DAMÉL LAPORAN' },
  en: { home: 'HOME', survey: 'SURVEY', status: 'CHECK STATUS', education: 'EDUCATION', report: 'MAKE REPORT' },
  ja: { home: 'ホーム', survey: 'アンケート', status: 'ステータス確認', education: '教育', report: '報告書作成' },
  es: { home: 'INICIO', survey: 'ENCUESTA', status: 'VER ESTADO', education: 'EDUCACIÓN', report: 'CREAR INFORME' }
};

const welcomeTTS = {
  id: "Mode bahasa Indonesia diaktifkan.",
  su: "Mode basa Sunda diaktipkeun.",
  en: "English language mode activated.",
  ja: "日本語モードが有効になりました。",
  es: "Modo de idioma español activado."
};

type Language = 'id' | 'su' | 'en' | 'ja' | 'es';

// Komponen Bendera SVG
const FlagIcon = ({ lang }: { lang: Language }) => {
  if (lang === 'id') {
    return (
      <svg viewBox="0 0 3 2" className="w-4 h-3 rounded-[1px] object-cover shrink-0">
        <rect width="3" height="1" fill="#E70011" />
        <rect y="1" width="3" height="1" fill="#FFFFFF" />
      </svg>
    );
  }
  if (lang === 'su') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-3 shrink-0 text-jabar-gold">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      </svg>
    );
  }
  if (lang === 'en') {
    return (
      <svg viewBox="0 0 60 30" className="w-4 h-3 rounded-[1px] object-cover shrink-0">
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
        </clipPath>
        <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
      </svg>
    );
  }
  if (lang === 'ja') {
    return (
      <svg viewBox="0 0 3 2" className="w-4 h-3 rounded-[1px] object-cover shrink-0 border border-gray-200">
        <rect width="3" height="2" fill="#FFFFFF" />
        <circle cx="1.5" cy="1" r="0.6" fill="#BC002D" />
      </svg>
    );
  }
  if (lang === 'es') {
    return (
      <svg viewBox="0 0 3 2" className="w-4 h-3 rounded-[1px] object-cover shrink-0">
        <rect width="3" height="2" fill="#AA151B" />
        <rect y="0.5" width="3" height="1" fill="#F1BF00" />
      </svg>
    );
  }
  return null;
};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const { language, setLanguage } = useLanguage(); 
  const t = navTranslations[language] || navTranslations.en;

  // DEKLARASI VARIABEL YANG HILANG
  const isJapanese = language === 'ja';
  const isSpanish = language === 'es';

  const links = [
    { href: '/', key: 'home', aksara: '꧋ꦧꦼꦫꦤ꧀ꦢ' },
    { href: '/angket-nasional', key: 'survey', aksara: '꧋ꦲꦁꦏꦼꦠ꧀' },
    { href: '/cek-status', key: 'status', aksara: '꧋ꦕꦼꦏ꧀ꦱ꧀ꦠꦠꦸꦱ꧀' },
    { href: '/hukum', key: 'education', aksara: '꧋ꦲꦼꦢꦸꦏꦱꦶ' },
  ];

  // Tentukan aksen berdasarkan bahasa
  const getAksen = (key: string) => {
    if (language === 'ja') {
      if (key === 'home') return 'ホーム';
      if (key === 'survey') return 'アンケート';
      if (key === 'status') return 'ステータス';
      if (key === 'education') return '教育';
      return '';
    }
    if (language === 'es') {
      if (key === 'home') return 'Inicio';
      if (key === 'survey') return 'Encuesta';
      if (key === 'status') return 'Estado';
      if (key === 'education') return 'Educación';
      return '';
    }
    // Default Jawa/Sunda
    const link = links.find(l => l.key === key);
    return link ? link.aksara : '';
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      if (!isMuted) {
        const utterance = new SpeechSynthesisUtterance(welcomeTTS[lang]);
        
        if (lang === 'su') {
          utterance.pitch = 1.3;
          utterance.rate = 1.1;
        } else if (lang === 'ja') {
          utterance.pitch = 1.1;
          utterance.rate = 1.0;
        } else {
          utterance.pitch = 1.15;
          utterance.rate = 1.05;
        }
        utterance.volume = 1;

        let targetLang = 'id-ID';
        if (lang === 'en') targetLang = 'en-US';
        else if (lang === 'su') targetLang = 'su-ID'; 
        else if (lang === 'ja') targetLang = 'ja-JP';
        else if (lang === 'es') targetLang = 'es-ES';
        
        utterance.lang = targetLang;

        const voices = window.speechSynthesis.getVoices();
        const searchLang = lang === 'su' ? 'id' : targetLang.split('-')[0];
        const matchingVoices = voices.filter(v => v.lang.startsWith(searchLang));
        
        if (matchingVoices.length > 0) {
          const femaleVoice = matchingVoices.find(v => 
            v.name.toLowerCase().includes('female') || 
            v.name.toLowerCase().includes('wanita') || 
            v.name.toLowerCase().includes('damayanti') || 
            v.name.toLowerCase().includes('siti') || 
            v.name.toLowerCase().includes('zira') ||
            v.name.toLowerCase().includes('google') ||
            v.name.toLowerCase().includes('kyoko') ||
            v.name.toLowerCase().includes('monica')
          );
          utterance.voice = femaleVoice || matchingVoices[0];
        }
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-jabar-gold shadow-sm">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        
        {/* LOGO DENGAN EFEK HOVER */}
        <Link href="/" className="group flex items-center font-serif font-black text-2xl tracking-tighter text-jabar-green">
          <span>JABAR</span>
          <span className="text-jabar-gold overflow-hidden transition-all duration-500 ease-in-out max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:mx-1">BEBAS</span>
          <span>BULLYING.</span>
        </Link>
        
        {/* Hamburger Mobile */}
        <button className="md:hidden text-2xl text-jabar-green" onClick={() => setOpen(!open)}>☰</button>
        
        <div className={`${open ? 'flex' : 'hidden'} md:flex absolute md:static top-full left-0 w-full md:w-auto bg-white flex-col md:flex-row items-center gap-6 p-6 md:p-0 border-b md:border-none shadow-md md:shadow-none`}>
          
          {links.map((l) => {
            const isActive = pathname === l.href;
            const label = t[l.key as keyof typeof t];
            const aksenText = getAksen(l.key);

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center text-xs font-bold tracking-widest transition-all duration-300 ${isActive ? 'text-jabar-gold border-b-2 border-jabar-gold pb-1' : 'text-gray-500 hover:text-jabar-gold'}`}
              >
                {isActive ? (
                  <span className={`text-base leading-none ${isJapanese || isSpanish ? 'font-sans' : 'font-sans'}`}>{aksenText}</span>
                ) : (
                  <span>{label}</span>
                )}
              </Link>
            );
          })}
          
          {/* Tombol Buat Laporan dengan Aksen Dinamis */}
          <Link 
            href="/laporan" 
            className={`btn-liquid border-2 text-xs tracking-widest font-bold px-6 py-2 mt-4 md:mt-0 transition-all duration-300 relative ${
              pathname === '/laporan' 
                ? 'border-jabar-gold bg-jabar-gold text-white' 
                : 'border-jabar-green text-jabar-green'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {pathname === '/laporan' ? (
                <span className={`text-base leading-none ${
                  isJapanese ? 'font-sans' : 
                  isSpanish ? 'font-serif font-black' : 
                  'font-sans' 
                }`}>
                  {isJapanese ? '報告' : isSpanish ? 'Informe' : '꧋ꦭꦥꦺꦴꦂꦫꦤ꧀'}
                </span>
              ) : (
                <span className={
                  isJapanese ? 'font-sans tracking-wider' : 
                  isSpanish ? 'font-serif italic' : 
                  'font-bold'
                }>
                  {t.report}
                </span>
              )}
            </span>
          </Link>

          {/* PENGATURAN BAHASA & TOMBOL MUTE */}
          <div className="flex items-center gap-2 md:ml-4 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4 w-full md:w-auto justify-center">
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-1.5 rounded-sm transition-colors ${isMuted ? 'text-red-500 bg-red-50' : 'text-jabar-green bg-gray-50 hover:bg-gray-100'}`}
              title={isMuted ? "Aktifkan suara" : "Matikan suara"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <div className="flex flex-wrap justify-center gap-1">
              {(['id', 'su', 'en', 'ja', 'es'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`group flex items-center justify-center px-2 py-1 text-[10px] font-bold uppercase rounded-sm transition-all duration-300 overflow-hidden ${
                    language === lang 
                      ? 'bg-jabar-green text-white' 
                      : 'text-gray-400 hover:text-jabar-green bg-gray-50'
                  }`}
                >
                  <span className={`transition-all duration-300 ease-in-out flex items-center ${
                    language === lang 
                      ? 'w-4 mr-1 opacity-100' 
                      : 'w-0 opacity-0 group-hover:w-4 group-hover:mr-1 group-hover:opacity-100'
                  }`}>
                    <FlagIcon lang={lang} />
                  </span>
                  <span>{lang}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}