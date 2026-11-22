<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Laporan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LaporanController extends Controller {
    
    // 1. Simpan Laporan Baru
    public function store(Request $request) {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'kontak' => 'nullable|string|max:100',
            'lokasi' => 'required|string|max:255',
            'jenis' => 'required|string',
            'kronologi' => 'required|string',
            'anonim' => 'boolean',
        ]);

        $validated['tiket'] = 'JB-' . strtoupper(Str::random(6));
        $validated['status'] = 'Baru';

        $laporan = Laporan::create($validated);
        return response()->json([
            'message' => 'Laporan diterima',
            'tiket' => $laporan->tiket,
            'data' => $laporan,
        ], 201);
    }

    // 2. Ambil Semua Laporan (Untuk Admin)
    public function index() {
        return response()->json(Laporan::latest()->paginate(20));
    }

    // 3. Update Status & Tanggapan (Untuk Admin)
    public function updateStatus(Request $request, $id) {
        $request->validate([
            'status' => 'required|in:Baru,Verifikasi,Intervensi,Selesai,Dirujuk',
            'tanggapan' => 'nullable|string'
        ]);
        
        $laporan = Laporan::findOrFail($id);
        $laporan->update([
            'status' => $request->status,
            'tanggapan' => $request->tanggapan
        ]);
        
        return response()->json(['message' => 'Berhasil diperbarui', 'data' => $laporan]);
    }

    // 4. Cek Status Berdasarkan Tiket (Untuk Pelapor)
    public function cekStatus($tiket) {
        $laporan = Laporan::where('tiket', $tiket)->first();
        
        if (!$laporan) {
            return response()->json(['message' => 'Nomor tiket tidak ditemukan.'], 404);
        }

        return response()->json([
            'tiket' => $laporan->tiket,
            'status' => $laporan->status,
            'jenis' => $laporan->jenis,
            'tanggal' => $laporan->created_at->format('d M Y'),
            'tanggapan' => $laporan->tanggapan // Mengembalikan tanggapan admin
        ]);
    }
        public function destroy($id) {
        $laporan = Laporan::findOrFail($id);
        $laporan->delete();
        return response()->json(['message' => 'Laporan berhasil dihapus']);
    }
}