<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Enrollment;

class Course extends Model
{
    use HasFactory;

    protected $table = 'courses';

    protected $fillable = ['title', 'description'];

    public function enrollment() {
        return $this->hasMany(Enrollment::class);
    }
}
