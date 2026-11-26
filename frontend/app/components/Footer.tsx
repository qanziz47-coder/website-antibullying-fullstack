
'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const footerTranslations: Record<string, any> = {
  id: {
    description:
      'Platform pelaporan perundungan untuk pelajar Jawa Barat. Aman, anonim, dan dilindungi hukum.',
    contact: 'KONTAK BANTUAN',
    service: '(Layanan 24 Jam KemenPPPA)',
    quickLinks: 'TAUTAN CEPAT',
    links: [
      'Buat Laporan',
      'Cek Status',
      'Dasar Hukum',
      'Angket Nasional',
    ],
    copyright: 'PROYEK JABAR BEBAS BULLYING. HAK CIPTA DILINDUNGI.',
    references: 'Sumber Referensi',
    motto: 'Ngamumule Budaya, Nyalametkeun Barudak',
  },

  su: {
    description:
      'Platform pikeun ngalaporkeun bullying pikeun murid di Jawa Barat. Aman, anonim, sareng ditangtayungan ku hukum.',
    contact: 'KONTAK BANTOSAN',
    service: '(Layanan 24 Jam KemenPPPA)',
    quickLinks: 'TALUAN Gancang',
    links: [
      'Jieun Laporan',
      'Pariksa Status',
      'Dasar Hukum',
      'Angkét Nasional',
    ],
    copyright: 'PROYEK JABAR BEBAS BULLYING. HAK CIPTA DILINDUNGI.',
    references: 'Sumber Rujukan',
    motto: 'Ngamumule Budaya, Nyalametkeun Barudak',
  },

  en: {
    description:
      'A bullying reporting platform for students in West Java. Safe, anonymous, and protected by law.',
    contact: 'HELP CONTACT',
    service: '(24-Hour KemenPPPA Service)',
    quickLinks: 'QUICK LINKS',
    links: [
      'Submit a Report',
      'Check Status',
      'Legal Basis',
      'National Survey',
    ],
    copyright: 'JABAR BULLYING-FREE PROJECT. ALL RIGHTS RESERVED.',
    references: 'Reference Sources',
    motto: 'Preserving Culture, Protecting Children',
  },

  ja: {
    description:
      '西ジャワ州の学生向けいじめ報告プラットフォームです。安全で匿名性があり、法律によって保護されています。',
    contact: '相談・お問い合わせ',
    service: '（KemenPPPA 24時間サービス）',
    quickLinks: 'クイックリンク',
    links: [
      '報告する',
      '状況を確認',
      '法的根拠',
      '全国アンケート',
    ],
    copyright: 'JABAR いじめ防止プロジェクト。無断転載禁止。',
    references: '参考資料',
    motto: '文化を守り、子どもたちを守る',
  },

  es: {
    description:
      'Plataforma para denunciar el acoso escolar dirigida a estudiantes de Java Occidental. Segura, anónima y protegida por la ley.',
    contact: 'CONTACTO DE AYUDA',
    service: '(Servicio de KemenPPPA las 24 horas)',
    quickLinks: 'ENLACES RÁPIDOS',
    links: [
      'Crear un informe',
      'Consultar estado',
      'Base legal',
      'Encuesta nacional',
    ],
    copyright: 'PROYECTO JABAR LIBRE DE ACOSO. TODOS LOS DERECHOS RESERVADOS.',
    references: 'Fuentes de referencia',
    motto: 'Preservar la cultura, proteger a los niños',
  },
};

export default function Footer() {
  const { language } = useLanguage();

  const t =
    footerTranslations[language] || footerTranslations.id;

  const quickLinks = [
    { href: '/laporan', label: t.links[0] },
    { href: '/tindakan', label: t.links[1] },
    { href: '/hukum', label: t.links[2] },
    { href: '/angket-nasional', label: t.links[3] },
  ];

  return (
    <footer className="bg-jabar-dark text-gray-300 pt-16 pb-8 border-t-4 border-jabar-gold relative overflow-hidden">
      {/* BACKGROUND FOOTER */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="/back.jpg"
          alt="Batik"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">

        {/* BRAND */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-serif text-2xl font-black text-white mb-4 flex items-center gap-3">
            JABAR
            <span className="text-jabar-gold">
              BEBAS
            </span>
            BULLYING.
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            {t.description}
            <span className="italic text-jabar-gold/80 mt-2 block">
              "{t.motto}"
            </span>
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-bold text-xs tracking-widest text-white mb-4">
            {t.contact}
          </h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a
                href="mailto:sapa129@kemenpppa.go.id"
                className="hover:text-jabar-gold transition"
              >
                sapa129@kemenpppa.go.id
              </a>
            </li>
            <li>
              <a
                href="tel:08111129129"
                className="hover:text-jabar-gold transition"
              >
                08111-129-129
              </a>
            </li>
            <li className="italic text-xs mt-2 text-gray-500">
              {t.service}
            </li>
          </ul>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h4 className="font-bold text-xs tracking-widest text-white mb-4">
            {t.quickLinks}
          </h4>
          <ul className="text-sm text-gray-400 space-y-2">

            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="hover:text-jabar-gold transition"
                >
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 relative z-10 gap-3">
        <p className="text-center">
          © 2026 {t.copyright}
        </p>
        <p className="uppercase tracking-widest text-center">
          {t.references}: KEMENDIKBUD | KEMENPPPA | DINAS PENDIDIKAN JABAR
        </p>
      </div>
    </footer>
  );
}
