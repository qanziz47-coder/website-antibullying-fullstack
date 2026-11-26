
'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";
import { laporanTranslations } from "@/lib/laporan-translations";

import {
  AlertCircle,
  ShieldAlert,
  FileText,
  Copy,
  Check,
  Volume2,
  VolumeX,
} from "lucide-react";

/* =========================================
   TIPE DATA FORMULIR
========================================= */

type FormData = {
  statusDarurat: string;
  kehawatiran: string;
  jenis: string;
  kronologi: string;
  anonim: boolean;
  nama: string;
  namaSekolah: string;
  nomorTelepon: string;
  sembunyikanSekolah: boolean;
};

/* =========================================
   BAHASA SUARA
========================================= */

const VOICE_LANGUAGES: Record<string, string> = {
  id: "id-ID",
  su: "su-ID",
  en: "en-US",
  ja: "ja-JP",
  es: "es-ES",
};

/* =========================================
   PENJELASAN SUARA
========================================= */

const PENJELASAN_SUARA: Record<string, Record<number, string>> = {
  id: {
    1: "Apakah kamu dalam keadaan darurat? Pilih Darurat jika kamu atau seseorang sedang menghadapi ancaman keselamatan atau membutuhkan pertolongan segera. Pilih Tidak jika kejadian yang ingin dilaporkan tidak membutuhkan pertolongan darurat saat ini. Jika kamu merasa tidak aman, utamakan mencari bantuan dari orang dewasa tepercaya atau layanan darurat setempat.",
    2: "Pada langkah ini, pilih tingkat kekhawatiran yang paling sesuai dengan keadaanmu. Pilih Sedikit jika kekhawatiranmu ringan, Cukup jika kamu merasa cukup terganggu, atau Sangat jika situasinya terasa sangat mengkhawatirkan.",
    3: "Pada langkah ini, pilih jenis perundungan yang ingin kamu laporkan. Verbal berkaitan dengan ucapan yang menyakiti. Fisik berkaitan dengan tindakan terhadap tubuh. Sosial berkaitan dengan pengucilan. Cyberbullying terjadi melalui internet atau media digital.",
    4: "Ceritakan kejadian yang ingin kamu laporkan. Kamu bisa menjelaskan apa yang terjadi, kapan dan di mana kejadian berlangsung, serta siapa saja yang terlibat jika kamu mengetahuinya. Ceritakan sesuai yang kamu ketahui.",
    5: "Pada langkah ini, kamu dapat mengatur identitas dan informasi kontak. Sembunyikan Identitas jika ingin mengirim laporan secara anonim. Sembunyikan Nama Sekolah jika tidak ingin nama sekolah dicantumkan. Nomor telepon bersifat opsional.",
    6: "Ini adalah tahap pemeriksaan laporan. Periksa kembali informasi yang kamu masukkan. Jika ada informasi yang kurang tepat, kembali ke langkah sebelumnya untuk memperbaikinya.",
    7: "Kamu sudah sampai di tahap akhir. Jika semua informasi sudah benar, tekan tombol Kirim Laporan Sekarang. Setelah laporan berhasil diterima, simpan kode tiket yang muncul untuk memeriksa status laporan.",
  },

  su: {
    1: "Anjeun dina kaayaan darurat? Pilih Darurat upami anjeun atanapi batur peryogi bantosan langsung. Upami anjeun ngarasa teu aman, geura milarian pitulung ti sawawa anu dipercaya atanapi jasa darurat lokal.",
    2: "Dina léngkah ieu, pilih tingkat hariwang anu paling ngajelaskeun kaayaan anjeun. Pilih Rada, Sedeng, atanapi Kacida luyu sareng kaayaan anjeun.",
    3: "Dina léngkah ieu, pilih jinis bullying anu anjeun hoyong laporkeun. Verbal patali jeung kecap anu nyeri. Fisik patali jeung tindakan kana awak. Sosial patali jeung pangaluaran. Cyberbullying lumangsung ngaliwatan internét.",
    4: "Tuliskeun kajadian nu rék dilaporkeun. Anjeun tiasa ngajelaskeun naon anu kajantenan, iraha sareng dimana éta lumangsung, sareng saha anu kalibet upami anjeun terang.",
    5: "Dina léngkah ieu, anjeun tiasa nyetél idéntitas sareng inpormasi kontak. Sumputkeun idéntitas upami hoyong ngirim laporan sacara anonim. Nomer telepon nyaéta pilihan.",
    6: "Ieu tahap pamariksaan laporan. Pariksa deui inpormasi anu anjeun lebetkeun. Upami aya inpormasi anu teu akurat, uih deui ka léngkah sateuacana pikeun ngabenerkeunana.",
    7: "Anjeun parantos ngahontal tahap ahir. Upami sadaya inpormasi leres, klik tombol Kirim Laporan Ayeuna. Simpen kodeu tikét pikeun mariksa status laporan.",
  },

  en: {
    1: "Are you in an emergency? Choose Emergency if you or someone else is facing a safety threat or needs immediate help. If you feel unsafe, seek help from a trusted adult or local emergency services.",
    2: "In this step, choose the level of worry that best describes your situation. Choose Slightly, Moderately, or Very according to how you feel.",
    3: "In this step, choose the type of bullying you want to report. Verbal relates to hurtful words. Physical relates to actions against the body. Social relates to exclusion. Cyberbullying occurs through the internet.",
    4: "Tell us what happened. You can explain when and where the incident occurred and who was involved if you know. Share only what you feel comfortable sharing.",
    5: "In this step, you can set your identity and contact information. Hide your identity to submit anonymously. Hide your school name if you do not want it listed. Phone number is optional.",
    6: "This is the report review stage. Double-check the information you entered. If anything is inaccurate, go back to the previous step to correct it.",
    7: "You have reached the final stage. If all information is correct, click Send Report Now. Save the ticket code to check your report status.",
  },

  ja: {
    1: "緊急事態ですか？あなたや他の人が危険にさらされている場合は、緊急を選択してください。安全でないと感じる場合は、信頼できる大人や地域の緊急サービスに助けを求めてください。",
    2: "このステップでは、あなたの状況に最も合う心配のレベルを選択してください。少し、適度、非常に、から選んでください。",
    3: "報告したいいじめの種類を選択してください。言葉によるもの、身体的なもの、社会的なもの、またはインターネットを通じたいじめがあります。",
    4: "起きたことを教えてください。何が起きたのか、いつ、どこで起きたのか、知っている場合は誰が関与したのかを説明してください。",
    5: "このステップでは、身元と連絡先情報を設定できます。匿名で報告する場合は、身元を隠してください。電話番号は任意です。",
    6: "これは報告内容の確認段階です。入力した情報をもう一度確認してください。間違いがある場合は前のステップに戻って修正してください。",
    7: "最終段階に到達しました。すべての情報が正しい場合は、報告を送信してください。確認用のチケットコードを保存してください。",
  },

  es: {
    1: "¿Estás en una emergencia? Elige Emergencia si tú u otra persona necesitan ayuda inmediata. Si no te sientes seguro, busca ayuda de un adulto de confianza o de los servicios de emergencia locales.",
    2: "En este paso, elige el nivel de preocupación que mejor describa tu situación. Puedes elegir ligeramente, moderadamente o mucho.",
    3: "Selecciona el tipo de acoso que deseas reportar. Puede ser verbal, físico, social o ciberacoso a través de Internet.",
    4: "Cuéntanos qué ocurrió. Puedes explicar cuándo y dónde sucedió y quién estuvo involucrado si lo sabes. Comparte solamente lo que te sientas cómodo contando.",
    5: "En este paso puedes configurar tu identidad y tus datos de contacto. Oculta tu identidad para enviar el informe de forma anónima. El número de teléfono es opcional.",
    6: "Esta es la etapa de revisión del informe. Comprueba la información que ingresaste. Si hay algún error, vuelve al paso anterior para corregirlo.",
    7: "Has llegado a la etapa final. Si toda la información es correcta, envía el informe. Guarda el código de ticket para consultar su estado.",
  },
};

