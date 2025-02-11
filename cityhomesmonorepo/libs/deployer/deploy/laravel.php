<?php

declare(strict_types=1);

namespace Deployer;

desc(title: 'Shows php-fpm logs');
task(name: 'logs:php-fpm', body: function () {
    run(command: 'tail -f /var/log/fpm-php.www.log');
})->verbose();

desc(title: 'Create the media library');
task(name: 'artisan:media-library:clear', body: artisan(command: 'media-library:clear  --force', options: ['skipIfNoEnv', 'showOutput']));

desc(title: 'Migrate application data');
task(name: 'artisan:app:migrate-data', body: artisan(command: 'app:migrate-data', options: ['skipIfNoEnv', 'showOutput']));

desc(title: 'Generate sitemap');
task(name: 'artisan:app:generate-sitemap', body: artisan(command: 'app:generate-sitemap', options: ['skipIfNoEnv', 'showOutput']));

desc(title: 'Cache lighthouse data');
task(name: 'artisan:lighthouse:cache', body: artisan(command: 'lighthouse:cache', options: ['showOutput']));

desc(title: 'Scout data');
task(name: 'artisan:scout', body: function () {
    // Flush data
    run(command: 'cd {{release_or_current_path}} && php artisan scout:flush "App\Models\Brand"');
    run(command: 'cd {{release_or_current_path}} && php artisan scout:flush "App\Models\Variant"');
    run(command: 'cd {{release_or_current_path}} && php artisan scout:flush "App\Models\Product"');

    // Import data
    run(command: 'cd {{release_or_current_path}} && php artisan scout:import "App\Models\Brand"');
    run(command: 'cd {{release_or_current_path}} && php artisan scout:import "App\Models\Variant"');
    run(command: 'cd {{release_or_current_path}} && php artisan scout:import "App\Models\Product"');
    run(command: 'cd {{release_or_current_path}} && php artisan scout:sync-index-settings');
})->verbose();


desc(title: 'Scout data');
task(name: 'artisan:scout:sync-index-settings', body: function () {
    run(command: 'cd {{release_or_current_path}} && php artisan scout:sync-index-settings');
})->verbose();
