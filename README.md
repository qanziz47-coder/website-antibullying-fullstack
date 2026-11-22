# JABARBULLYING

**Hentikan Ririwit!** 🛡️

JABARBULLYING merupakan platform digital yang dirancang sebagai ruang aman bagi anak-anak untuk melaporkan tindakan perundungan (bullying), khususnya di lingkungan sekolah.

Platform ini mengangkat pendekatan budaya Sunda melalui penggunaan bahasa dan identitas visual lokal untuk meningkatkan kesadaran mengenai pentingnya perlindungan anak serta menciptakan lingkungan sekolah yang aman, nyaman, dan bebas dari perundungan.

## ✨ Fitur Utama

- **Pelaporan Kasus**  
  Menyediakan fasilitas untuk melaporkan tindakan perundungan.

- **Pemeriksaan Status**  
  Memungkinkan pengguna memeriksa perkembangan laporan.

- **Pengawasan Kasus**  
  Menampilkan informasi statistik dan pemantauan kasus perundungan.

- **Kategori Kasus**  
  Menyediakan pengelompokan data berdasarkan kategori seperti anak, perempuan, dan laki-laki.

- **Multibahasa**  
  Mendukung bahasa Indonesia, Sunda, dan Inggris.

- **Identitas Budaya Sunda**  
  Menggunakan elemen visual dan bahasa Sunda sebagai identitas platform.

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| Next.js | Frontend |
| React.js | Antarmuka pengguna |
| Laravel | Backend |
| PHP | Bahasa pemrograman backend |
| MySQL | Database |
| JavaScript | Pengembangan interaksi |

## 📁 Struktur Repository

```text
website-antibullying/
│
├── frontend/          # Next.js
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── backend/           # Laravel
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── config/
│   └── composer.json
│
├── README.md
└── .gitignore
```

## ⚙️ Instalasi dan Konfigurasi

### 1. Clone Repository

```bash
git clone https://github.com/USERNAME/website-antibullying.git

cd website-antibullying
```

### 2. Menjalankan Backend (Laravel)

Masuk ke direktori backend:

```bash
cd backend
```

Install dependencies:

```bash
composer install
```

Salin file konfigurasi:

```bash
copy .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Konfigurasikan koneksi database melalui file `.env`, kemudian jalankan migrasi:

```bash
php artisan migrate
```

Jalankan server Laravel:

```bash
php artisan serve
```

### 3. Menjalankan Frontend (Next.js)

Buka terminal baru dan masuk ke direktori frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Konfigurasikan URL API backend pada file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Jalankan development server:

```bash
npm run dev
```

Buka website melalui:

```text
http://localhost:3000
```

## 🔐 Keamanan

- File `.env` dan `.env.local` tidak disertakan dalam repository.
- Kredensial database harus disimpan secara lokal.
- Konfigurasi API perlu disesuaikan dengan lingkungan pengembangan atau produksi.

## 🎯 Tujuan Project

JABARBULLYING dikembangkan dengan tujuan:

1. Meningkatkan kesadaran mengenai bahaya perundungan.
2. Menyediakan sarana pelaporan yang mudah diakses.
3. Mendukung perlindungan anak di lingkungan sekolah.
4. Mendorong terciptanya lingkungan pendidikan yang aman dan nyaman.

## 👨‍💻 Pengembangan

Project ini dikembangkan menggunakan arsitektur terpisah antara frontend dan backend dalam satu repository (Monorepo).

- Frontend: Next.js
- Backend: Laravel
- Komunikasi: REST API

---

**JABARBULLYING**  
*Hentikan Ririwit, Jaga Barudak.*

