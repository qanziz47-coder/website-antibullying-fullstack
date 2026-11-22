<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\{AngketNasional, AngketDigital, Laporan};

class StatistikController extends Controller {
    public function index() {
        return response()->json([
            'total_laporan' => Laporan::count(),
            'total_angket' => AngketNasional::count() + AngketDigital::count(),
            'kasus_ditindak' => Laporan::where('status', '!=', 'Baru')->count(),
            'kasus_selesai' => Laporan::where('status', 'Selesai')->count(),
        ]);
    }
}