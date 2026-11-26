'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'id' | 'su' | 'en' | 'ja' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && ['id', 'su', 'en', 'ja', 'es'].includes(savedLang)) {
      setLanguageState(savedLang);
      document.body.setAttribute('data-theme', savedLang); // Set tema awal
    } else {
      document.body.setAttribute('data-theme', 'id'); // Default
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
    document.body.setAttribute('data-theme', lang); // Ubah tema saat bahasa diganti
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}