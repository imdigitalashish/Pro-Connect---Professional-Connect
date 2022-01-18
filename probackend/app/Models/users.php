<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class users extends Model
{
    use HasFactory;


    protected $fillable = [
        "firstname", "lastname", "country", "email", "mobile","dob", "password","remember_token", "tagline","ip_address",
    ];
}
