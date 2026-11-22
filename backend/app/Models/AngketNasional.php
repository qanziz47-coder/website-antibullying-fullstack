<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class AngketNasional extends Model {
    protected $table = 'angket_nasional'; // TAMBAHKAN BARIS INI
    protected $fillable = ['sekolah','kabkota','jenjang','q1','q2','q3'];
}