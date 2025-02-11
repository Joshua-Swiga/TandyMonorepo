<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'subtitle' => fake()->sentence(),
            'user_id' => User::factory(),
            'userThatUploaded' => fake()->name(),
            'category' => fake()->randomElement(['Apartment', 'House', 'Studio']),
            'accomodation_information' => fake()->paragraph(),
            'number_of_bedrooms' => fake()->numberBetween(1, 10),
            'number_of_bathrooms' => fake()->numberBetween(1, 10),
            'price_information' => fake()->paragraph(),
        ];
    }
}
