<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Unit extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'units';

    protected $fillable =[
        'title',
        'subtitle',
        'user_id',
        'userThatUploaded',
        'category',
        'accomodation_information',
        'number_of_bedrooms',
        'number_of_bathrooms',
        'price_information',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Each Unit will have one location
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function bookingStatus(): HasOne
    {
        return $this->hasOne(BookingStatus::class);
    }

    public function amenities(): HasOne
    {
        return $this->hasOne(Amenities::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
    }

    public function images(): MorphMany
    {
        return $this->media()
            ->where(column: 'collection_name', operator: '=', value: 'images');
    }
}
