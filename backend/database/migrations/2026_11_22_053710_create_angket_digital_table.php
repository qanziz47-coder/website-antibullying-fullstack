<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('angket_digital', function (Blueprint $table) {
            $table->id();
            $table->string('inisial')->nullable();
            $table->enum('d1', ['ya','tidak']);
            $table->enum('d2', ['ya','tidak']);
            $table->enum('d3', ['ya','tidak']);
            $table->enum('d4', ['ya','tidak']);
            $table->integer('skor');
            $table->string('kategori');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('angket_digital'); }
};