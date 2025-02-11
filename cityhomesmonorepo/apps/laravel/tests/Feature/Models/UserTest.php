<?php


use App\Models\User;

it(description: 'has many avatars', closure: function () {
    $user = User::factory()->create();
    $file = base_path(path: 'tests/fixtures/avatar.jpg');

    $user->addMedia(file: $file)
        ->preservingOriginal()
        ->toMediaCollection(collectionName: 'avatars');

    expect(value: $user->fresh()->avatars->count())->toBe(expected: 1);
});