/* =========================================
   RESPONS SUARA SETELAH LANJUTKAN
========================================= */

const FEEDBACK_LANJUT: Record<string, Record<number, string>> = {
  id: {
    1: "Terima kasih sudah memberi tahu kami. Mari kita lanjutkan bersama. Kami akan memandu kamu melalui proses pelaporan ini.",
    2: "Terima kasih sudah menjelaskan tingkat kekhawatiranmu. Perasaan dan keadaanmu penting. Mari kita lanjutkan ke tahap berikutnya.",
    3: "Terima kasih sudah memilih jenis perundungan yang terjadi. Informasi ini membantu kami memahami kejadian yang ingin kamu laporkan.",
    4: "Terima kasih sudah mempercayai kami untuk mendengarkan ceritamu. Kamu tidak harus menghadapi situasi ini sendirian.",
    5: "Terima kasih sudah mengisi informasi identitas dan kontak. Privasi dan keamanan informasi kamu merupakan hal yang penting.",
    6: "Terima kasih sudah memeriksa laporan. Pastikan semua informasi sudah sesuai sebelum melanjutkan.",
  },

  su: {
    1: "Hatur nuhun parantos ngawartosan. Hayu urang teraskeun babarengan. Kami bakal ngabantosan anjeun dina prosés ieu.",
    2: "Hatur nuhun parantos ngajelaskeun tingkat hariwang anjeun. Kaayaan sareng parasaan anjeun penting.",
    3: "Hatur nuhun parantos milih jinis bullying anu kajantenan. Inpormasi ieu ngabantosan kami ngartos kajadianana.",
    4: "Hatur nuhun parantos percanten nyarioskeun carita anjeun. Anjeun teu kedah nyanghareupan ieu nyalira.",
    5: "Hatur nuhun parantos ngeusian inpormasi idéntitas sareng kontak. Kaamanan inpormasi anjeun penting.",
    6: "Hatur nuhun parantos mariksa laporan. Pastikeun sadaya inpormasi parantos leres.",
  },

  en: {
    1: "Thank you for letting us know. Let's continue together. We will guide you through the reporting process.",
    2: "Thank you for sharing how worried you feel. Your feelings and situation matter. Let's continue.",
    3: "Thank you for selecting the type of bullying. This information helps us understand the incident.",
    4: "Thank you for trusting us with your story. You do not have to face this situation alone.",
    5: "Thank you for providing your identity and contact preferences. Your privacy matters.",
    6: "Thank you for reviewing your report. Please make sure all information is correct.",
  },

  ja: {
    1: "教えてくれてありがとうございます。一緒に次のステップへ進みましょう。",
    2: "心配な気持ちを教えてくれてありがとうございます。あなたの気持ちは大切です。",
    3: "いじめの種類を選択してくれてありがとうございます。この情報は状況を理解するために役立ちます。",
    4: "あなたの話を聞かせてくれてありがとうございます。一人で抱え込む必要はありません。",
    5: "身元と連絡先の情報を入力してくれてありがとうございます。あなたのプライバシーは大切です。",
    6: "報告内容を確認してくれてありがとうございます。すべての情報を確認してください。",
  },

  es: {
    1: "Gracias por informarnos. Continuemos juntos. Te guiaremos durante el proceso de denuncia.",
    2: "Gracias por compartir cómo te sientes. Tus sentimientos y tu situación son importantes.",
    3: "Gracias por seleccionar el tipo de acoso. Esta información nos ayuda a comprender lo sucedido.",
    4: "Gracias por confiar en nosotros y compartir tu historia. No tienes que afrontar esto a solas.",
    5: "Gracias por proporcionar tus preferencias de identidad y contacto. Tu privacidad es importante.",
    6: "Gracias por revisar tu informe. Comprueba que toda la información sea correcta.",
  },
};

