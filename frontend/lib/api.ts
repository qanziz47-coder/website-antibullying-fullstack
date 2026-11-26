const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Terjadi kesalahan');
  return data;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil data');
  return res.json();
}

export const api = {
  // 1. Statistik
  statistik: () => get<{
    total_laporan: number;
    total_angket: number;
    kasus_ditindak: number;
    kasus_selesai: number;
  }>('/statistik'),

  // 2. Angket Nasional
  kirimAngketNasional: (data: Record<string, string>) =>
    post('/angket-nasional', data),

  // 3. Angket Digital
  kirimAngketDigital: (data: Record<string, string>) =>
    post<{ hasil: { skor: number; kategori: string } }>('/angket-digital', data),

  // 4. Laporan (Buat Baru)
  kirimLaporan: (data: Record<string, unknown>) =>
    post<{ tiket: string }>('/laporan', data),

  // 5. Laporan (Daftar) - Tambahkan created_at
  listLaporan: () => get<{ data: Array<{
    id: number; 
    tiket: string; 
    lokasi: string; 
    jenis: string; 
    status: string;
    created_at: string;
    tanggapan: string | null;
  }> }>('/laporan'),

  // 6. Cek Status Laporan (Berdasarkan Tiket)
  cekStatus: (tiket: string) => get<{ 
    tiket: string; 
    status: string; 
    jenis: string; 
    tanggal: string; 
    tanggapan: string | null;
  }>(`/laporan/cek/${tiket}`),

  // 7. Update Status & Tanggapan (Untuk Admin)
  updateStatus: async (id: number, status: string, tanggapan: string) => {
    const res = await fetch(`${API_URL}/laporan/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify({ status, tanggapan }), // Kirim keduanya ke Laravel
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Gagal memperbarui status di server.');
    }
    return data;
  },

   hapusLaporan: async (id: number) => {
    const res = await fetch(`${API_URL}/laporan/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Gagal menghapus laporan.');
    return data;
  },
};