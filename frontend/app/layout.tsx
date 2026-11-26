import type { Metadata } from 'next';
import { Inter, Playfair_Display, Noto_Sans_Sundanese, Noto_Sans_JP } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';
import AppWrapper from './components/AppWrapper'; 
import { LanguageProvider } from '@/lib/LanguageContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const sundanese = Noto_Sans_Sundanese({ weight: ['400', '500'], subsets: ['sundanese'], variable: '--font-sundanese' });
const notoSansJP = Noto_Sans_JP({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-jp' });

export const metadata: Metadata = {
  title: 'JabarBebasBullying',
  description: 'Platform anti-bullying Jawa Barat',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} ${sundanese.variable} ${notoSansJP.variable} font-sans bg-[#fcfbf7] text-slate-800`}>
        
        {/* PROVIDER HARUS MEMBUNGKUS SEMUA, TERMASUK APPWRAPPER */}
        <LanguageProvider>
          <AppWrapper>
            <Navbar />
            <main className="min-h-screen relative overflow-hidden">
              <div className="relative z-10">{children}</div>
            </main>
            <Footer />
          </AppWrapper>
        </LanguageProvider>
        
      </body>
    </html>
  );
}