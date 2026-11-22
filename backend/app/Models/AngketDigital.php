<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class AngketDigital extends Model {
    protected $table = 'angket_digital'; // TAMBAHKAN BARIS INI
    protected $fillable = ['inisial','d1','d2','d3','d4','skor','kategori'];
}