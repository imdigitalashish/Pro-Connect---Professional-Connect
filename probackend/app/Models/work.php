<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class work extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id", "company_name", "position", "start_date",
        "end_date"
    ];
}
