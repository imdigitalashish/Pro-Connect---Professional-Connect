<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    use HasFactory;

    // public $timestamps = false;

    protected $fillable = [
        "user_id",
        "name",
        "text",
        "media",
        "likes",
        "filetype",
    ];

}
