<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tutorCourses()
    {
        return $this->hasMany(Tutor_Courses::class);
    }

    public function bookedSessions()
    {
        return $this->hasMany(Booked_Sessions::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
