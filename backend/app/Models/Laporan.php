<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model {
    protected $table = 'laporan'; 
   protected $fillable = ['tiket','nama','kontak','lokasi','jenis','kronologi','anonim','status','tanggapan'];
}