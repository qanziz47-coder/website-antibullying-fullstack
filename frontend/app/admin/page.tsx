'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { X, Save, Trash2 } from 'lucide-react'; // Tambah ikon Trash2
import Link from 'next/link';

type Laporan = {
  id: number;
  tiket: string;
  lokasi: string;
  jenis: string;
  status: string;
  created_at: string;
  tanggapan: string | null;
};

export default function AdminDashboard() {
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Semua');
  
  // State untuk Modal Edit
  const [selectedLaporan, setSelectedLaporan] = useState<Laporan | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editTanggapan, setEditTanggapan] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchLaporan = async () => {
    try {
      const res = await api.listLaporan();
      setLaporan(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  const openModal = (l: Laporan) => {
    setSelectedLaporan(l);
    setEditStatus(l.status);
    setEditTanggapan(l.tanggapan || '');
  };

  const handleSave = async () => {
    if (!selectedLaporan) return;
    setIsSaving(true);
    try {
      await api.updateStatus(selectedLaporan.id, editStatus, editTanggapan);
      setSelectedLaporan(null);
      fetchLaporan();
    } catch (err: any) {
      alert(`Gagal: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // FUNGSI BARU: Hapus Laporan
  const handleDelete = async (id: number, tiket: string) => {
    const confirmHapus = window.confirm(`Apakah Anda yakin ingin menghapus laporan dengan tiket ${tiket}? Data ini tidak dapat dikembalikan.`);
    
    if (confirmHapus) {
      try {
        await api.hapusLaporan(id);
        fetchLaporan(); // Refresh tabel setelah dihapus
      } catch (err: any) {
        alert(`Gagal menghapus: ${err.message}`);
      }
    }
  };

  const filteredLaporan = filter === 'Semua' 
    ? laporan 
    : laporan.filter(l => l.status === filter);

  return (
    <div className="min-h-screen bg-[#fcfbf7] py-12 px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-jabar-green">Dashboard Admin</h1>
            <p className="text-slate-500">Kelola laporan dan berikan tanggapan.</p>
          </div>
          <Link href="/" className="text-sm font-bold text-jabar-green hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>

        {/* Filter Status */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['Semua', 'Baru', 'Verifikasi', 'Intervensi', 'Selesai'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm font-bold rounded-sm whitespace-nowrap transition-colors ${
                filter === status 
                  ? 'bg-jabar-green text-white' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Tabel Laporan */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs text-slate-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 font-bold">Tiket</th>
                  <th className="p-4 font-bold">Tanggal</th>
                  <th className="p-4 font-bold">Lokasi</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-400">Memuat data...</td></tr>
                ) : filteredLaporan.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-400">Belum ada laporan.</td></tr>
                ) : (
                  filteredLaporan.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-jabar-green">{l.tiket}</td>
                      <td className="p-4 text-gray-500">{new Date(l.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="p-4 font-medium">{l.lokasi}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded-sm ${
                          l.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                          l.status === 'Intervensi' ? 'bg-blue-100 text-blue-700' :
                          l.status === 'Verifikasi' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="p-4 flex items-center justify-center gap-2">
                        <button 
                          onClick={() => openModal(l)}
                          className="bg-jabar-green text-white text-xs px-4 py-2 rounded-sm hover:bg-emerald-800 transition"
                        >
                          Kelola
                        </button>
                        {/* TOMBOL HAPUS */}
                        <button 
                          onClick={() => handleDelete(l.id, l.tiket)}
                          className="bg-red-50 text-red-600 border border-red-200 text-xs p-2 rounded-sm hover:bg-red-100 hover:text-red-800 transition"
                          title="Hapus Laporan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL EDIT STATUS & TANGGAPAN */}
      {selectedLaporan && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
            <div className="bg-jabar-green p-4 flex justify-between items-center text-white">
              <h3 className="font-bold">Kelola Laporan {selectedLaporan.tiket}</h3>
              <button onClick={() => setSelectedLaporan(null)} className="hover:text-gray-200"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Ubah Status</label>
                <select 
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-jabar-green"
                >
                  <option value="Baru">Baru</option>
                  <option value="Verifikasi">Verifikasi</option>
                  <option value="Intervensi">Intervensi</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dirujuk">Dirujuk</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tanggapan / Catatan Petugas</label>
                <textarea 
                  value={editTanggapan}
                  onChange={(e) => setEditTanggapan(e.target.value)}
                  rows={4}
                  placeholder="Tuliskan instruksi atau tanggapan untuk pelapor..."
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-jabar-green"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Tanggapan ini akan muncul di halaman Cek Status pelapor.</p>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedLaporan(null)}
                  className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Batal
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-bold text-white bg-jabar-green rounded hover:bg-emerald-800 flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}