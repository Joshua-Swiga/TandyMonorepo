<?php

declare(strict_types=1);

namespace Deployer;

require __DIR__.'/vendor/deployer/deployer/recipe/provision/website.php';
require __DIR__.'/vendor/deployer/deployer/recipe/laravel.php';
require __DIR__.'/vendor/deployer/deployer/contrib/crontab.php';

require __DIR__.'/deploy/server.php';
require __DIR__.'/deploy/redis.php';
require __DIR__.'/deploy/php.php';
require __DIR__.'/deploy/postgresql.php';
require __DIR__.'/deploy/laravel.php';
require __DIR__.'/deploy/caddy.php';
