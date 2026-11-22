<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\AngketDigital;
use Illuminate\Http\Request;

class AngketDigitalController extends Controller {
    public function store(Request $request) {
        $validated = $request->validate([
            'inisial' => 'nullable|string|max:20',
            'd1' => 'required|in:ya,tidak',
            'd2' => 'required|in:ya,tidak',
            'd3' => 'required|in:ya,tidak',
            'd4' => 'required|in:ya,tidak',
        ]);

        $skor = 0;
        if ($validated['d1'] === 'ya') $skor += 3;
        if ($validated['d2'] === 'ya') $skor += 2;
        if ($validated['d3'] === 'ya') $skor += 3;
        if ($validated['d4'] === 'tidak') $skor += 1;

        $kategori = $skor >= 6 ? 'tinggi' : ($skor >= 3 ? 'sedang' : 'rendah');

        $data = AngketDigital::create(array_merge($validated, [
            'skor' => $skor, 'kategori' => $kategori,
        ]));

        return response()->json([
            'message' => 'Tersimpan',
            'data' => $data,
            'hasil' => ['skor' => $skor, 'kategori' => $kategori],
        ], 201);
    }

    public function index() {
        return response()->json(AngketDigital::latest()->paginate(20));
    }
}