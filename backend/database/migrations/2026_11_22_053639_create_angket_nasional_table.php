<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('angket_nasional', function (Blueprint $table) {
            $table->id();
            $table->string('sekolah');
            $table->string('kabkota');
            $table->string('jenjang');
            $table->enum('q1', ['sering','kadang','tidak']);
            $table->enum('q2', ['verbal','fisik','siber','sosial']);
            $table->enum('q3', ['ada','tidak','tidak-tahu']);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('angket_nasional'); }
};