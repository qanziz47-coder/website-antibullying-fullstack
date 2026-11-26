'use client';
import { useState } from 'react';
import { Scale, AlertTriangle, ShieldCheck, BookOpen, PhoneCall, Play, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { useLanguage } from '@/lib/LanguageContext';

// --- KAMUS BAHASA UNTUK HALAMAN HUKUM ---
const hukumTranslations = {
    id: {
        title: "Kitab Hukum",
        aksara: "꧋ꦥꦼꦫ꧀ꦭꦶꦤ꧀ꦢꦸꦔꦤ꧀ꦧꦼꦫꦸꦢꦏ꧀",
        quote: '"Ulah ngalawan kolot, ulah ngalawan guru, tapi ngalawan kudu kana kanyeri"',
        quoteDesc: "(Pahami hukum agar kau bisa melindungi dirimu dan sesama)",
        tabs: { ite: "UU ITE (Siber)", tpks: "UU TPKS", anak: "UU Perlindungan Anak" },
        btnListen: "Dengarkan Penjelasan",
        btnStop: "Hentikan Suara",
        helpTitle: "Butuh Bantuan Segera?",
        helpDesc: "Jika Anda atau teman Anda dalam bahaya, jangan ragu untuk menghubungi layanan perlindungan anak dan perempuan. Kami siap mendengarkan.",
        btnSapa: "Hubungi SAPA 129",
        btnPolisi: "Polisi (110)",
        tts: {
            ite: "Ini adalah penjelasan UU ITE. Catatan penting: Pasal 46 UU ITE mengatur tentang akses ilegal atau peretasan, bukan perundungan. Untuk kasus perundungan siber, gunakan Pasal 27A tentang pencemaran nama baik, Pasal 28 ayat 2 tentang ujaran kebencian, Pasal 29 tentang ancaman kekerasan elektronik dan pasal 46 Akses ilegal ke sistem komputer atau Peretasan.",
            tpks: "Ini adalah penjelasan UU TPKS Nomor 12 Tahun 2022. Undang-undang ini mengatur berbagai jenis kekerasan seksual, termasuk pelecehan nonfisik dan fisik. Khusus untuk kekerasan seksual berbasis elektronik diatur dalam Pasal 14, yang melarang perekaman tanpa izin dan penyebaran konten bermuatan seksual. Hukumannya bisa mencapai 6 tahun penjara jika disertai pemerasan.",
            anak: "Ini adalah penjelasan UU Perlindungan Anak Nomor 35 Tahun 2014. Anak adalah seseorang yang belum berusia 18 tahun. Pasal 76C secara tegas melarang segala bentuk kekerasan terhadap anak. Pelanggar dapat diancam pidana penjara maksimal 3 tahun 6 bulan dan denda maksimal 72 juta rupiah."
        },
        content: {
            ite: {
                warningTitle: "Catatan Penting: Miskonsepsi Pasal 46",
                warningDesc: "Pasal 46 UU ITE mengatur tentang akses ilegal (hacking/peretasan), bukan perundungan. Untuk kasus perundungan siber, gunakan Pasal 27A, 28 ayat (2), dan 29.",
                tableHeader: ["Pasal", "Isi Ketentuan", "Ancaman Hukuman"],
                tableRows: [
                    { pasal: "Pasal 27A", isi: "Pencemaran nama baik melalui sistem elektronik.", hukuman: "Maks. 2 Tahun / Denda Rp400 Juta" },
                    { pasal: "Pasal 28 (2)", isi: "Ujaran kebencian berdasarkan SARA.", hukuman: "Maks. 4 Tahun / Denda Rp750 Juta" },
                    { pasal: "Pasal 29", isi: "Mengirimkan ancaman kekerasan atau intimidasi elektronik.", hukuman: "Maks. 4 Tahun / Denda Rp750 Juta" },
                    { pasal: "Pasal 46", isi: "Akses ilegal ke sistem komputer (Peretasan). (Bukan pasal bullying)", hukuman: "Maks. 6 Tahun / Denda Rp600 Juta", isWarning: true }
                ]
            },
            tpks: {
                title: "UU No. 12 Tahun 2022 tentang TPKS",
                pasal4: {
                    title: "Pasal 4: Jenis Kekerasan Seksual",
                    desc: "Tindak Pidana Kekerasan Seksual meliputi:",
                    list: ["Pelecehan seksual nonfisik & fisik", "Pemaksaan kontrasepsi & sterilisasi", "Pemaksaan perkawinan", "Penyiksaan seksual", "Eksploitasi seksual", "Perbudakan seksual", "Kekerasan seksual berbasis elektronik", "Perkosaan & perbuatan cabul", "Pornografi & pemaksaan pelacuran", "Kekerasan seksual dalam rumah tangga"]
                },
                pasal56: {
                    title: "Pasal 5 & 6: Pelecehan Seksual",
                    p1: "Pasal 5 (Nonfisik): Perbuatan seksual nonfisik yang merendahkan martabat (misal: siulan, komentar cabul). Ancaman: Penjara maks. 9 bulan / Denda Rp10 juta.",
                    p2: "Pasal 6 (Fisik): Perbuatan seksual fisik yang merendahkan martabat. Ancaman: Penjara maks. 4 tahun / Denda Rp50 juta. Jika dengan kekuasaan/penyesatan: Penjara maks. 12 tahun / Denda Rp300 juta."
                },
                pasal14: {
                    title: "Pasal 14: Kekerasan Seksual Berbasis Elektronik",
                    desc: "Setiap orang yang tanpa hak:",
                    list: ["Merekam/mengambil gambar bermuatan seksual tanpa persetujuan.", "Mentransmisikan informasi elektronik bermuatan seksual tanpa kehendak penerima.", "Melakukan penguntitan/pelacakan via sistem elektronik untuk tujuan seksual."],
                    hukuman: "Ancaman: Penjara maks. 4 tahun / Denda Rp200 juta.",
                    hukuman2: "Jika untuk memeras/mengancam: Penjara maks. 6 tahun / Denda Rp300 juta."
                },
                pasal15: {
                    title: "Pasal 15: Pemberatan Hukuman (Ditambah 1/3)",
                    desc: "Pidana ditambah 1/3 jika dilakukan:",
                    list: ["Dalam lingkup keluarga", "Oleh tenaga pendidik/guru", "Terhadap Anak atau Disabilitas", "Terhadap perempuan hamil", "Menggunakan sarana elektronik", "Mengakibatkan luka berat/psikologis"]
                }
            },
            anak: {
                title: "UU No. 35 Tahun 2014 (Perlindungan Anak)",
                pasal1: { title: "Pasal 1 ayat (1): Definisi Anak", desc: "Anak adalah seseorang yang belum berusia 18 (delapan belas) tahun, termasuk anak yang masih dalam kandungan." },
                pasal13: { title: "Pasal 13: Perlindungan dari Diskriminasi", desc: "Setiap anak selama dalam pengasuhan orang tua, wali, atau pihak lain mana pun yang bertanggung jawab atas pengasuhan, berhak mendapat perlindungan dari perlakuan: diskriminasi, eksploitasi (ekonomi & seksual), penelantaran, kekejaman/kekerasan, dan penganiayaan, ketidakadilan, serta perlakuan salah lainnya." },
                pasal76: { title: "Pasal 76C: Larangan Kekerasan", desc: "Setiap Orang dilarang menempatkan, membiarkan, melakukan, menyuruh melakukan, atau turut serta melakukan Kekerasan terhadap Anak.", hukuman: "Ancaman Hukuman: Penjara maks. 3 tahun 6 bulan dan/atau denda maks. Rp72.000.000." },
                pasal80: { title: "Pasal 80: Sanksi Pidana", p1: "Setiap Orang yang melanggar ketentuan sebagaimana dimaksud dalam Pasal 76C dipidana dengan pidana penjara paling lama 3 (tiga) tahun 6 (enam) bulan dan/atau denda paling banyak Rp72.000.000,00 (tujuh puluh dua juta rupiah).", p2: "Jika mengakibatkan mati, dipidana penjara paling lama 15 (lima belas) tahun dan/atau denda paling banyak Rp3.000.000.000,00." },
                pasal59: { title: "Pasal 59: Kewajiban Pemerintah", desc: "Pemerintah, Pemerintah Daerah, dan lembaga negara lainnya berkewajiban dan bertanggung jawab untuk memberikan Perlindungan Khusus kepada Anak. Perlindungan khusus diberikan kepada anak yang berhadapan dengan hukum, anak korban kekerasan (fisik/psikis), anak korban perlakuan salah, dan anak korban penelantaran." }
            }
        }
    },
    su: {
        title: "Kitab Hukum",
        aksara: "꧋ꦥꦼꦫ꧀ꦭꦶꦤ꧀ꦢꦸꦔꦤ꧀ꦧꦼꦫꦸꦢꦏ꧀",
        quote: '"Ulah ngalawan kolot, ulah ngalawan guru, tapi ngalawan kudu kana kanyeri"',
        quoteDesc: "(Pahami hukum sangkan anjeun tiasa nangtayungan diri sareng sasama)",
        tabs: { ite: "UU ITE (Siber)", tpks: "UU TPKS", anak: "UU Perlindungan Anak" },
        btnListen: "Dangukeun Katerangan",
        btnStop: "Hentikan Sora",
        helpTitle: "Peryogi Bantosan Langsung?",
        helpDesc: "Upami anjeun atanapi babaturan anjeun dina bahaya, tong ragu ngahubungi layanan perlindungan anak sareng awéwé. Kami siap ngupingkeun.",
        btnSapa: "Hubungi SAPA 129",
        btnPolisi: "Pulisi (110)",
        tts: {
            ite: "Ieu katerangan ngeunaan UU ITE. Catetan penting: Pasal 46 UU ITE ngatur aksés ilegal atanapi hacking, sanes bullying. Pikeun kasus cyberbullying, gunakeun Pasal 27A ngeunaan fitnah, Pasal 28 ayat 2 ngeunaan ucapan hate, Pasal 29 ngeunaan ancaman kekerasan éléktronik, sareng Pasal 46 ngeunaan aksés ilegal kana sistem komputer atanapi peretasan.",
            tpks: "Ieu katerangan tina Undang-Undang TPKS Nomer 12 Taun 2022. Undang-undang ieu ngatur rupa-rupa kekerasan seksual, diantarana pelecehan non-fisik jeung fisik. Sacara husus, kekerasan seksual dumasar éléktronik diatur dina Pasal 14, nu prohibits ngarekam teu sah jeung distribusi eusi eksplisit séksual. Hukuman bisa nepi ka genep taun panjara lamun dibarengan ku extortion.",
            anak: "Ieu katerangan tina Undang-Undang Perlindungan Anak Nomer 35 Taun 2014. Budak téh saha waé nu umurna dihandap 18. Pasal 76C sacara tegas ngalarang sagala rupa kekerasan ka budak. Nu ngalanggar diancam hukuman panjara maksimal 3 taun 6 bulan sareng denda maksimal 72 juta rupiah."
        },
        content: {
            ite: {
                warningTitle: "Catetan Penting: Miskonsepsi Pasal 46",
                warningDesc: "Pasal 46 UU ITE ngatur ngeunaan aksés ilegal (hacking/peretasan), sanes ririwit. Pikeun kasus ririwit siber, gunakeun Pasal 27A, 28 ayat (2), jeung 29.",
                tableHeader: ["Pasal", "Eusi Ketentuan", "Ancaman Hukuman"],
                tableRows: [
                    { pasal: "Pasal 27A", isi: "Pencemaran ngaran alus ngaliwatan sistem éléktronik.", hukuman: "Maks. 2 Taun / Denda Rp400 Juta" },
                    { pasal: "Pasal 28 (2)", isi: "Ucapan hate dumasar kana SARA.", hukuman: "Maks. 4 Taun / Denda Rp750 Juta" },
                    { pasal: "Pasal 29", isi: "Ngirimkeun ancaman kekerasan atanapi intimidasi éléktronik.", hukuman: "Maks. 4 Taun / Denda Rp750 Juta" },
                    { pasal: "Pasal 46", isi: "Aksés ilegal kana sistem komputer (Peretasan). (Sanes pasal ririwit)", hukuman: "Maks. 6 Taun / Denda Rp600 Juta", isWarning: true }
                ]
            },
            tpks: {
                title: "UU No. 12 Taun 2022 ngeunaan TPKS",
                pasal4: {
                    title: "Pasal 4: Jinis Kekerasan Seksual",
                    desc: "Tindak Pidana Kekerasan Seksual ngawengku:",
                    list: ["Pelecehan seksual nonfisik & fisik", "Pamaksaan kontrasepsi & sterilisasi", "Pamaksaan perkawinan", "Penyiksaan seksual", "Eksploitasi seksual", "Perbudakan seksual", "Kekerasan seksual berbasis éléktronik", "Perkosaan & perbuatan cabul", "Pornografi & pamaksaan pelacuran", "Kekerasan seksual dina rumah tangga"]
                },
                pasal56: {
                    title: "Pasal 5 & 6: Pelecehan Seksual",
                    p1: "Pasal 5 (Nonfisik): Perbuatan seksual nonfisik anu ngahinakeun martabat (contona: siulan, komentar cabul). Ancaman: Panjara maks. 9 bulan / Denda Rp10 juta.",
                    p2: "Pasal 6 (Fisik): Perbuatan seksual fisik anu ngahinakeun martabat. Ancaman: Panjara maks. 4 taun / Denda Rp50 juta. Upami ku kakawasaan/penyesatan: Panjara maks. 12 taun / Denda Rp300 juta."
                },
                pasal14: {
                    title: "Pasal 14: Kekerasan Seksual Berbasis Éléktronik",
                    desc: "Saha waé anu tanpa hak:",
                    list: ["Ngarékam/nyandak gambar anu ngandung unsur séksual tanpa idin.", "Nepikeun inpormasi éléktronik anu ngandung unsur séksual tanpa kahayang panampi.", "Ngalakukeun penguntitan/pelacakan via sistem éléktronik pikeun tujuan séksual."],
                    hukuman: "Ancaman: Panjara maks. 4 taun / Denda Rp200 juta.",
                    hukuman2: "Upami pikeun meres/ngancam: Panjara maks. 6 taun / Denda Rp300 juta."
                },
                pasal15: {
                    title: "Pasal 15: Pemberatan Hukuman (Ditambah 1/3)",
                    desc: "Pidana ditambah 1/3 upami dilakukeun:",
                    list: ["Dina lingkup kulawarga", "Ku tenaga pendidik/guru", "Ka Barudak atanapi Disabilitas", "Ka awéwé hamil", "Ngagunakeun sarana éléktronik", "Ngabalukarkeun luka beurat/psikologis"]
                }
            },
            anak: {
                title: "UU No. 35 Taun 2014 (Perlindungan Anak)",
                pasal1: { title: "Pasal 1 ayat (1): Definisi Budak", desc: "Budak nyaéta saha waé anu umurna can ngahontal 18 (dalapan belas) taun, kalebet budak anu masih dina kandungan." },
                pasal13: { title: "Pasal 13: Perlindungan tina Diskriminasi", desc: "Saban budak salami dina asuhan kolot, wali, atanapi pihak sanés anu tanggung jawab kana asuhan, ngagaduhan hak nampi perlindungan tina perlakuan: diskriminasi, eksploitasi (ékonomi & séksual), penelantaran, kakejaman/kekerasan, sareng panganiayaan, kateuadilan, sareng perlakuan salah sanésna." },
                pasal76: { title: "Pasal 76C: Larangan Kekerasan", desc: "Saban Jalma dilarang nempatkeun, ngantepkeun, ngalakukeun, maréntahkeun ngalakukeun, atanapi milu ngalakukeun Kekerasan ka Budak.", hukuman: "Ancaman Hukuman: Panjara maks. 3 taun 6 bulan sareng/atanapi denda maks. Rp72.000.000." },
                pasal80: { title: "Pasal 80: Sanksi Pidana", p1: "Saban Jalma anu ngalanggar katangtuan sakumaha anu dimaksud dina Pasal 76C dipidana kalayan pidana panjara paling lami 3 (tilu) taun 6 (genep) bulan sareng/atanapi denda paling seueur Rp72.000.000,00 (tujuh puluh dua juta rupiah).", p2: "Upami ngabalukarkeun maot, dipidana panjara paling lami 15 (lima belas) taun sareng/atanapi denda paling seueur Rp3.000.000.000,00." },
                pasal59: { title: "Pasal 59: Kawajiban Pamaréntah", desc: "Pamaréntah, Pamaréntah Daérah, sareng lembaga nagara sanésna kawajiban sareng tanggung jawab pikeun masihan Perlindungan Husus ka Budak. Perlindungan husus dipasihkeun ka budak anu nyanghareupan hukum, budak korban kekerasan (fisik/psikis), budak korban perlakuan salah, sareng budak korban penelantaran." }
            }
        }
    },
    en: {
        title: "Law Book",
        aksara: "꧋ꦥꦼꦫ꧀ꦭꦶꦤ꧀ꦢꦸꦔꦤ꧀ꦧꦼꦫꦸꦢꦏ꧀",
        quote: '"Don\'t fight your parents, don\'t fight your teachers, but fight against pain"',
        quoteDesc: "(Understand the law so you can protect yourself and others)",
        tabs: { ite: "ITE Law (Cyber)", tpks: "TPKS Law", anak: "Child Protection Law" },
        btnListen: "Listen to Explanation",
        btnStop: "Stop Audio",
        helpTitle: "Need Immediate Help?",
        helpDesc: "If you or your friend are in danger, don't hesitate to contact child and women protection services. We are ready to listen.",
        btnSapa: "Contact SAPA 129",
        btnPolisi: "Police (110)",
        tts: {
            ite: "This is an explanation of the ITE Law. Important note: Article 46 of the ITE Law regulates illegal access or hacking, not bullying. For cyberbullying cases, use Article 27A regarding defamation, Article 28 paragraph 2 regarding hate speech, Article 29 regarding electronic threats of violence, and Article 46 regarding illegal access to computer systems or hacking.",
            tpks: "This is an explanation of the TPKS Law Number 12 of 2022. This law regulates various types of sexual violence, including non-physical and physical harassment. Specifically for electronic-based sexual violence regulated in Article 14, which prohibits recording without permission and distributing content with sexual content. The punishment can reach 6 years in prison if accompanied by extortion.",
            anak: "This is an explanation of the Child Protection Law Number 35 of 2014. A child is someone who is not yet 18 years old. Article 76C explicitly prohibits all forms of violence against children. Violators can be threatened with a maximum prison sentence of 3 years 6 months and a maximum fine of 72 million rupiah."
        },
        content: {
            ite: {
                warningTitle: "Important Note: Misconception of Article 46",
                warningDesc: "Article 46 of the ITE Law regulates illegal access (hacking), not bullying. For cyberbullying cases, use Articles 27A, 28 paragraph (2), and 29.",
                tableHeader: ["Article", "Provision Content", "Criminal Threat"],
                tableRows: [
                    { pasal: "Article 27A", isi: "Defamation through electronic systems.", hukuman: "Max. 2 Years / Fine Rp400 Million" },
                    { pasal: "Article 28 (2)", isi: "Hate speech based on SARA.", hukuman: "Max. 4 Years / Fine Rp750 Million" },
                    { pasal: "Article 29", isi: "Sending threats of violence or electronic intimidation.", hukuman: "Max. 4 Years / Fine Rp750 Million" },
                    { pasal: "Article 46", isi: "Illegal access to computer systems (Hacking). (Not a bullying article)", hukuman: "Max. 6 Years / Fine Rp600 Million", isWarning: true }
                ]
            },
            tpks: {
                title: "Law No. 12 of 2022 concerning TPKS",
                pasal4: {
                    title: "Article 4: Types of Sexual Violence",
                    desc: "Criminal Acts of Sexual Violence include:",
                    list: ["Non-physical & physical sexual harassment", "Forced contraception & sterilization", "Forced marriage", "Sexual torture", "Sexual exploitation", "Sexual slavery", "Electronic-based sexual violence", "Rape & obscene acts", "Pornography & forced prostitution", "Sexual violence in the household"]
                },
                pasal56: {
                    title: "Article 5 & 6: Sexual Harassment",
                    p1: "Article 5 (Non-physical): Non-physical sexual acts that degrade dignity (e.g., whistling, obscene comments). Threat: Max. 9 months prison / Rp10 million fine.",
                    p2: "Article 6 (Physical): Physical sexual acts that degrade dignity. Threat: Max. 4 years prison / Rp50 million fine. If with power/misleading: Max. 12 years prison / Rp300 million fine."
                },
                pasal14: {
                    title: "Article 14: Electronic-Based Sexual Violence",
                    desc: "Anyone who without rights:",
                    list: ["Records/takes sexual images without consent.", "Transmits electronic information with sexual content without the recipient's will.", "Stalks/tracks via electronic systems for sexual purposes."],
                    hukuman: "Threat: Max. 4 years prison / Rp200 million fine.",
                    hukuman2: "If for extortion/threats: Max. 6 years prison / Rp300 million fine."
                },
                pasal15: {
                    title: "Article 15: Aggravating Penalty (Added 1/3)",
                    desc: "Penalty added 1/3 if committed:",
                    list: ["Within the family scope", "By educators/teachers", "Against Children or Disabilities", "Against pregnant women", "Using electronic means", "Causing serious injury/psychological"]
                }
            },
            anak: {
                title: "Law No. 35 of 2014 (Child Protection)",
                pasal1: { title: "Article 1 paragraph (1): Definition of Child", desc: "A child is someone who is not yet 18 (eighteen) years old, including children who are still in the womb." },
                pasal13: { title: "Article 13: Protection from Discrimination", desc: "Every child during the care of parents, guardians, or any other party responsible for care, has the right to receive protection from treatment: discrimination, exploitation (economic & sexual), neglect, cruelty/violence, and persecution, injustice, and other mistreatment." },
                pasal76: { title: "Article 76C: Prohibition of Violence", desc: "Every Person is prohibited from placing, allowing, committing, ordering to commit, or participating in committing Violence against Children.", hukuman: "Criminal Threat: Max. 3 years 6 months prison and/or max fine Rp72,000,000." },
                pasal80: { title: "Article 80: Criminal Sanctions", p1: "Every Person who violates the provisions referred to in Article 76C is punished with a maximum prison sentence of 3 (three) years 6 (six) months and/or a maximum fine of Rp72,000,000.00 (seventy-two million rupiah).", p2: "If it results in death, punished with a maximum prison sentence of 15 (fifteen) years and/or a maximum fine of Rp3,000,000,000.00." },
                pasal59: { title: "Article 59: Government Obligations", desc: "The Government, Regional Government, and other state institutions are obliged and responsible for providing Special Protection to Children. Special protection is given to children in conflict with the law, child victims of violence (physical/psychological), child victims of mistreatment, and child victims of neglect." }
            }
        }
    },
    ja: {
        title: "法律の書",
        aksara: "法律", // Ganti aksara Jawa dengan Kanji Jepang
        quote: '"親に逆らうな、先生に逆らうな、しかし苦しみには立ち向かえ"',
        quoteDesc: "(自分と他人を守るために法律を理解しよう)",
        tabs: { ite: "ITE法 (サイバー)", tpks: "TPKS法", anak: "児童保護法" },
        btnListen: "説明を聞く",
        btnStop: "音声を停止",
        helpTitle: "すぐに助けが必要ですか？",
        helpDesc: "あなたや友人が危険な状態にある場合は、迷わず児童・女性保護サービスに連絡してください。私たちは話を聞く準備ができています。",
        btnSapa: "SAPA 129に連絡",
        btnPolisi: "警察 (110)",
        tts: {
            ite: "これはITE法の説明です。重要な注意点：ITE法第46条は不正アクセスやハッキングについて規定しており、いじめではありません。サイバーいじめの場合は、名誉毀損に関する第27A条、ヘイトスピーチに関する第28条第2項、電子的な暴力の脅迫に関する第29条、コンピュータシステムへの不正アクセスまたはハッキングに関する第46条を使用してください。",
            tpks: "これは2022年第12号TPKS法の説明です。この法律は、非物理的および物理的な嫌がらせを含む、さまざまな種類の性暴力を規制しています。特に、第14条で規制されている電子的手段による性暴力は、許可なく録音したり、性的な内容のコンテンツを配布することを禁止しています。恐喝を伴う場合、刑期は最長6年に達する可能性があります。",
            anak: "これは2014年第35号児童保護法の説明です。子どもとは18歳未満の人のことです。第76C条は、子どもに対するあらゆる形態の暴力を明確に禁止しています。違反者は、最大3年6ヶ月の懲役および最大7200万ルピアの罰金を科される可能性があります。"
        },
        content: {
            ite: {
                warningTitle: "重要な注意：第46条の誤解",
                warningDesc: "ITE法第46条は不正アクセス（ハッキング）を規制しており、いじめではありません。サイバーいじめの場合は、第27A条、第28条第(2)項、および第29条を使用してください。",
                tableHeader: ["条項", "規定内容", "刑事罰"],
                tableRows: [
                    { pasal: "第27A条", isi: "電子システムを通じた名誉毀損。", hukuman: "最大2年 / 罰金4億ルピア" },
                    { pasal: "第28条 (2)", isi: "SARAに基づくヘイトスピーチ。", hukuman: "最大4年 / 罰金7億5000万ルピア" },
                    { pasal: "第29条", isi: "暴力の脅迫または電子的な脅迫を送信すること。", hukuman: "最大4年 / 罰金7億5000万ルピア" },
                    { pasal: "第46条", isi: "コンピュータシステムへの不正アクセス（ハッキング）。（いじめの条項ではありません）", hukuman: "最大6年 / 罰金6億ルピア", isWarning: true }
                ]
            },
            tpks: {
                title: "2022年第12号TPKS法",
                pasal4: {
                    title: "第4条：性暴力の種類",
                    desc: "性暴力の犯罪行為には以下が含まれます：",
                    list: ["非物理的および物理的なセクシュアルハラスメント", "避妊と不妊手術の強制", "強制結婚", "性的拷問", "性的搾取", "性的奴隷制", "電子的手段による性暴力", "レイプとわいせつ行為", "ポルノと強制売春", "家庭内の性暴力"]
                },
                pasal56: {
                    title: "第5条および第6条：セクシュアルハラスメント",
                    p1: "第5条（非物理的）：尊厳を傷つける非物理的な性的行為（例：口笛、わいせつなコメント）。脅威：最大9ヶ月の懲役 / 1000万ルピアの罰金。",
                    p2: "第6条（物理的）：尊厳を傷つける物理的な性的行為。脅威：最大4年の懲役 / 5000万ルピアの罰金。権力や誤解を招く行為を伴う場合：最大12年の懲役 / 3億ルピアの罰金。"
                },
                pasal14: {
                    title: "第14条：電子的手段による性暴力",
                    desc: "権利なくして以下の行為を行う者：",
                    list: ["同意なく性的画像を録画/撮影する。", "受信者の意思に反して性的内容の電子情報を送信する。", "性的目的のために電子システムを介してストーキング/追跡する。"],
                    hukuman: "脅威：最大4年の懲役 / 2億ルピアの罰金。",
                    hukuman2: "恐喝/脅迫目的の場合：最大6年の懲役 / 3億ルピアの罰金。"
                },
                pasal15: {
                    title: "第15条：刑罰の加重（1/3追加）",
                    desc: "以下の場合、刑罰が1/3追加されます：",
                    list: ["家族の範囲内で", "教育者/教師によって", "子どもや障害者に対して", "妊婦に対して", "電子的手段を使用して", "重傷/精神的傷害を引き起こした場合"]
                }
            },
            anak: {
                title: "2014年第35号児童保護法",
                pasal1: { title: "第1条第(1)項：子どもの定義", desc: "子どもとは、まだ18歳に達していない者のことであり、胎内にいる子どもも含まれます。" },
                pasal13: { title: "第13条：差別からの保護", desc: "すべての子どもは、親、保護者、または養育に責任を持つ他の当事者の養育期間中、以下の扱いから保護を受ける権利があります：差別、搾取（経済的および性的）、ネグレクト、残酷さ/暴力、迫害、不当さ、その他の虐待。" },
                pasal76: { title: "第76C条：暴力の禁止", desc: "すべての人は、子どもに対する暴力を置くこと、許すこと、行うこと、命じること、または参加することを禁止されています。", hukuman: "刑事罰：最大3年6ヶ月の懲役および/または最大7200万ルピアの罰金。" },
                pasal80: { title: "第80条：刑事罰", p1: "第76C条に違反するすべての人は、最大3年6ヶ月の懲役および/または最大72,000,000.00ルピアの罰金で罰せられます。", p2: "死亡を引き起こした場合、最大15年の懲役および/または最大3,000,000,000.00ルピアの罰金で罰せられます。" },
                pasal59: { title: "第59条：政府の義務", desc: "政府、地方自治体、およびその他の国家機関は、子どもに特別な保護を提供する義務と責任があります。特別な保護は、法に抵触する子ども、暴力（身体的/心理的）の被害者である子ども、虐待の被害者である子ども、およびネグレクトの被害者である子どもに与えられます。" }
            }
        }
    },
    es: {
        title: "Libro de Leyes",
        aksara: "Leyes", // Ganti aksara Jawa dengan teks Latin
        quote: '"No luches contra tus padres, no luches contra tus maestros, pero lucha contra el dolor"',
        quoteDesc: "(Entiende la ley para que puedas protegerte a ti mismo y a los demás)",
        tabs: { ite: "Ley ITE (Ciber)", tpks: "Ley TPKS", anak: "Ley de Protección Infantil" },
        btnListen: "Escuchar Explicación",
        btnStop: "Detener Audio",
        helpTitle: "¿Necesitas Ayuda Inmediata?",
        helpDesc: "Si tú o tu amigo están en peligro, no dudes en contactar con los servicios de protección infantil y de la mujer. Estamos listos para escuchar.",
        btnSapa: "Contactar SAPA 129",
        btnPolisi: "Policía (110)",
        tts: {
            ite: "Esta es una explicación de la Ley ITE. Nota importante: El Artículo 46 de la Ley ITE regula el acceso ilegal o la piratería informática, no el acoso. Para casos de ciberacoso, utilice el Artículo 27A sobre difamación, el Artículo 28 párrafo 2 sobre discurso de odio, el Artículo 29 sobre amenazas electrónicas de violencia y el Artículo 46 sobre acceso ilegal a sistemas informáticos o piratería.",
            tpks: "Esta es una explicación de la Ley TPKS Número 12 de 2022. Esta ley regula varios tipos de violencia sexual, incluido el acoso no físico y físico. Específicamente para la violencia sexual basada en medios electrónicos regulada en el Artículo 14, que prohíbe la grabación sin permiso y la distribución de contenido con contenido sexual. El castigo puede alcanzar los 6 años de prisión si va acompañado de extorsión.",
            anak: "Esta es una explicación de la Ley de Protección Infantil Número 35 de 2014. Un niño es alguien que aún no tiene 18 años. El Artículo 76C prohíbe explícitamente todas las formas de violencia contra los niños. Los infractores pueden ser amenazados con una pena máxima de prisión de 3 años y 6 meses y una multa máxima de 72 millones de rupias."
        },
        content: {
            ite: {
                warningTitle: "Nota Importante: Concepto Erróneo del Artículo 46",
                warningDesc: "El Artículo 46 de la Ley ITE regula el acceso ilegal (piratería informática), no el acoso. Para casos de ciberacoso, utilice los Artículos 27A, 28 párrafo (2) y 29.",
                tableHeader: ["Artículo", "Contenido de la Disposición", "Amenaza Penal"],
                tableRows: [
                    { pasal: "Artículo 27A", isi: "Difamación a través de sistemas electrónicos.", hukuman: "Máx. 2 Años / Multa 400 Millones de Rupias" },
                    { pasal: "Artículo 28 (2)", isi: "Discurso de odio basado en SARA.", hukuman: "Máx. 4 Años / Multa 750 Millones de Rupias" },
                    { pasal: "Artículo 29", isi: "Envío de amenazas de violencia o intimidación electrónica.", hukuman: "Máx. 4 Años / Multa 750 Millones de Rupias" },
                    { pasal: "Artículo 46", isi: "Acceso ilegal a sistemas informáticos (Piratería). (No es un artículo de acoso)", hukuman: "Máx. 6 Años / Multa 600 Millones de Rupias", isWarning: true }
                ]
            },
            tpks: {
                title: "Ley Núm. 12 de 2022 sobre TPKS",
                pasal4: {
                    title: "Artículo 4: Tipos de Violencia Sexual",
                    desc: "Los Actos Delictivos de Violencia Sexual incluyen:",
                    list: ["Acoso sexual no físico y físico", "Contracepción y esterilización forzadas", "Matrimonio forzado", "Tortura sexual", "Explotación sexual", "Esclavitud sexual", "Violencia sexual basada en medios electrónicos", "Violación y actos obscenos", "Pornografía y prostitución forzada", "Violencia sexual en el hogar"]
                },
                pasal56: {
                    title: "Artículo 5 y 6: Acoso Sexual",
                    p1: "Artículo 5 (No físico): Actos sexuales no físicos que degradan la dignidad (ej. silbidos, comentarios obscenos). Amenaza: Máx. 9 meses de prisión / Multa 10 Millones de Rupias.",
                    p2: "Artículo 6 (Físico): Actos sexuales físicos que degradan la dignidad. Amenaza: Máx. 4 años de prisión / Multa 50 Millones de Rupias. Si es con poder/engaño: Máx. 12 años de prisión / Multa 300 Millones de Rupias."
                },
                pasal14: {
                    title: "Artículo 14: Violencia Sexual Basada en Medios Electrónicos",
                    desc: "Cualquier persona que sin derechos:",
                    list: ["Grabe/tome imágenes sexuales sin consentimiento.", "Transmita información electrónica con contenido sexual sin la voluntad del receptor.", "Aceche/rastree a través de sistemas electrónicos con fines sexuales."],
                    hukuman: "Amenaza: Máx. 4 años de prisión / Multa 200 Millones de Rupias.",
                    hukuman2: "Si es para extorsión/amenazas: Máx. 6 años de prisión / Multa 300 Millones de Rupias."
                },
                pasal15: {
                    title: "Artículo 15: Agravante Penal (Añadido 1/3)",
                    desc: "Se añade 1/3 a la pena si se comete:",
                    list: ["Dentro del ámbito familiar", "Por educadores/maestros", "Contra Niños o Discapacitados", "Contra mujeres embarazadas", "Usando medios electrónicos", "Causando lesiones graves/psicológicas"]
                }
            },
            anak: {
                title: "Ley Núm. 35 de 2014 (Protección Infantil)",
                pasal1: { title: "Artículo 1 párrafo (1): Definición de Niño", desc: "Un niño es alguien que aún no tiene 18 (dieciocho) años, incluidos los niños que aún están en el útero." },
                pasal13: { title: "Artículo 13: Protección contra la Discriminación", desc: "Todo niño durante el cuidado de los padres, tutores o cualquier otra parte responsable del cuidado, tiene derecho a recibir protección contra el trato: discriminación, explotación (económica y sexual), negligencia, crueldad/violencia y persecución, injusticia y otros malos tratos." },
                pasal76: { title: "Artículo 76C: Prohibición de la Violencia", desc: "Se prohíbe a toda persona colocar, permitir, cometer, ordenar cometer o participar en la comisión de Violencia contra Niños.", hukuman: "Amenaza Penal: Máx. 3 años 6 meses de prisión y/o multa máx. 72.000.000 de Rupias." },
                pasal80: { title: "Artículo 80: Sanciones Penales", p1: "Toda persona que viole las disposiciones a que se refiere el Artículo 76C será castigada con una pena de prisión máxima de 3 (tres) años 6 (seis) meses y/o una multa máxima de 72.000.000,00 (setenta y dos millones de rupias).", p2: "Si resulta en muerte, será castigada con una pena de prisión máxima de 15 (quince) años y/o una multa máxima de 3.000.000.000,00 (tres mil millones de rupias)." },
                pasal59: { title: "Artículo 59: Obligaciones del Gobierno", desc: "El Gobierno, el Gobierno Regional y otras instituciones estatales están obligados y son responsables de brindar Protección Especial a los Niños. La protección especial se brinda a los niños en conflicto con la ley, niños víctimas de violencia (física/psicológica), niños víctimas de maltrato y niños víctimas de negligencia." }
            }
        }
    }
};

export default function HukumPage() {
    const [activeTab, setActiveTab] = useState<'ite' | 'tpks' | 'anak'>('ite');
    const [isPlaying, setIsPlaying] = useState(false);

    const { language } = useLanguage(); 
    // Fallback ke bahasa Inggris jika bahasa yang dipilih tidak tersedia di halaman ini
    const t = hukumTranslations[language as keyof typeof hukumTranslations] || hukumTranslations.en;

    // Cek Bahasa
    const isJapanese = language === 'ja';
    const isSpanish = language === 'es';

    // Fungsi untuk memutar suara (TTS)
    const playAudio = (text: string) => {
        if (!('speechSynthesis' in window)) {
            alert("Maaf, browser Anda tidak mendukung fitur suara.");
            return;
        }

        window.speechSynthesis.cancel();

        if (isPlaying) {
            setIsPlaying(false);
            return;
        }

        const ucapan = new SpeechSynthesisUtterance(text);
        
        // 1. Sesuaikan logat bahasa (TTS)
        if (language === 'en') ucapan.lang = 'en-US';
        else if (language === 'su') ucapan.lang = 'su-ID'; 
        else if (language === 'ja') ucapan.lang = 'ja-JP'; 
        else if (language === 'es') ucapan.lang = 'es-ES';
        else ucapan.lang = 'id-ID';

        // 2. Atur nada dan kecepatan
        if (language === 'su') {
            ucapan.pitch = 1.3;
            ucapan.rate = 1.1;
        } else if (language === 'ja') {
            ucapan.pitch = 1.1;
            ucapan.rate = 1.0;
        } else {
            ucapan.pitch = 1.15;
            ucapan.rate = 1.05;
        }

        // 3. Cari suara perempuan
        const voices = window.speechSynthesis.getVoices();
        const searchLang = language === 'su' ? 'id' : ucapan.lang.split('-')[0];
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
          ucapan.voice = femaleVoice || matchingVoices[0];
        }

        ucapan.onend = () => setIsPlaying(false);
        ucapan.onerror = () => setIsPlaying(false);

        setIsPlaying(true);
        window.speechSynthesis.speak(ucapan);
    };

    return (
        <div className="relative min-h-screen py-12 px-4 md:px-6 overflow-hidden bg-[#f4eee0]">

            {/* Background Batik Halus */}
            <div className="absolute top-0 left-0 w-full h-96 bg-jabar-green opacity-5 z-0"
                style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="max-w-5xl mx-auto relative z-10 mt-6">

                {/* Header */}
                <FadeIn>
                    <div className="text-center mb-12 flex flex-col items-center">
                        
                        {/* LOGO / IKON DINAMIS */}
                        <div className="w-26 h-26 mb-4 flex items-center justify-center">
                            <img 
                                src={
                                    isJapanese ? "/icon-jp.png" : 
                                    isSpanish ? "/spanyol.png" : 
                                    "/batik.png"
                                } 
                                alt="Ikon Budaya" 
                                className="w-full h-full object-contain drop-shadow-md" 
                            />
                        </div>

                        <h1 className="font-serif text-4xl font-bold text-jabar-green mb-4 flex items-center justify-center gap-4">
                            {t.title} 
                            <span className={`text-4xl hidden md:inline ${isJapanese || isSpanish ? 'font-sans' : 'font-sunda text-jabar-gold'}`}>
                                {t.aksara}
                            </span>
                        </h1>
                        <br />
                        <p className="text-gray-700 max-w-2xl mx-auto italic font-serif text-lg text-center">
                            {t.quote} <br />
                            <span className="text-sm not-italic text-gray-500">{t.quoteDesc}</span>
                        </p>
                    </div>
                </FadeIn>

                {/* Navigasi Tab Hukum */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                    <button
                        onClick={() => { setActiveTab('ite'); window.speechSynthesis.cancel(); setIsPlaying(false); }}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-t-lg transition-all border-b-4 ${activeTab === 'ite' ? 'bg-[#f9f6f0] text-jabar-green border-jabar-gold shadow-md' : 'bg-[#e5e0d8] text-gray-500 border-transparent hover:bg-[#dcd6cc]'}`}
                    >
                        <Scale className="w-4 h-4" /> {t.tabs.ite}
                    </button>
                    <button
                        onClick={() => { setActiveTab('tpks'); window.speechSynthesis.cancel(); setIsPlaying(false); }}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-t-lg transition-all border-b-4 ${activeTab === 'tpks' ? 'bg-[#f9f6f0] text-jabar-green border-jabar-gold shadow-md' : 'bg-[#e5e0d8] text-gray-500 border-transparent hover:bg-[#dcd6cc]'}`}
                    >
                        <BookOpen className="w-4 h-4" /> {t.tabs.tpks}
                    </button>
                    <button
                        onClick={() => { setActiveTab('anak'); window.speechSynthesis.cancel(); setIsPlaying(false); }}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-t-lg transition-all border-b-4 ${activeTab === 'anak' ? 'bg-[#f9f6f0] text-jabar-green border-jabar-gold shadow-md' : 'bg-[#e5e0d8] text-gray-500 border-transparent hover:bg-[#dcd6cc]'}`}
                    >
                        <ShieldCheck className="w-4 h-4" /> {t.tabs.anak}
                    </button>
                </div>

                {/* KONTEN DENGAN ANIMASI TRANSISI */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {/* KONTEN: UU ITE */}
                        {activeTab === 'ite' && (
                            <div className="space-y-6 relative">
                                <button onClick={() => playAudio(t.tts.ite)} className={`absolute -top-16 right-0 md:-top-16 md:right-4 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-all ${isPlaying ? 'bg-red-500 text-white' : 'bg-jabar-green text-white hover:bg-emerald-700'}`}>
                                    {isPlaying ? <><Square className="w-4 h-4" /> {t.btnStop}</> : <><Play className="w-4 h-4" /> {t.btnListen}</>}
                                </button>

                                <div className="kertas-manuskrip p-6 flex items-start gap-4">
                                    <AlertTriangle className="w-8 h-8 text-orange-500 shrink-0" />
                                    <div>
                                        <h3 className="font-serif font-bold text-orange-800 text-xl mb-2">{t.content.ite.warningTitle}</h3>
                                        <p className="text-gray-700 text-sm leading-relaxed text-justify">
                                            {t.content.ite.warningDesc}
                                        </p>
                                    </div>
                                </div>

                                <div className="kertas-manuskrip overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-jabar-green text-white text-sm">
                                                <th className="p-4 font-bold border-r border-emerald-700">{t.content.ite.tableHeader[0]}</th>
                                                <th className="p-4 font-bold border-r border-emerald-700">{t.content.ite.tableHeader[1]}</th>
                                                <th className="p-4 font-bold">{t.content.ite.tableHeader[2]}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#e5e0d8]">
                                            {t.content.ite.tableRows.map((row, idx) => (
                                                <tr key={idx} className={`hover:bg-[#f4eee0] transition ${row.isWarning ? 'bg-red-50' : ''}`}>
                                                    <td className={`p-4 font-bold text-lg font-serif ${row.isWarning ? 'text-red-600' : 'text-jabar-green'}`}>{row.pasal}</td>
                                                    <td className="p-4 text-sm text-gray-700 leading-relaxed">{row.isi}</td>
                                                    <td className="p-4 text-sm font-medium text-red-700">{row.hukuman}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* KONTEN: UU TPKS */}
                        {activeTab === 'tpks' && (
                            <div className="relative">
                                <button onClick={() => playAudio(t.tts.tpks)} className={`absolute -top-16 right-0 md:-top-16 md:right-4 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-all ${isPlaying ? 'bg-red-500 text-white' : 'bg-jabar-green text-white hover:bg-emerald-700'}`}>
                                    {isPlaying ? <><Square className="w-4 h-4" /> {t.btnStop}</> : <><Play className="w-4 h-4" /> {t.btnListen}</>}
                                </button>

                                <div className="kertas-manuskrip p-8 space-y-6">
                                    <h2 className="font-serif text-2xl font-bold text-jabar-green mb-6 flex items-center gap-2 border-b-2 border-jabar-gold pb-3">
                                        <BookOpen className="w-6 h-6" /> {t.content.tpks.title}
                                    </h2>

                                    <div className="border-l-4 border-jabar-green pl-4">
                                        <h3 className="font-bold text-lg text-jabar-dark mb-2 font-serif">{t.content.tpks.pasal4.title}</h3>
                                        <p className="text-sm text-gray-700 mb-2">{t.content.tpks.pasal4.desc}</p>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 columns-1 md:columns-2">
                                            {t.content.tpks.pasal4.list.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-jabar-gold pl-4 bg-[#f4eee0] p-4 rounded-r-sm">
                                        <h3 className="font-bold text-lg text-jabar-dark mb-2 font-serif">{t.content.tpks.pasal56.title}</h3>
                                        <p className="text-sm text-gray-700 mb-2 text-justify">{t.content.tpks.pasal56.p1}</p>
                                        <p className="text-sm text-gray-700 text-justify">{t.content.tpks.pasal56.p2}</p>
                                    </div>

                                    <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-sm">
                                        <h3 className="font-bold text-lg text-red-800 mb-2 font-serif">{t.content.tpks.pasal14.title}</h3>
                                        <p className="text-sm text-gray-700 mb-2">{t.content.tpks.pasal14.desc}</p>
                                        <ul className="list-decimal list-inside text-sm text-gray-700 space-y-1 mb-2">
                                            {t.content.tpks.pasal14.list.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                        <p className="text-sm font-bold text-red-700">{t.content.tpks.pasal14.hukuman}</p>
                                        <p className="text-sm text-red-700 mt-1">{t.content.tpks.pasal14.hukuman2}</p>
                                    </div>

                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <h3 className="font-bold text-lg text-jabar-dark mb-2 font-serif">{t.content.tpks.pasal15.title}</h3>
                                        <p className="text-sm text-gray-700 mb-1">{t.content.tpks.pasal15.desc}</p>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 columns-1 md:columns-2">
                                            {t.content.tpks.pasal15.list.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* KONTEN: UU ANAK */}
                        {activeTab === 'anak' && (
                            <div className="relative">
                                <button onClick={() => playAudio(t.tts.anak)} className={`absolute -top-16 right-0 md:-top-16 md:right-4 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-all ${isPlaying ? 'bg-red-500 text-white' : 'bg-jabar-green text-white hover:bg-emerald-700'}`}>
                                    {isPlaying ? <><Square className="w-4 h-4" /> {t.btnStop}</> : <><Play className="w-4 h-4" /> {t.btnListen}</>}
                                </button>

                                <div className="kertas-manuskrip p-8">
                                    <h2 className="font-serif text-2xl font-bold text-jabar-green mb-6 flex items-center gap-2 border-b-2 border-jabar-gold pb-3">
                                        <ShieldCheck className="w-6 h-6" /> {t.content.anak.title}
                                    </h2>

                                    <div className="space-y-8">
                                        <div className="border-l-4 border-jabar-green pl-4">
                                            <h3 className="font-bold text-lg text-jabar-dark mb-2 font-serif">{t.content.anak.pasal1.title}</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed mb-2 text-justify">
                                                {t.content.anak.pasal1.desc}
                                            </p>
                                        </div>

                                        <div className="border-l-4 border-jabar-green pl-4">
                                            <h3 className="font-bold text-lg text-jabar-dark mb-2 font-serif">{t.content.anak.pasal13.title}</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed mb-2 text-justify">
                                                {t.content.anak.pasal13.desc}
                                            </p>
                                        </div>

                                        <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-sm">
                                            <h3 className="font-bold text-lg text-red-800 mb-2 font-serif">{t.content.anak.pasal76.title}</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed mb-3 text-justify">
                                                {t.content.anak.pasal76.desc}
                                            </p>
                                            <div className="bg-white/50 p-3 rounded text-sm text-red-700 font-bold border border-red-200">
                                                {t.content.anak.pasal76.hukuman}
                                            </div>
                                        </div>

                                        <div className="border-l-4 border-jabar-gold pl-4">
                                            <h3 className="font-bold text-lg text-jabar-dark mb-2 font-serif">{t.content.anak.pasal80.title}</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed mb-2 text-justify">
                                                {t.content.anak.pasal80.p1}
                                            </p>
                                            <p className="text-sm text-gray-700 leading-relaxed text-justify">
                                                {t.content.anak.pasal80.p2}
                                            </p>
                                        </div>

                                        <div className="border-l-4 border-jabar-green pl-4">
                                            <h3 className="font-bold text-lg text-jabar-dark mb-2 font-serif">{t.content.anak.pasal59.title}</h3>
                                            <p className="text-sm text-gray-700 leading-relaxed mb-2 text-justify">
                                                {t.content.anak.pasal59.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Kontak Bantuan Darurat */}
                <FadeIn>
                    <div className="mt-12 bg-jabar-dark p-8 md:p-10 rounded-sm shadow-2xl relative overflow-hidden text-center border-t-8 border-jabar-gold">
                        <div className="absolute inset-0 bg-batik-border opacity-20 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto bg-jabar-gold/20 rounded-full flex items-center justify-center mb-4">
                                <PhoneCall className="w-8 h-8 text-jabar-gold" />
                            </div>
                            <h3 className="text-white font-serif text-3xl font-bold mb-3">{t.helpTitle}</h3>
                            <p className="text-gray-300 text-sm mb-8 max-w-lg mx-auto">
                                {t.helpDesc}
                            </p>
                            <div className="flex flex-col md:flex-row justify-center gap-4">
                                <a href="tel:129" className="bg-jabar-gold hover:bg-yellow-500 text-jabar-dark font-bold px-8 py-3 rounded-sm flex items-center justify-center gap-2 transition shadow-lg text-lg">
                                    {t.btnSapa}
                                </a>
                                <a href="tel:110" className="border-2 border-white/50 hover:bg-white hover:text-jabar-dark text-white font-bold px-8 py-3 rounded-sm flex items-center justify-center gap-2 transition text-lg">
                                    {t.btnPolisi}
                                </a>
                            </div>
                        </div>
                    </div>
                </FadeIn>

            </div>
        </div>
    );
}