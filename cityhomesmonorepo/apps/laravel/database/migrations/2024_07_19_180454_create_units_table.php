<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('units', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('subtitle');
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->string('userThatUploaded');
        $table->string('category');
        $table->boolean('is_booked')->default(false);
        $table->string('accomodation_information')->nullable();
        $table->string('number_of_bedrooms')->nullable();
        $table->string('number_of_bathrooms')->nullable();
        $table->string('price_information')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('units');
    }
};
