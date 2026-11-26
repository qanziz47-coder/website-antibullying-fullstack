
'use client';

import { useEffect, useState } from 'react';
import {
  BookOpen,
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  UserRound,
  FileText,
  ShieldCheck,
  Send,
  Info,
} from 'lucide-react';

import { useLanguage } from '@/lib/LanguageContext';

const guideTranslations = {
  id: {
    help: 'Mengalami Kesulitan?',
    helpDesc: 'Apabila kamu merasa bingung atau mengalami kendala saat mengisi form, silakan klik tombol panduan.',
    button: 'LIHAT PANDUAN',
    staticTitle: 'Langkah-Langkah Pengisian',
    staticDesc: 'Panduan singkat untuk membantu proses pengisian formulir.',
    modalLabel: 'PANDUAN PENGGUNA',
    modalTitle: 'Cara Mengisi Formulir',
    steps: [
      ['Buka Halaman Formulir', 'Pilih menu Angket atau Buat Laporan sesuai dengan kebutuhanmu.'],
      ['Lengkapi Data Diri', 'Masukkan informasi yang diminta pada formulir dengan benar dan sesuai keadaan sebenarnya.'],
      ['Isi Formulir', 'Baca setiap pertanyaan dengan teliti, kemudian pilih atau masukkan jawaban yang sesuai.'],
      ['Periksa Kembali', 'Pastikan seluruh informasi sudah lengkap dan tidak ada kesalahan sebelum melanjutkan.'],
      ['Kirim Formulir', 'Klik tombol kirim dan tunggu hingga muncul pemberitahuan bahwa proses berhasil.'],
    ],
    previous: 'SEBELUMNYA',
    next: 'SELANJUTNYA',
    finish: 'SELESAI',
    step: 'LANGKAH',
    of: 'DARI',
    tip: 'Pastikan koneksi internet stabil dan periksa kembali informasi sebelum mengirim formulir.',
    footer: 'JABAR BEBAS BULLYING',
  },
  su: {
    help: 'Ngaraos Kasulitan?',
    helpDesc: 'Upami bingung atanapi aya kendala nalika ngeusian formulir, mangga klik tombol pituduh.',
    button: 'TINGALI PANDUAN',
    staticTitle: 'Léngkah-Léngkah Ngeusian',
    staticDesc: 'Pituduh singget pikeun ngabantu ngeusian formulir.',
    modalLabel: 'PANDUAN PANGGUNA',
    modalTitle: 'Cara Ngeusian Formulir',
    steps: [
      ['Buka Halaman Formulir', 'Pilih ménu Angket atanapi Jieun Laporan saluyu sareng kabutuhan.'],
      ['Lengkepan Data Diri', 'Lebetkeun inpormasi anu dipénta kalayan leres.'],
      ['Eusian Formulir', 'Baca unggal patarosan kalayan taliti, teras pilih jawaban anu luyu.'],
      ['Pariksa Deui', 'Pastikeun sadaya inpormasi parantos lengkep sareng leres.'],
      ['Kirim Formulir', 'Klik tombol kirim sareng antosan dugi aya béwara hasilna.'],
    ],
    previous: 'SAMÉMÉHNA',
    next: 'SALAJENGNA',
    finish: 'RÉNGSÉ',
    step: 'LÉNGKAH',
    of: 'TI',
    tip: 'Pastikeun internét stabil sareng pariksa deui inpormasi sateuacan ngirim.',
    footer: 'JABAR BEBAS BULLYING',
  },
  en: {
    help: 'Need Assistance?',
    helpDesc: 'If you are confused or experience difficulties filling out the form, please click the guide button.',
    button: 'VIEW GUIDE',
    staticTitle: 'Filling Instructions',
    staticDesc: 'A short guide to help you complete the form.',
    modalLabel: 'USER GUIDE',
    modalTitle: 'How to Fill Out the Form',
    steps: [
      ['Open the Form Page', 'Select the Survey or Make a Report menu according to your needs.'],
      ['Complete Your Details', 'Enter the requested information accurately.'],
      ['Fill Out the Form', 'Read each question carefully and select or enter the appropriate answer.'],
      ['Review Your Answers', 'Make sure all information is complete and correct.'],
      ['Submit the Form', 'Click submit and wait for the success notification.'],
    ],
    previous: 'PREVIOUS',
    next: 'NEXT',
    finish: 'FINISH',
    step: 'STEP',
    of: 'OF',
    tip: 'Make sure your internet connection is stable and review your information before submitting.',
    footer: 'JABAR BEBAS BULLYING',
  },
  ja: {
    help: 'お困りですか？',
    helpDesc: 'フォームの入力で困った場合は、ガイドボタンをクリックしてください。',
    button: 'ガイドを見る',
    staticTitle: '入力手順',
    staticDesc: 'フォーム入力をサポートする簡単なガイドです。',
    modalLabel: 'ユーザーガイド',
    modalTitle: 'フォームの入力方法',
    steps: [
      ['フォームページを開く', 'アンケートまたは報告メニューを選択してください。'],
      ['個人情報を入力する', '必要な情報を正確に入力してください。'],
      ['フォームに回答する', '質問をよく読み、適切な回答を選択してください。'],
      ['内容を確認する', 'すべての情報が正しく入力されているか確認してください。'],
      ['フォームを送信する', '送信ボタンをクリックし、完了通知をお待ちください。'],
    ],
    previous: '戻る',
    next: '次へ',
    finish: '完了',
    step: 'ステップ',
    of: '/',
    tip: '安定したインターネット接続を確認し、送信前に内容を確認してください。',
    footer: 'JABAR BEBAS BULLYING',
  },
  es: {
    help: '¿Necesitas ayuda?',
    helpDesc: 'Si tienes dudas o dificultades al completar el formulario, haz clic en el botón de guía.',
    button: 'VER GUÍA',
    staticTitle: 'Pasos para completar',
    staticDesc: 'Una guía breve para ayudarte a completar el formulario.',
    modalLabel: 'GUÍA DEL USUARIO',
    modalTitle: 'Cómo completar el formulario',
    steps: [
      ['Abrir el formulario', 'Selecciona la opción Encuesta o Crear Informe según tus necesidades.'],
      ['Completar tus datos', 'Introduce correctamente la información solicitada.'],
      ['Responder el formulario', 'Lee cada pregunta atentamente y selecciona la respuesta adecuada.'],
      ['Revisar la información', 'Comprueba que toda la información esté completa y sea correcta.'],
      ['Enviar el formulario', 'Haz clic en enviar y espera la notificación de éxito.'],
    ],
    previous: 'ANTERIOR',
    next: 'SIGUIENTE',
    finish: 'FINALIZAR',
    step: 'PASO',
    of: 'DE',
    tip: 'Asegúrate de tener una conexión estable y revisa la información antes de enviarla.',
    footer: 'JABAR BEBAS BULLYING',
  },
};

