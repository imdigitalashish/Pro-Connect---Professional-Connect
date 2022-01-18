<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class education extends Model
{
    use HasFactory;

    protected $fillable = 
    [
        "user_id", "college_name", "degree", "specialization", "start_date", "end_date"
    ];
}
