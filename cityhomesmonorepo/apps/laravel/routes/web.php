<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityHomePayment;


Route::get('/', function () {
    return view('welcome');
});

Route::get('getAuthData',
    [CityHomePayment::class, 'getAccessToken']
);