const stepIcons = [
  ClipboardList,
  UserRound,
  FileText,
  ShieldCheck,
  Send,
];

export default function HelpGuide() {
  const { language } = useLanguage();

  const t =
    guideTranslations[language as keyof typeof guideTranslations] ??
    guideTranslations.id;

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = t.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const Icon = stepIcons[currentStep];
  const step = t.steps[currentStep];

  const closeModal = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <section className="w-full space-y-5">

        {/* ================= KARTU BANTUAN ================= */}

        <div className="relative overflow-hidden bg-white border border-gray-200 shadow-sm
        flex flex-col sm:flex-row items-center gap-5 p-6 sm:p-7">

          <div className="absolute top-0 right-0 w-32 h-32
          bg-red-50 rounded-bl-full opacity-60 pointer-events-none" />

          <div className="relative shrink-0">
            <div className="w-16 h-16 flex items-center justify-center
            bg-red-50 text-red-700 rounded-full">
              <Info size={34} strokeWidth={1.7} />
            </div>

            <span className="absolute -top-2 -right-1 text-red-600 text-2xl font-bold">
              ?
            </span>
          </div>

          <div className="relative flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-red-800">
              {t.help}
            </h2>

            <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-2xl">
              {t.helpDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative group shrink-0 flex items-center justify-center gap-3
            border-2 border-red-700 text-red-700 px-7 py-3.5
            text-xs font-bold tracking-widest
            hover:bg-red-700 hover:text-white
            transition-all duration-300 w-full sm:w-auto"
          >
            <BookOpen size={19} />
            {t.button}
            <ArrowRight size={16}
              className="group-hover:translate-x-1 transition-transform" />
          </button>

        </div>


        {/* ================= PANDUAN STATIS ================= */}

        <div className="bg-white border border-gray-200 shadow-sm p-5 sm:p-7">

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-50 text-red-700
            flex items-center justify-center shrink-0">
              <BookOpen size={25} />
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-red-800">
                {t.staticTitle}
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {t.staticDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {t.steps.map((item, index) => {
              const ItemIcon = stepIcons[index];

              return (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4
                  bg-gray-50 border border-gray-100
                  hover:bg-red-50/50 hover:border-red-100
                  transition-all duration-300"
                >
                  <div className="w-12 h-12 shrink-0 flex items-center
                  justify-center bg-red-100 text-red-700
                  font-serif font-bold text-lg
                  group-hover:bg-red-700 group-hover:text-white
                  transition-all duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <ItemIcon size={16} className="text-red-700 shrink-0" />

                      <h3 className="text-sm font-bold text-gray-800">
                        {item[0]}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item[1]}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="mt-6 flex items-start gap-3 p-4
          bg-red-50 border-l-4 border-red-600">

            <Info size={18} className="text-red-700 shrink-0 mt-0.5" />

            <p className="text-xs text-gray-600 leading-relaxed">
              {t.tip}
            </p>

          </div>

        </div>
      </section>


      {/* ================= MODAL PANDUAN ================= */}

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center
          justify-center bg-black/60 backdrop-blur-sm p-4
          animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.modalTitle}
            className="relative w-full max-w-xl bg-white
            shadow-2xl rounded-2xl overflow-hidden
            animate-in zoom-in-95 fade-in duration-200"
          >

            {/* HEADER */}

            <div className="relative overflow-hidden bg-gradient-to-r
            from-red-800 via-red-700 to-red-600 px-6 py-6 sm:px-8">

              <div className="absolute -right-8 -top-12 w-44 h-44
              border-[25px] border-white/5 rounded-full" />

              <div className="absolute right-20 -bottom-20 w-36 h-36
              border-[20px] border-white/5 rounded-full" />

              <div className="relative flex items-center gap-4 pr-8">

                <div className="w-14 h-14 bg-white text-red-700
                rounded-full flex items-center justify-center shrink-0">
                  <BookOpen size={29} />
                </div>

                <div className="border-l border-white/40 pl-4">
                  <p className="text-[10px] sm:text-xs tracking-[0.25em]
                  font-bold text-red-100 mb-1">
                    {t.modalLabel}
                  </p>

                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    {t.modalTitle}
                  </h2>
                </div>

              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-4 right-4 text-white/80
                hover:text-white hover:bg-white/15 p-2 rounded-full
                transition-all"
              >
                <X size={22} />
              </button>

            </div>


            {/* PROGRESS BAR */}

            <div className="px-6 sm:px-8 pt-6">

              <div className="flex justify-between items-center mb-3">

                <span className="text-xs sm:text-sm font-bold text-red-800">
                  {t.step} {currentStep + 1} {t.of} {totalSteps}
                </span>

                <span className="text-xs font-bold text-red-700">
                  {Math.round(progress)}%
                </span>

              </div>

              <div className="h-2.5 bg-red-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-800 to-red-500
                  rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>


            {/* CONTENT */}

            <div className="px-6 sm:px-10 py-7 sm:py-9">

              <div className="flex flex-col items-center text-center">

                {/* ICON */}

                <div className="relative w-32 h-28 flex items-center
                justify-center bg-red-50 rounded-3xl mb-5">

                  <div className="absolute inset-3 rounded-full
                  border border-red-100" />

                  <Icon
                    size={54}
                    strokeWidth={1.5}
                    className="relative text-red-700"
                  />

                  <div className="absolute -bottom-3 bg-red-700 text-white
                  px-5 py-1.5 rounded-lg font-serif font-bold text-xl shadow-md">
                    {String(currentStep + 1).padStart(2, '0')}
                  </div>

                </div>


                <p className="text-[10px] tracking-[0.3em]
                text-red-400 font-bold mt-3">
                  {t.step} {currentStep + 1}
                </p>

                <h3
                  key={currentStep}
                  className="font-serif text-xl sm:text-2xl
                  font-bold text-gray-900 mt-2"
                >
                  {step[0]}
                </h3>

                <p
                  key={`desc-${currentStep}`}
                  className="text-sm sm:text-base text-gray-500
                  leading-relaxed max-w-sm mt-3"
                >
                  {step[1]}
                </p>

              </div>


              {/* DOT INDICATOR */}

              <div className="flex items-center justify-center gap-2 mt-8">

                {t.steps.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    aria-label={`Step ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentStep === index
                        ? 'w-8 bg-red-700'
                        : 'w-2.5 bg-gray-200 hover:bg-red-300'
                    }`}
                  />
                ))}

              </div>

            </div>


            {/* FOOTER BUTTONS */}

            <div className="border-t border-gray-100 px-5 sm:px-8 py-5
            flex items-center justify-between gap-3">

              <button
                type="button"
                onClick={() =>
                  setCurrentStep((prev) => Math.max(0, prev - 1))
                }
                disabled={currentStep === 0}
                className="flex items-center justify-center gap-2
                px-3 sm:px-5 py-3 border border-gray-200
                text-gray-600 text-[10px] sm:text-xs font-bold
                hover:bg-gray-50 hover:border-red-200
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-all"
              >
                <ArrowLeft size={15} />
                {t.previous}
              </button>


              {currentStep === totalSteps - 1 ? (

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex items-center justify-center gap-2
                  px-5 sm:px-7 py-3 bg-red-700 text-white
                  text-[10px] sm:text-xs font-bold
                  hover:bg-red-800 transition-all shadow-md"
                >
                  {t.finish}
                  <CheckCircle2 size={16} />
                </button>

              ) : (

                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep((prev) =>
                      Math.min(totalSteps - 1, prev + 1)
                    )
                  }
                  className="flex items-center justify-center gap-2
                  px-5 sm:px-7 py-3 bg-red-700 text-white
                  text-[10px] sm:text-xs font-bold
                  hover:bg-red-800 transition-all shadow-md"
                >
                  {t.next}
                  <ArrowRight size={16} />
                </button>

              )}

            </div>


            {/* FOOTER BRAND */}

            <div className="pb-5 flex items-center justify-center gap-4">

              <div className="h-px w-12 bg-gray-200" />

              <p className="text-[9px] sm:text-[10px]
              tracking-[0.2em] font-bold text-gray-400">
                {t.footer}
              </p>

              <div className="h-px w-12 bg-gray-200" />

            </div>

          </div>

        </div>
      )}

    </>
  );
}
