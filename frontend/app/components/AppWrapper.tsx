'use client';
import { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import WelcomeScreen from './WelcomeScreen';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  // 1. Saat loading selesai
  const handleLoadingFinish = () => {
    setShowLoading(false);
    setShowWelcome(true);
  };

  // 2. Saat welcome selesai (tombol diklik)
  const handleWelcomeFinish = () => {
    setShowWelcome(false);
  };

  return (
    <>
      {/* Layar Loading hanya muncul pertama kali */}
      {showLoading && <LoadingScreen onFinish={handleLoadingFinish} />}

      {/* Layar Welcome muncul setelah loading selesai */}
      {showWelcome && <WelcomeScreen onEnter={handleWelcomeFinish} />}

      {/* Konten Website (Navbar, Footer, Isi Halaman) */}
      {/* Awalnya disembunyikan (blur) sampai welcome selesai, opsional */}
      <div className={`${showLoading || showWelcome ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'} transition-opacity duration-1000`}>
        {children}
      </div>
    </>
  );
}