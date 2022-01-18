<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class accounts extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","email","photo_path","tagline", "college_name"
    ];
}
