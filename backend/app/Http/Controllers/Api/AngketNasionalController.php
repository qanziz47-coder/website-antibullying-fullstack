<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\AngketNasional;
use Illuminate\Http\Request;

class AngketNasionalController extends Controller {
    public function store(Request $request) {
        $validated = $request->validate([
            'sekolah' => 'required|string|max:255',
            'kabkota' => 'required|string',
            'jenjang' => 'required|in:SD,SMP,SMA/SMK',
            'q1' => 'required|in:sering,kadang,tidak',
            'q2' => 'required|in:verbal,fisik,siber,sosial',
            'q3' => 'required|in:ada,tidak,tidak-tahu',
        ]);
        $data = AngketNasional::create($validated);
        return response()->json(['message' => 'Tersimpan', 'data' => $data], 201);
    }

    public function index() {
        return response()->json(AngketNasional::latest()->paginate(20));
    }
}