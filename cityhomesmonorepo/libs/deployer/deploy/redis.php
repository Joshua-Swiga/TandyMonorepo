<?php

declare(strict_types=1);

namespace Deployer;

desc(title: 'Install redis');
task(name: 'redis:install', body: function () {
    run(command: 'curl -fsSL https://packages.redis.io/gpg | sudo gpg --no-tty --yes --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg');

    run(command: 'echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list');

    run(command: 'sudo apt-get update');

    run(command: 'sudo apt-get install redis -y', options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive']]);

    info(message: 'Redis installed');
})->verbose();

desc(title: 'Verify redis');
task(name: 'redis:verify', body: function () {
    run(command: 'redis-cli -h 127.0.0.1 -p 6379 ping');
})->verbose();
