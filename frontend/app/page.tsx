'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Search, Laptop, Frown, MessageSquareX, Users, Shield, Globe, Heart, ShieldCheck } from 'lucide-react';
import FadeIn from './components/FadeIn';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/LanguageContext';

// --- KOMPONEN ANIMASI ANGKA ---
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1000; 
    const frameRate = 1000 / 60; 
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easeOutQuad = progress * (2 - progress);
      const currentCount = Math.round(end * easeOutQuad);
      
      setDisplayValue(currentCount);

      if (currentFrame >= totalFrames) {
        setDisplayValue(end);
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue.toLocaleString('id-ID')}</>;
}

export default function Home() {
  const [filter, setFilter] = useState<'semua' | 'anak' | 'perempuan' | 'laki'>('semua');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const dataKasus = {
    semua: { total: 1240, perempuan: 840, laki: 400 },
    anak: { total: 320, perempuan: 210, laki: 110 },
    perempuan: { total: 840, perempuan: 840, laki: 0 },
    laki: { total: 400, perempuan: 0, laki: 400 },
  };

  const currentData = dataKasus[filter];

  // Cek Bahasa
  const isJapanese = language === 'ja';
  const isSpanish = language === 'es';

  return (
    <div className="overflow-hidden relative">
      
      {/* ================= BACKGROUND AKSEN BUDAYA ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {isJapanese ? (
          <>
            <div className="absolute top-40 left-4 md:left-20 opacity-15 text-pink-400 text-6xl md:text-9xl font-sans transform -rotate-12">桜</div>
            <div className="absolute top-1/3 right-10 md:right-32 opacity-15 text-red-400 text-7xl md:text-[10rem] font-sans transform rotate-12">侍</div>
            <div className="absolute bottom-40 right-4 md:right-20 opacity-15 text-pink-400 text-6xl md:text-9xl font-sans transform -rotate-45">富士山</div>
          </>
        ) : isSpanish ? (
          <>
            <div className="absolute top-40 left-4 md:left-20 opacity-15 text-red-500 text-6xl md:text-9xl font-sans transform -rotate-12">¡Olé!</div>
            <div className="absolute top-1/3 right-10 md:right-32 opacity-15 text-yellow-500 text-7xl md:text-[10rem] font-sans transform rotate-12">España</div>
          </>
        ) : (
          <>
            <div className="absolute top-40 left-4 md:left-20 opacity-15 text-jabar-green text-6xl md:text-9xl font-sans transform -rotate-12">꧋ꦗꦧꦂ</div>
            <div className="absolute top-1/3 right-10 md:right-32 opacity-15 text-jabar-gold text-7xl md:text-[10rem] font-sans transform rotate-12">꧋ꦧꦼꦧꦱ꧀</div>
            <div className="absolute top-[55%] left-10 md:left-40 opacity-15 text-jabar-dark text-5xl md:text-8xl font-sans transform rotate-40">꧋ꦫꦸꦏꦸꦤ꧀</div>
            <div className="absolute bottom-40 right-4 md:right-20 opacity-15 text-jabar-green text-6xl md:text-9xl font-sans transform -rotate-45">꧋ꦩꦸꦭꦾ</div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-15 text-jabar-gold text-4xl md:text-6xl font-sans transform rotate-6">꧋ꦧꦸꦭ꧀ꦭꦶꦪꦶꦁ</div>
          </>
        )}
      </div>

      {/* ================= HERO SECTION ================= */}
      {/* PERUBAHAN: Hapus bg-jabar-green/90 dan overlay bg-black/40 agar background image CSS menembus */}
      <section className="relative overflow-hidden border-b-8 border-jabar-gold min-h-[600px] md:min-h-[800px] z-10">
        
        {/* Overlay Gelap Tipis (Opsional, agar teks putih lebih menonjol) */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-32 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* KIRI: Teks Hero */}
          <div className="group cursor-default">
            <div className="inline-flex items-center gap-2 md:gap-3 bg-white text-jabar-dark px-3 md:px-5 py-1.5 md:py-2 text-[10px] md:text-xs tracking-widest font-bold mb-4 md:mb-6 rounded-sm shadow-lg border-l-4 border-jabar-gold">
              {t.hero.badge}
            </div>
            
            <div className="mb-4 md:mb-6">
              {/* PERUBAHAN: drop-shadow-2xl dan text-white */}
              <h1 className="font-serif text-4xl md:text-7xl font-bold leading-tight text-white drop-shadow-2xl flex flex-col">
                <span className="text-jabar-gold drop-shadow-md">
                  {t.hero.title1}<span className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-100 -translate-y-0 group-hover:max-h-[100px] group-hover:opacity-0 group-hover:translate-y-4">?</span>
                </span>
                <span className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0 -translate-y-4 group-hover:max-h-[100px] group-hover:opacity-100 group-hover:translate-y-0">
                  {t.hero.title2}
                </span>
              </h1>
            </div>

            <div className="overflow-hidden transition-all duration-700 ease-in-out max-h-0 opacity-0 -translate-y-4 group-hover:max-h-[200px] group-hover:opacity-100 group-hover:translate-y-0 mb-0 group-hover:mb-6 md:group-hover:mb-10">
              {/* PERUBAHAN: text-white solid */}
              <p className="text-base md:text-lg text-white drop-shadow-md font-medium max-w-md">
                {t.hero.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link href="/laporan" className="bg-jabar-gold hover:bg-yellow-500 text-jabar-dark font-bold px-5 md:px-8 py-2.5 md:py-3 flex items-center gap-2 transition rounded-sm shadow-xl hover:-translate-y-1 transform text-sm md:text-base">
                <ShieldAlert className="w-4 h-4 md:w-5 md:h-5" /> {t.hero.btnLapor}
              </Link>
              <Link href="/cek-status" className="border-2 border-white bg-white/20 backdrop-blur-sm hover:bg-white hover:text-jabar-green text-white font-bold px-5 md:px-8 py-2.5 md:py-3 flex items-center gap-2 transition rounded-sm text-sm md:text-base">
                <Search className="w-4 h-4 md:w-5 md:h-5" /> {t.hero.btnCek}
              </Link>
            </div>
          </div>

          {/* KANAN: Kotak Statistik */}
          <div className="relative flex flex-col justify-center w-full h-full mt-8 lg:mt-0">
            <div className={`w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${isExpanded ? 'border-0' : 'border-4 border-dashed border-white/50 shadow-none'}`}>
              <div className={`w-full overflow-hidden relative transition-all duration-1000 ease-in-out ${isExpanded ? 'h-40 md:h-56' : 'h-64 md:h-[400px]'}`}>
                 
                 {/* GANTI GAMBAR STATISTIK */}
                 <img 
                    src={
                      isJapanese ? "/jepang/lantera.jpg" : 
                      isSpanish ? "/spanyol/arsitektur.jpg" : 
                      "/wayang-golek.jpg" 
                    } 
                    alt="Ilustrasi Budaya" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-90 scale-105'}`} 
                  />

              </div>
              
              <div className={`w-full bg-[#fcfbf7] text-jabar-dark transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top ${isExpanded ? 'max-h-[600px] opacity-100 translate-y-0 border-t-4 border-jabar-gold' : 'max-h-0 opacity-0 -translate-y-4'}`}>
                <div className="p-5 md:p-8 relative z-10">
                  <div className="flex justify-between items-start border-b border-gray-300 pb-3 md:pb-4 mb-4 md:mb-6">
                    <div>
                      <h3 className="font-serif text-lg md:text-xl font-bold text-jabar-green">{t.stats.title}</h3>
                      <p className="text-[10px] md:text-xs text-gray-500 mt-1">{t.stats.subtitle}</p>
                    </div>
                    <span className="font-sunda text-base md:text-xl text-jabar-gold">
                      {isJapanese ? 'データ' : isSpanish ? 'Datos' : '꧋ꦢꦥ꦳꧀ꦠꦂ​ꦏ​ꦱꦸꦱ꧀'}
                    </span>
                  </div>
                  
                  <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6 flex-wrap">
                    {[
                      { key: 'semua', label: t.stats.filterAll },
                      { key: 'anak', label: t.stats.filterAnak },
                      { key: 'perempuan', label: t.stats.filterPerempuan },
                      { key: 'laki', label: t.stats.filterLaki }
                    ].map((f) => (
                      <button key={f.key} onClick={() => setFilter(f.key as any)} className={`text-[10px] md:text-xs px-2 md:px-4 py-1 md:py-1.5 rounded-sm transition-all ${filter === f.key ? 'bg-jabar-green text-white shadow-md' : 'border border-gray-300 text-gray-500 hover:bg-gray-100'}`}>
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className={`grid gap-2 md:gap-4 mb-6 md:mb-8 transition-all duration-300 ${filter === 'semua' || filter === 'anak' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-bold text-gray-500 tracking-wider">{t.stats.total}</p>
                      <p className="font-serif text-xl md:text-3xl font-bold text-jabar-green"><AnimatedNumber value={currentData.total} /></p>
                    </div>
                    {filter !== 'laki' && (
                      <div className="animate-fade-in">
                        <p className="text-[8px] md:text-[10px] font-bold text-pink-600 tracking-wider">{t.stats.female}</p>
                        <p className="font-serif text-xl md:text-3xl font-bold text-pink-600"><AnimatedNumber value={currentData.perempuan} /></p>
                      </div>
                    )}
                    {filter !== 'perempuan' && (
                      <div className="animate-fade-in">
                        <p className="text-[8px] md:text-[10px] font-bold text-blue-600 tracking-wider">{t.stats.male}</p>
                        <p className="font-serif text-xl md:text-3xl font-bold text-blue-600"><AnimatedNumber value={currentData.laki} /></p>
                      </div>
                    )}
                  </div>

                  <Link href="/laporan" className="block text-center w-full bg-jabar-green hover:bg-emerald-800 text-white font-bold py-2 md:py-3 transition rounded-sm shadow-md text-sm md:text-base">
                    {t.stats.btnLapor}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION KENALI JENIS ================= */}
      <section className="py-16 md:py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jabar-green mb-3 md:mb-4">{t.types.title}</h2>
            <div className="w-16 md:w-24 h-1 bg-jabar-gold mx-auto mb-4 md:mb-6"></div>
            <p className="text-sm md:text-base text-gray-600 mb-8 md:mb-12 max-w-xl mx-auto font-medium px-4">
              {t.types.subtitle}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-left">
            {[
              { icon: <Laptop className="w-6 h-6 text-jabar-green" />, title: t.types.cyber.title, desc: t.types.cyber.desc },
              { icon: <Frown className="w-6 h-6 text-jabar-green" />, title: t.types.physical.title, desc: t.types.physical.desc },
              { icon: <MessageSquareX className="w-6 h-6 text-jabar-green" />, title: t.types.verbal.title, desc: t.types.verbal.desc },
              { icon: <Users className="w-6 h-6 text-jabar-green" />, title: t.types.social.title, desc: t.types.social.desc },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 md:p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group rounded-sm h-full">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-jabar-green/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-jabar-gold/20 transition">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-jabar-green mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION PERLINDUNGAN ================= */}
      <section className="py-16 md:py-24 bg-transparent relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 space-y-16 md:space-y-24">
          
          {/* --- BARIS 1: PEREMPUAN --- */}
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block border border-pink-600 text-pink-600 px-4 py-1.5 text-xs font-bold tracking-widest mb-6 bg-white/50 backdrop-blur-sm">{t.protection.badge}</div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-jabar-green mb-6 leading-tight">{t.protection.femaleTitle}</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 text-justify">
                  {t.protection.femaleDesc}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white/90 backdrop-blur-sm p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
                    <div className="mt-1"><Heart className="w-6 h-6 text-pink-600" /></div>
                    <div>
                      <h4 className="font-bold text-jabar-dark text-sm md:text-base">{t.protection.femaleLaw1}</h4>
                      <p className="text-sm text-gray-600 mt-1">{t.protection.femaleLaw1Desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/90 backdrop-blur-sm p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
                    <div className="mt-1"><Globe className="w-6 h-6 text-pink-600" /></div>
                    <div>
                      <h4 className="font-bold text-jabar-dark text-sm md:text-base">{t.protection.femaleLaw2}</h4>
                      <p className="text-sm text-gray-600 mt-1">{t.protection.femaleLaw2Desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative p-4 bg-white shadow-2xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-all duration-500 ease-in-out">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    
                    {/* GANTI GAMBAR PEREMPUAN */}
                    <img 
                      src={
                        isJapanese ? "/jepang/perempuan-Jepang.jpg" : 
                        isSpanish ? "/spanyol/perempuan-spanyol.jpg" : 
                        "img/perempuan-kuat.jpg"
                      } 
                      alt="Perlindungan Perempuan" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                    />

                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 px-2 py-1 md:px-3 md:py-1.5 rounded-sm bg-white/80 backdrop-blur-sm">
                      <span className="font-sans text-jabar-gold text-xs md:text-lg tracking-widest">
                        {isJapanese ? '女性' : isSpanish ? 'Mujer' : '꧋ꦥꦿꦮꦤ꧀'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* --- BARIS 2: LAKI-LAKI --- */}
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-1 flex justify-center">
                <div className="relative p-4 bg-white shadow-2xl border border-gray-100 transform -rotate-3 hover:rotate-0 transition-all duration-500 ease-in-out">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    
                    {/* GANTI GAMBAR LAKI-LAKI */}
                    <img 
                      src={
                        isJapanese ? "/jepang/myidol.jpg" : 
                        isSpanish ? "/spanyol/yamal.jpg" : 
                        "img/laki-laki-kuat.jpg"
                      } 
                      alt="Perlindungan Laki-laki" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                    />

                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 px-2 py-1 md:px-3 md:py-1.5 rounded-sm bg-white/80 backdrop-blur-sm">
                      <span className="font-sans text-jabar-gold text-xs md:text-lg tracking-widest">
                        {isJapanese ? '男性' : isSpanish ? 'Hombre' : '꧋ꦥꦿꦶꦪ'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-2">
                <div className="inline-block border border-blue-600 text-blue-600 px-4 py-1.5 text-xs font-bold tracking-widest mb-6 bg-white/50 backdrop-blur-sm">{t.protection.badge}</div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-jabar-green mb-6 leading-tight">{t.protection.maleTitle}</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 text-justify">
                  {t.protection.maleDesc}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white/90 backdrop-blur-sm p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
                    <div className="mt-1"><Shield className="w-6 h-6 text-blue-600" /></div>
                    <div>
                      <h4 className="font-bold text-jabar-dark text-sm md:text-base">{t.protection.maleLaw1}</h4>
                      <p className="text-sm text-gray-600 mt-1">{t.protection.maleLaw1Desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/90 backdrop-blur-sm p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
                    <div className="mt-1"><Users className="w-6 h-6 text-blue-600" /></div>
                    <div>
                      <h4 className="font-bold text-jabar-dark text-sm md:text-base">{t.protection.maleLaw2}</h4>
                      <p className="text-sm text-gray-600 mt-1">{t.protection.maleLaw2Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================= SECTION BANTUAN DARURAT ================= */}
      <section className="relative py-16 md:py-24 bg-[#fcfbf7] overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <FadeIn>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full md:w-2 h-2 md:h-full bg-jabar-gold"></div>
              <div className="flex-1 text-center md:text-left z-10 pt-4 md:pt-0">
                <div className="inline-block bg-jabar-green text-white font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs tracking-widest mb-4 md:mb-6 shadow-sm">{t.emergency.badge}</div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-jabar-dark mb-3 md:mb-4 leading-tight">
                  {t.emergency.title1} <br /><span className="text-jabar-gold">{t.emergency.title2}</span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
                  {t.emergency.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                  <Link href="/laporan" className="inline-flex items-center justify-center gap-2 bg-jabar-green hover:bg-emerald-800 text-white font-bold text-sm md:text-lg px-6 md:px-8 py-2.5 md:py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <ShieldAlert className="w-4 h-4 md:w-5 md:h-5" /> {t.emergency.btnLapor}
                  </Link>
                  <a href="https://wa.me/628111129129" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-jabar-dark hover:border-jabar-gold hover:text-jabar-gold font-bold text-sm md:text-lg px-6 md:px-8 py-2.5 md:py-3.5 rounded-lg shadow-sm transition-all duration-300">
                    {t.emergency.btnSapa}
                  </a>
                </div>
              </div>
              <div className="flex-1 relative flex justify-center perspective-1000 w-full mt-8 md:mt-0">
                <div className="absolute top-0 md:top-10 -left-2 md:-left-12 bg-white p-3 md:p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2 md:gap-3 animate-[float_4s_ease-in-out_infinite] z-30 w-48 md:w-56 transform -rotate-6">
                  <div className="bg-green-100 p-1.5 md:p-2 rounded-full"><ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-green-600" /></div>
                  <div>
                    <p className="text-[10px] md:text-xs font-bold text-gray-800">{t.emergency.phoneMockup.notifTitle}</p>
                    <p className="text-[8px] md:text-[10px] text-gray-500">Tiket: JB-A1B2C3</p>
                  </div>
                </div>
                <div className="relative w-56 md:w-64 h-[420px] md:h-[480px] bg-white rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[8px] border-gray-800 shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                  <div className="absolute top-0 inset-x-0 h-5 md:h-6 bg-gray-800 rounded-b-3xl w-28 md:w-32 mx-auto z-30"></div>
                  <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative pt-6 md:pt-8">
                    <div className="p-4 md:p-6 flex-1">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center"><Heart className="w-6 h-6 md:w-8 md:h-8 text-blue-500" /></div>
                      <h4 className="text-center font-bold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">{t.emergency.phoneMockup.greeting}</h4>
                      <p className="text-center text-[10px] md:text-xs text-gray-500 mb-4 md:mb-6">{t.emergency.phoneMockup.subGreeting}</p>
                      <div className="space-y-2 md:space-y-3">
                        <div className="bg-white p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm border border-gray-100 flex items-center gap-2 md:gap-3">
                          <div className="bg-jabar-green p-1.5 md:p-2 rounded-md md:rounded-lg text-white"><ShieldAlert className="w-3 h-3 md:w-4 md:h-4"/></div>
                          <span className="text-[10px] md:text-xs font-bold text-gray-700">{t.emergency.phoneMockup.btnLapor}</span>
                        </div>
                        <div className="bg-white p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm border border-gray-100 flex items-center gap-2 md:gap-3">
                          <div className="bg-jabar-gold p-1.5 md:p-2 rounded-md md:rounded-lg text-white"><Search className="w-3 h-3 md:w-4 md:h-4"/></div>
                          <span className="text-[10px] md:text-xs font-bold text-gray-700">{t.emergency.phoneMockup.btnCek}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 md:p-4 border-t border-gray-100">
                      <div className="w-full bg-jabar-green text-white text-center py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-bold shadow-sm">{t.emergency.phoneMockup.btnStart}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/4 -right-4 md:-right-8 text-jabar-gold animate-[float_3s_ease-in-out_infinite] z-20">
                  <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================= SECTION CARA MENGHADAPI BULLYING ================= */}
      <section className="relative pt-16 md:pt-24 bg-[#0f172a] overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center relative z-20 pb-12 md:pb-16">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">{t.steps.title}</h2>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-6 md:mb-8">
              {t.steps.subtitle}
            </p>
            <Link href="/hukum" className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(22,163,74,0.4)] text-sm md:text-base">
              {t.steps.btnLearn}
            </Link>
          </FadeIn>
        </div>

        <div className="relative w-full">
          <div className="bg-white rounded-t-[2rem] md:rounded-t-[5rem] pt-16 md:pt-20 pb-16 md:pb-20 px-4 md:px-6 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pt-10 md:pt-16">
              
              {/* Langkah 1 */}
              <FadeIn delay={0.1}>
                <div className="flex flex-col items-center text-center group relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 -mt-24 md:-mt-32 mb-4 md:mb-6 relative z-30 drop-shadow-2xl">
                    
                    {/* GANTI GAMBAR LANGKAH 1 */}
                    <img 
                      src={
                        "/tenang.png"
                      } 
                      alt="Karakter Tenang" 
                      className="w-full h-full object-contain" 
                    />

                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2 md:mb-3 font-serif">{t.steps.step1Title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed px-2 md:px-4">
                    {t.steps.step1Desc}
                  </p>
                </div>
              </FadeIn>

              {/* Langkah 2 */}
              <FadeIn delay={0.2}>
                <div className="flex flex-col items-center text-center group relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 -mt-24 md:-mt-32 mb-4 md:mb-6 relative z-30 drop-shadow-2xl">
                    
                    {/* GANTI GAMBAR LANGKAH 2 */}
                    <img 
                      src={
                        "/bantuan.png"
                      } 
                      alt="Karakter Bantuan" 
                      className="w-full h-full object-contain" 
                    />

                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2 md:mb-3 font-serif">{t.steps.step2Title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed px-2 md:px-4">
                    {t.steps.step2Desc}
                  </p>
                </div>
              </FadeIn>

              {/* Langkah 3 */}
              <FadeIn delay={0.3}>
                <div className="flex flex-col items-center text-center group relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 -mt-24 md:-mt-32 mb-4 md:mb-6 relative z-30 drop-shadow-2xl">
                    
                    {/* GANTI GAMBAR LANGKAH 3 */}
                    <img 
                      src={
                        "/lapor.png"
                      } 
                      alt="Karakter Lapor" 
                      className="w-full h-full object-contain" 
                    />

                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2 md:mb-3 font-serif">{t.steps.step3Title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed px-2 md:px-4">
                    {t.steps.step3Desc}
                  </p>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}