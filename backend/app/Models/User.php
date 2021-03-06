<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'type',
        'gender',
        'location',
        'phone_number',
        'password',
        'profile_photo_path',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
    ];

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function courses()
    {
        return $this->hasMany(Tutor_Courses::class, 'user_id');
    }

    public function Utimeslots()
    {
        return $this->hasMany(Timeslots::class);
    }

    public function meetingtype()
    {
        return $this->hasOne(MeetingType::class);
    }

    public function sessions()
    {
        return $this->hasMany(Booked_Sessions::class, 'tutor_id');
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

  
}
