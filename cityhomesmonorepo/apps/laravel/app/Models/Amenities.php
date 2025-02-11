<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Amenities extends Model
{
    use HasFactory;

    protected $table = 'amenities';

    protected $fillable = [
        'amenities',
        'unit_id'
    ];

    protected function unit(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
