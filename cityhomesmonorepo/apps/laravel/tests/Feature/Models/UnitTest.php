<?php


use App\Models\Unit;

it(description: 'has many images', closure: function () {
    $user = Unit::factory()->create();
    $file = base_path(path: 'tests/fixtures/home.jpg');

    $user->addMedia(file: $file)
        ->preservingOriginal()
        ->toMediaCollection(collectionName: 'images');

    expect(value: $user->fresh()->images->count())->toBe(expected: 1);
});
