<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('laporan', function (Blueprint $table) {
            $table->id();
            $table->string('tiket', 20)->unique();
            $table->string('nama')->default('Anonim');
            $table->string('kontak')->nullable();
            $table->string('lokasi');
            $table->string('jenis');
            $table->text('kronologi');
            $table->boolean('anonim')->default(true);
            $table->enum('status', ['Baru','Verifikasi','Intervensi','Selesai','Dirujuk'])->default('Baru');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('laporan'); }
};