/* =========================================
   KOMPONEN UTAMA
========================================= */

export default function LaporPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pesanSukses, setPesanSukses] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [direction, setDirection] = useState(1);

  const { language } = useLanguage();

  const t =
    laporanTranslations[
      language as keyof typeof laporanTranslations
    ] || laporanTranslations.en;

  const [formData, setFormData] = useState<FormData>({
    statusDarurat: "",
    kehawatiran: "",
    jenis: "",
    kronologi: "",
    anonim: true,
    nama: "",
    namaSekolah: "",
    nomorTelepon: "",
    sembunyikanSekolah: false,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speakingActionRef = useRef<(() => void) | null>(null);

  /* =========================================
     BAHASA TTS
  ========================================= */

  const getVoiceLanguage = () => {
    return VOICE_LANGUAGES[language] || "id-ID";
  };

  /* =========================================
     STOP SUARA
  ========================================= */

  const stopSpeak = () => {
    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = null;
    speakingActionRef.current = null;
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* =========================================
     PEMUTAR SUARA
  ========================================= */

  const playVoice = (
    message: string,
    onFinished?: () => void
  ) => {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      setIsSpeaking(false);
      onFinished?.();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);

    utterance.lang = getVoiceLanguage();
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    let completed = false;

    const finish = () => {
      if (completed) return;

      completed = true;
      setIsSpeaking(false);
      utteranceRef.current = null;
      speakingActionRef.current = null;
      onFinished?.();
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = finish;

    utterance.onerror = (event) => {
      // Jika pengguna menghentikan suara secara manual,
      // jangan pindahkan langkah secara otomatis.
      if (event.error === "canceled" || event.error === "interrupted") {
        setIsSpeaking(false);
        utteranceRef.current = null;
        speakingActionRef.current = null;
        return;
      }

      finish();
    };

    utteranceRef.current = utterance;
    speakingActionRef.current = onFinished || null;

    window.speechSynthesis.speak(utterance);
  };

  /* =========================================
     PANDUAN SUARA PERTANYAAN
  ========================================= */

  const bacakanPenjelasan = () => {
    if (typeof window === "undefined" ||
        !("speechSynthesis" in window)) {
      setError(
        "Browser atau perangkat ini belum mendukung fitur pembaca suara."
      );
      return;
    }

    if (isSpeaking) {
      stopSpeak();
      return;
    }

    const teks =
      PENJELASAN_SUARA[language]?.[step] ||
      PENJELASAN_SUARA.id[step];

    if (!teks) return;

    playVoice(teks);
  };

  /* =========================================
     RESPONS SUARA BERDASARKAN LANGKAH
  ========================================= */

  const getFeedback = () => {
    return (
      FEEDBACK_LANJUT[language]?.[step] ||
      FEEDBACK_LANJUT.id[step] ||
      "Terima kasih sudah memberikan informasi. Mari kita lanjutkan."
    );
  };

  /* =========================================
     LANJUT LANGKAH
  ========================================= */

  const nextStep = () => {
    if (isSpeaking) return;

    setError("");

    // Pertahankan alur bantuan darurat dari kode asli.
    if (step === 1 && formData.statusDarurat === "Darurat") {
      const pesan = encodeURIComponent(
        "Halo SAPA 129, saya membutuhkan bantuan. Mohon arahan lebih lanjut."
      );

      window.open(
        `https://wa.me/628111129129?text=${pesan}`,
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    if (step === 1 && !formData.statusDarurat) return;
    if (step === 2 && !formData.kehawatiran) return;
    if (step === 3 && !formData.jenis) return;
    if (step === 4 && !formData.kronologi.trim()) return;

    if (
      step === 5 &&
      !formData.sembunyikanSekolah &&
      !formData.namaSekolah.trim()
    ) {
      return;
    }

    if (step === 6) {
      setDirection(1);
      setStep(7);
      return;
    }

    const message = getFeedback();

    playVoice(message, () => {
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, 7));
    });
  };

  /* =========================================
     KEMBALI
  ========================================= */

  const prevStep = () => {
    if (isSpeaking) {
      stopSpeak();
    }

    setError("");
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  /* =========================================
     KIRIM LAPORAN
  ========================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    stopSpeak();
    setLoading(true);
    setError("");

    try {
      const res = await api.kirimLaporan({
        nama: formData.anonim ? "Anonim" : formData.nama,
        kontak: formData.nomorTelepon,
        lokasi: formData.sembunyikanSekolah
          ? "Dirahasiakan"
          : formData.namaSekolah,
        jenis: formData.jenis,
        kronologi: formData.kronologi,
        anonim: formData.anonim,
      });

      setPesanSukses(res.tiket);
    } catch (err) {
      setError(
        (err as Error).message || "Gagal mengirim laporan."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     SALIN KODE TIKET
  ========================================= */

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pesanSukses);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(
        "Kode tiket tidak dapat disalin. Silakan salin secara manual."
      );
    }
  };

  /* =========================================
     ANIMASI
  ========================================= */

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  /* =========================================
     TOMBOL PANDUAN SUARA
  ========================================= */

  const tombolPanduanSuara = (
    <button
      type="button"
      onClick={bacakanPenjelasan}
      className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-jabar-green rounded-md font-sans font-bold text-sm hover:bg-emerald-100 transition focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
      aria-pressed={isSpeaking}
      aria-label="Putar atau hentikan panduan suara"
    >
      {isSpeaking ? (
        <VolumeX size={18} />
      ) : (
        <Volume2 size={18} />
      )}
    </button>
  );

  /* =========================================
     HALAMAN SUKSES
  ========================================= */

  if (pesanSukses) {
    return (
      <main className="min-h-screen bg-[#fcfbf7] font-serif text-slate-800 pt-32 pb-12">
        <div className="container mx-auto px-6 max-w-xl mt-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-10 shadow-[8px_8px_0px_#d97706] border-2 border-jabar-green text-center"
          >
            <div className="text-6xl mb-4">📜</div>

            <h2 className="text-3xl font-black text-jabar-green mb-4 uppercase tracking-tighter">
              {t.success.title}
            </h2>

            <p className="text-slate-600 mb-6 font-medium italic">
              {t.success.desc}
            </p>

            <div className="bg-[#fcfbf7] p-4 border-2 border-dashed border-jabar-green text-2xl font-mono font-bold tracking-widest text-jabar-dark mb-8 flex justify-between items-center relative">
              <span className="mx-auto pl-8">
                {pesanSukses}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded border border-gray-200 hover:bg-gray-50 transition text-slate-500 hover:text-jabar-green"
                title={t.success.btnCopy}
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            <Link
              href={`/cek-status?kode=${encodeURIComponent(pesanSukses)}`}
              className="block w-full bg-jabar-green text-white py-4 font-sans font-bold uppercase tracking-widest hover:bg-emerald-900 transition"
            >
              {t.success.btnCheck}
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================
     HALAMAN FORMULIR
  ========================================= */

  return (
    <main className="min-h-screen bg-[#fcfbf7] font-serif text-slate-800 pt-32 pb-12 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#064e3b 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="bg-white border-2 border-jabar-green p-8 md:p-12 shadow-[8px_8px_0px_#d97706] mb-8 relative">

          {/* HEADER */}

          <div className="text-center mb-8 border-b-4 border-double border-jabar-green pb-6">
            <div className="flex justify-center items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-jabar-green uppercase tracking-tighter">
                {t.header.title}
              </h1>
            </div>

            <p className="text-slate-500 font-sans text-sm mt-2">
              {t.header.subtitle}{" "}
              <span className="font-serif text-jabar-gold">
                {t.header.aksara}
              </span>
            </p>
          </div>

          {/* PROGRESS */}

          <div className="mb-8 font-sans">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
              <span>
                {t.progress.replace("{step}", step.toString())}
              </span>

              <span>
                {Math.round((step / 7) * 100)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 h-2 border border-gray-300">
              <motion.div
                className="bg-jabar-green h-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 7) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >

                {/* STEP 1: DARURAT */}

                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-2xl font-bold text-jabar-green">
                        {t.step1.title}{" "}
                        <span className="text-red-500">*</span>
                      </h2>

                      {tombolPanduanSuara}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            statusDarurat: "Darurat",
                          })
                        }
                        className={`cursor-pointer p-6 border-2 transition-all flex flex-col items-center justify-center ${
                          formData.statusDarurat === "Darurat"
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-white hover:border-red-300 hover:bg-red-50/50"
                        }`}
                      >
                        <img
                          src="/img/alarm.webp"
                          alt=""
                          className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove("hidden");
                          }}
                        />

                        <div className="hidden text-red-500 mb-4">
                          <AlertCircle className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
                        </div>

                        <h3 className="font-black text-xl text-red-600 mb-1">
                          {t.step1.daruratTitle}
                        </h3>

                        <p className="text-xs text-center text-slate-500 mt-1">
                          {t.step1.daruratDesc}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            statusDarurat: "Tidak",
                          })
                        }
                        className={`cursor-pointer p-6 border-2 transition-all flex flex-col items-center justify-center ${
                          formData.statusDarurat === "Tidak"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-300 bg-white hover:border-yellow-300 hover:bg-yellow-50/50"
                        }`}
                      >
                        <img
                          src="/img/worried.webp"
                          alt=""
                          className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove("hidden");
                          }}
                        />

                        <div className="hidden text-yellow-500 mb-4">
                          <ShieldAlert className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
                        </div>

                        <h3 className="font-black text-xl text-yellow-600 mb-1">
                          {t.step1.tidakTitle}
                        </h3>

                        <p className="text-xs text-center text-slate-500 mt-1">
                          {t.step1.tidakDesc}
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: TINGKAT KEKHAWATIRAN */}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-2xl font-bold text-jabar-green">
                        {t.step2.title}{" "}
                        <span className="text-red-500">*</span>
                      </h2>

                      {tombolPanduanSuara}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                      {[
                        {
                          val: "Sedikit",
                          img: "/img/bit-worried.webp",
                          bg: "bg-blue-50",
                          border: "border-blue-500",
                          text: "text-blue-700",
                          data: t.step2.options.sedikit,
                        },
                        {
                          val: "Cukup",
                          img: "/img/worried.webp",
                          bg: "bg-yellow-50",
                          border: "border-yellow-500",
                          text: "text-yellow-700",
                          data: t.step2.options.cukup,
                        },
                        {
                          val: "Sangat",
                          img: "/img/fear.webp",
                          bg: "bg-red-50",
                          border: "border-red-500",
                          text: "text-red-700",
                          data: t.step2.options.sangat,
                        },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.val}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              kehawatiran: item.val,
                            })
                          }
                          className={`cursor-pointer p-6 border-2 transition-all flex flex-col items-center justify-center text-center ${
                            formData.kehawatiran === item.val
                              ? `${item.border} ${item.bg}`
                              : "border-gray-300 bg-white hover:border-emerald-400"
                          }`}
                        >
                          <img
                            src={item.img}
                            alt=""
                            className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4"
                          />

                          <h3 className={`font-black text-lg ${item.text} mb-1`}>
                            {item.data.title}
                          </h3>

                          <p className="text-xs text-slate-600">
                            {item.data.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: JENIS PERUNDUNGAN */}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-2xl font-bold text-jabar-green">
                        {t.step3.title}{" "}
                        <span className="text-red-500">*</span>
                      </h2>

                      {tombolPanduanSuara}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      {[
                        {
                          val: "Verbal",
                          img: "/img/verbal.png",
                          bg: "bg-purple-50",
                          border: "border-purple-500",
                          text: "text-purple-700",
                          label: t.step3.verbal,
                        },
                        {
                          val: "Fisik",
                          img: "/img/fisik.png",
                          bg: "bg-orange-50",
                          border: "border-orange-500",
                          text: "text-orange-700",
                          label: t.step3.fisik,
                        },
                        {
                          val: "Sosial",
                          img: "/img/sosical.png",
                          bg: "bg-green-50",
                          border: "border-green-500",
                          text: "text-green-700",
                          label: t.step3.sosial,
                        },
                        {
                          val: "Cyberbullying",
                          img: "/img/cyber.png",
                          bg: "bg-blue-50",
                          border: "border-blue-500",
                          text: "text-blue-700",
                          label: t.step3.cyber,
                        },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.val}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              jenis: item.val,
                            })
                          }
                          className={`cursor-pointer p-6 border-2 flex items-center gap-4 transition-all ${
                            formData.jenis === item.val
                              ? `${item.border} ${item.bg}`
                              : "border-gray-300 bg-white hover:border-emerald-400"
                          }`}
                        >
                          <img
                            src={item.img}
                            alt=""
                            className="w-12 h-12 md:w-16 md:h-16 object-contain"
                          />

                          <h3 className={`font-black text-xl ${item.text}`}>
                            {item.label}
                          </h3>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: KRONOLOGI */}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-2xl font-bold text-jabar-green">
                        {t.step4.title}{" "}
                        <span className="text-red-500">*</span>
                      </h2>

                      {tombolPanduanSuara}
                    </div>

                    <p className="text-sm text-slate-600 font-sans">
                      {t.step4.desc}
                    </p>

                    <textarea
                      value={formData.kronologi}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kronologi: e.target.value,
                        })
                      }
                      rows={6}
                      placeholder={t.step4.placeholder}
                      className="w-full p-4 border-2 border-gray-300 focus:border-jabar-green outline-none transition-all text-slate-700 font-sans bg-[#fcfbf7]"
                    />
                  </div>
                )}

                {/* STEP 5: IDENTITAS DAN KONTAK */}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-2xl font-bold text-jabar-green">
                        {t.step5.title}
                      </h2>

                      {tombolPanduanSuara}
                    </div>

                    <div className="bg-[#fcfbf7] p-5 border border-gray-300 mb-4 space-y-4 font-sans">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.anonim}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anonim: e.target.checked,
                            })
                          }
                          className="w-5 h-5 accent-jabar-green"
                        />

                        <div>
                          <span className="font-bold text-slate-800">
                            {t.step5.anonimLabel}
                          </span>

                          <p className="text-xs text-slate-500">
                            {t.step5.anonimDesc}
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer border-t border-gray-300 pt-4">
                        <input
                          type="checkbox"
                          checked={formData.sembunyikanSekolah}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sembunyikanSekolah: e.target.checked,
                            })
                          }
                          className="w-5 h-5 accent-jabar-green"
                        />

                        <div>
                          <span className="font-bold text-slate-800">
                            {t.step5.sekolahLabel}
                          </span>

                          <p className="text-xs text-slate-500">
                            {t.step5.sekolahDesc}
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                      {!formData.sembunyikanSekolah && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          <label className="block font-bold text-slate-700 mb-2">
                            {t.step5.namaSekolahLabel}
                          </label>

                          <input
                            type="text"
                            value={formData.namaSekolah}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                namaSekolah: e.target.value,
                              })
                            }
                            placeholder={t.step5.namaSekolahPlaceholder}
                            className="w-full p-3 border-2 border-gray-300 focus:border-jabar-green outline-none transition-all bg-[#fcfbf7]"
                          />
                        </motion.div>
                      )}

                      <div>
                        <label className="block font-bold text-slate-700 mb-2">
                          {t.step5.teleponLabel}
                        </label>

                        <input
                          type="tel"
                          value={formData.nomorTelepon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nomorTelepon: e.target.value,
                            })
                          }
                          placeholder={t.step5.teleponPlaceholder}
                          className="w-full p-3 border-2 border-gray-300 focus:border-jabar-green outline-none transition-all bg-[#fcfbf7]"
                        />
                      </div>
                    </div>

                    {!formData.anonim && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="font-sans"
                      >
                        <label className="block font-bold text-slate-700 mb-2 mt-4">
                          {t.step5.namaLabel}
                        </label>

                        <input
                          type="text"
                          value={formData.nama}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nama: e.target.value,
                            })
                          }
                          placeholder={t.step5.namaPlaceholder}
                          className="w-full p-3 border-2 border-gray-300 focus:border-jabar-green outline-none transition-all bg-[#fcfbf7]"
                        />
                      </motion.div>
                    )}
                  </div>
                )}

                {/* STEP 6: KONFIRMASI */}

                {step === 6 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-2xl font-bold text-jabar-green">
                        {t.step6.title}
                      </h2>

                      {tombolPanduanSuara}
                    </div>

                    <p className="text-slate-500 font-sans text-sm mb-4">
                      {t.step6.desc}
                    </p>

                    <div className="bg-[#fcfbf7] border-2 border-dashed border-jabar-green p-6 space-y-4 font-sans text-sm">
                      <div className="flex justify-between border-b border-gray-300 pb-2 gap-4">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">
                          {t.step6.status}
                        </span>

                        <span className="font-bold text-slate-800">
                          {formData.statusDarurat}
                        </span>
                      </div>

                      <div className="flex justify-between border-b border-gray-300 pb-2 gap-4">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">
                          {t.step6.khawatir}
                        </span>

                        <span className="font-bold text-slate-800">
                          {formData.kehawatiran}
                        </span>
                      </div>

                      <div className="flex justify-between border-b border-gray-300 pb-2 gap-4">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">
                          {t.step6.jenis}
                        </span>

                        <span className="font-bold text-slate-800">
                          {formData.jenis}
                        </span>
                      </div>

                      <div className="flex justify-between border-b border-gray-300 pb-2 gap-4">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">
                          {t.step6.sekolah}
                        </span>

                        <span className="font-bold text-slate-800">
                          {formData.sembunyikanSekolah
                            ? t.step6.rahasia
                            : formData.namaSekolah || "-"}
                        </span>
                      </div>

                      <div className="flex justify-between border-b border-gray-300 pb-2 gap-4">
                        <span className="text-slate-500 uppercase tracking-wider font-bold">
                          {t.step6.identitas}
                        </span>

                        <span className="font-bold text-slate-800">
                          {formData.anonim
                            ? t.step6.anonimText
                            : `👤 ${formData.nama || t.step6.tanpaNama}`}
                        </span>
                      </div>

                      <div className="pt-2">
                        <span className="text-slate-500 uppercase tracking-wider font-bold block mb-2">
                          {t.step6.kronologi}
                        </span>

                        <p className="text-slate-800 bg-white p-3 border border-gray-300 font-serif italic whitespace-pre-wrap">
                          {formData.kronologi}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: KIRIM LAPORAN */}

                {step === 7 && (
                  <div className="space-y-6 text-center py-10">
                    <div className="text-6xl mb-4">🖋️</div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
                      <h2 className="text-3xl font-black text-jabar-green uppercase tracking-tighter">
                        {t.step7.title}
                      </h2>

                      {tombolPanduanSuara}
                    </div>

                    <p className="text-slate-500 max-w-md mx-auto font-sans">
                      {t.step7.desc}
                    </p>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* STATUS SUARA */}

            {isSpeaking && (
              <div
                aria-live="polite"
                className="mt-5 flex items-center gap-3 text-sm text-jabar-green bg-emerald-50 border border-emerald-100 p-3 font-sans"
              >
                <Volume2 size={18} className="animate-pulse" />

                <span>
                  {language === "en"
                    ? "Voice assistant is speaking..."
                    : language === "ja"
                    ? "音声ガイドを再生しています..."
                    : language === "es"
                    ? "La guía de voz está hablando..."
                    : language === "su"
                    ? "Sora pituduh keur diputer..."
                    : "Suara pendamping sedang diputar..."}
                </span>

                <button
                  type="button"
                  onClick={stopSpeak}
                  className="ml-auto text-xs font-bold underline"
                >
                  {language === "en"
                    ? "Stop"
                    : language === "ja"
                    ? "停止"
                    : language === "es"
                    ? "Detener"
                    : language === "su"
                    ? "Eureun"
                    : "Hentikan"}
                </button>
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="mt-4 p-4 bg-red-50 border-l-4 border-red-800 text-red-800 text-sm font-bold font-sans"
              >
                {error}
              </div>
            )}

            {/* NAVIGASI */}

            <div className="mt-10 flex gap-4 font-sans border-t border-gray-300 pt-6">
              {step > 1 && step < 7 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSpeaking}
                  className="px-6 py-3 font-bold text-slate-600 bg-gray-200 hover:bg-gray-300 transition uppercase tracking-widest text-sm disabled:opacity-50"
                >
                  {t.btnBack}
                </button>
              )}

              {step < 6 && (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    isSpeaking ||
                    (step === 1 && !formData.statusDarurat) ||
                    (step === 2 && !formData.kehawatiran) ||
                    (step === 3 && !formData.jenis) ||
                    (step === 4 && formData.kronologi.trim() === "") ||
                    (step === 5 &&
                      !formData.sembunyikanSekolah &&
                      formData.namaSekolah.trim() === "")
                  }
                  className="flex-1 bg-jabar-green text-white py-3 font-bold uppercase tracking-widest hover:bg-emerald-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {t.btnNext}
                </button>
              )}

              {step === 6 && (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isSpeaking}
                  className="flex-1 bg-jabar-gold text-jabar-dark py-3 font-bold uppercase tracking-widest hover:bg-yellow-500 transition disabled:opacity-50"
                >
                  {t.btnConfirm}
                </button>
              )}

              {step === 7 && (
                <button
                  type="submit"
                  disabled={loading || isSpeaking}
                  className="flex-1 bg-jabar-green text-white py-4 font-black text-lg uppercase tracking-widest hover:bg-emerald-900 transition disabled:bg-gray-400 shadow-md"
                >
                  {loading ? t.btnLoading : t.btnSubmit}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PANDUAN BANTUAN */}

        <div className="bg-white border border-gray-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src="/what.gif"
              alt=""
              className="w-16 h-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />

            <div className="hidden w-16 h-16 bg-gray-100 items-center justify-center rounded-full">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>

            <div>
              <h4 className="font-bold text-slate-800 font-serif text-lg">
                {t.help.title}
              </h4>

              <p className="text-sm text-slate-500 font-sans max-w-md">
                {t.help.desc}
              </p>
            </div>
          </div>

          <Link
            href="/panduan"
            className="px-6 py-3 border-2 border-jabar-green text-jabar-green font-bold font-sans uppercase tracking-widest text-sm hover:bg-jabar-green hover:text-white transition whitespace-nowrap flex items-center justify-center"
          >
            {t.help.btn}
          </Link>
        </div>
      </div>
    </main>
  );
}
