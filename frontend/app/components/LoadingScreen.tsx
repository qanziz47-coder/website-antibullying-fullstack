
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const loadingTranslations = {
  id: {
    title: 'JABAR BEBAS BULLYING',
    subtitle: 'ᮏᮘᮁ',
    loading: 'Mempersiapkan pengalaman aman...',
  },
  su: {
    title: 'JABAR BEBAS BULLYING',
    subtitle: 'ᮏᮘᮁ',
    loading: 'Nyiapkeun pangalaman anu aman...',
  },
  en: {
    title: 'WEST JAVA BULLYING-FREE',
    subtitle: 'ᮏᮘᮁ',
    loading: 'Preparing a safe experience...',
  },
  ja: {
    title: 'いじめのない西ジャワ',
    subtitle: 'ᮏᮘᮁ',
    loading: '安全な環境を準備しています...',
  },
  es: {
    title: 'JAVA OCCIDENTAL SIN ACOSO',
    subtitle: 'ᮏᮘᮁ',
    loading: 'Preparando una experiencia segura...',
  },
};

export default function LoadingScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  const t =
    loadingTranslations[
      language as keyof typeof loadingTranslations
    ] || loadingTranslations.id;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onFinish, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] bg-[#fcfbf7] flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-34 h-34 mb-6"
          >
            <img
              src="/batik.png"
              alt="Kujang"
              className="w-full h-full object-contain drop-shadow-xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove(
                  'hidden'
                );
              }}
            />

            <div className="hidden text-6xl text-jabar-green">
              🛡️
            </div>
          </motion.div>

          <h1 className="font-serif text-3xl font-bold text-jabar-green tracking-widest mb-2 text-center px-4">
            {t.title}
          </h1>

          <p className="font-sunda text-xl text-jabar-gold tracking-widest mb-6">
            {t.subtitle}
          </p>

          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-jabar-gold"
              initial={{ width: '0%' }}
              animate={{
                width: ['0%', '50%', '50%', '100%'],
              }}
              transition={{
                duration: 2.5,
                times: [0, 0.4, 0.6, 1],
                ease: 'easeInOut',
              }}
            />
          </div>

          <p className="text-xs text-gray-400 mt-4 tracking-wide">
            {t.loading}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
