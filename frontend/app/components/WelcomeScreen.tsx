'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext'; // Import Context

// --- KAMUS BAHASA UNTUK WELCOME SCREEN ---
const welcomeTranslations = {
  id: {
    fase0: ["JABAR", "BULLYING"],
    fase1: ["JABAR", "BEBAS", "BULLYING"],
    fase2: {
      aksara: "ꦗꦧꦂ ꦧꦺꦧꦱ꧀ ꦧꦸꦭ꧀ꦭꦶꦪꦶꦁ",
      latin: "Jawa Barat Bebas Perundungan"
    },
    greeting: "꧋ꦱꦩ꧀ꦥꦸꦫꦱꦸꦤ꧀",
    btnEnter: "Klik untuk Masuk",
    tts: "Sampurasun! Wilujeng sumping di situs web anti bullying Jawa Barat. Di dieu kami nyayogikeun laporan sareng jasa hukum. Pikeun anjeun anu hoyong ngalaporkeun, kami parantos nyayogikeun tombol laporan di pojok katuhu luhur. Hatur nuhun, barudak Jawa Barat.",
    ttsLang: "id-ID"
  },
  su: {
    fase0: ["JABAR", "BULLYING"],
    fase1: ["JABAR", "BEBAS", "BULLYING"],
    fase2: {
      aksara: "ꦗꦧꦂ ꦧꦺꦧꦱ꧀ ꦧꦸꦭ꧀ꦭꦶꦪꦶꦁ",
      latin: "Jabar Bebas tina Ririwit"
    },
    greeting: "꧋ꦱꦩ꧀ꦥꦸꦫꦱꦸꦤ꧀",
    btnEnter: "Klik Kanggo Lebet",
    tts: "Sampurasun! Wilujeng sumping di situs web anti bullying Jawa Barat. Di dieu kami nyayogikeun laporan sareng jasa hukum. Pikeun anjeun anu hoyong ngalaporkeun, kami parantos nyayogikeun tombol laporan di pojok katuhu luhur. Hatur nuhun, barudak Jawa Barat.",
    ttsLang: "su-ID"
  },
  en: {
    fase0: ["WEST JAVA", "BULLYING"],
    fase1: ["WEST JAVA", "FREE", "BULLYING"],
    fase2: {
      aksara: "ꦗꦧꦂ ꦧꦺꦧꦱ꧀ ꦧꦸꦭ꧀ꦭꦶꦪꦶꦁ", 
      latin: "West Java Free from Bullying"
    },
    greeting: "Welcome",
    btnEnter: "Click to Enter",
    tts: "Greetings! Welcome to the West Java anti-bullying website. Here we provide reports and legal services. For those who want to report, we have provided a report button in the top right corner. Thank you, children of West Java.",
    ttsLang: "en-US"
  },
  ja: {
    fase0: ["西ジャワ", "いじめ"],
    fase1: ["西ジャワ", "いじめ", "反対"],
    fase2: {
      aksara: "西ジャワ いじめ 反対",
      latin: "西ジャワいじめ防止"
    },
    greeting: "ようこそ",
    btnEnter: "クリックして入る",
    tts: "こんにちは！西ジャワいじめ防止ウェブサイトへようこそ。ここでは報告と法律サービスを提供しています。報告したい方は、右上の報告ボタンをご利用ください。西ジャワの子供たち、ありがとうございます。",
    ttsLang: "ja-JP"
  },
  es: {
    fase0: ["JAVA OCC.", "ACOSO"],
    fase1: ["JAVA OCC.", "SIN", "ACOSO"],
    fase2: {
      aksara: "JAVA OCCIDENTAL",
      latin: "Java Occidental Sin Acoso"
    },
    greeting: "Bienvenido",
    btnEnter: "Clic para Entrar",
    tts: "¡Saludos! Bienvenido al sitio web anti-acoso de Java Occidental. Aquí proporcionamos informes y servicios legales. Para aquellos que quieran denunciar, hemos proporcionado un botón de denuncia en la esquina superior derecha. Gracias, niños de Java Occidental.",
    ttsLang: "es-ES"
  }
};

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const [fase, setFase] = useState(0); 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { language } = useLanguage(); // Ambil bahasa aktif
  const t = welcomeTranslations[language as keyof typeof welcomeTranslations] || welcomeTranslations.en;

  // Efek untuk mencoba autoplay saat pertama kali dimuat
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5; 

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay diblokir. Menunggu interaksi pengguna.");
          setIsPlaying(false);
        });
    }
  }, []);

  // Efek untuk animasi teks (loop fase)
  useEffect(() => {
    if (!isOpen) return;

    let timer: NodeJS.Timeout;

    if (fase === 0) {
      timer = setTimeout(() => setFase(1), 2000);
    } else if (fase === 1) {
      timer = setTimeout(() => setFase(2), 3500);
    } else if (fase === 2) {
      timer = setTimeout(() => setFase(0), 3500);
    }

    return () => clearTimeout(timer);
  }, [fase, isOpen]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleEnter = () => {
    // HENTIKAN LAGU
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; 
      setIsPlaying(false);
    }

    // Putar suara TTS sesuai bahasa
    if ('speechSynthesis' in window) {
      const ucapan = new SpeechSynthesisUtterance(t.tts);
      
      // Sesuaikan logat bahasa
      if (language === 'en') ucapan.lang = 'en-US';
      else if (language === 'su') ucapan.lang = 'su-ID'; 
      else if (language === 'ja') ucapan.lang = 'ja-JP'; 
      else if (language === 'es') ucapan.lang = 'es-ES';
      else ucapan.lang = 'id-ID';

      // Atur nada agar lebih ringan
      ucapan.rate = 0.9; 
      ucapan.pitch = 1.1;

      window.speechSynthesis.speak(ucapan);
    }

    setIsOpen(false);
    setTimeout(onEnter, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-jabar-dark flex flex-col items-center justify-center"
        >
          {/* AUDIO ELEMENT */}
          <audio ref={audioRef} src="/sounds/sambutan.mp3" loop />

          {/* BACKGROUND PATTERN */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#d97706 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
          </div>

          {/* TOMBOL KONTROL MUSIK */}
          <button
            onClick={toggleMusic}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 text-white flex items-center justify-center"
            aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </button>

          <div className="relative z-10 text-center px-6 w-full max-w-5xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-38 h-38 mx-auto mb-8"
            >
              <img src="/batik.png" alt="Kujang" className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>

            {/* AREA TEKS DENGAN 3 FASE */}
            <div className="relative flex items-center justify-center mb-4 min-h-[80px] md:min-h-[100px]">
              <AnimatePresence mode="wait">
                
                {/* FASE 0 */}
                {fase === 0 && (
                  <motion.div
                    key="fase-0"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex items-center gap-x-3 md:gap-x-4"
                  >
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">{t.fase0[0]}</h1>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">{t.fase0[1]}</h1>
                  </motion.div>
                )}

                {/* FASE 1 */}
                {fase === 1 && (
                  <motion.div
                    key="fase-1"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex items-center gap-x-3 md:gap-x-4"
                  >
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">{t.fase1[0]}</h1>
                    <motion.h1 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-serif text-4xl md:text-6xl font-bold text-jabar-gold"
                    >
                      {t.fase1[1]}
                    </motion.h1>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">{t.fase1[2]}</h1>
                  </motion.div>
                )}

                {/* FASE 2 */}
                {fase === 2 && (
                  <motion.div
                    key="fase-2"
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex flex-col items-center justify-center"
                  >
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-jabar-gold mb-2 tracking-widest drop-shadow-md">
                      {t.fase2.aksara}
                    </h1>
                    <p className="text-white text-lg md:text-2xl font-light tracking-widest opacity-80">
                      {t.fase2.latin}
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-jabar-gold font-sunda text-2xl tracking-widest mb-12 mt-4"
            >
              {t.greeting}
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              onClick={handleEnter}
              className="bg-jabar-gold hover:bg-yellow-500 text-jabar-dark font-bold text-lg px-12 py-4 rounded-full shadow-[0_0_30px_rgba(217,119,6,0.4)] transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
            >
              {t.btnEnter}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}