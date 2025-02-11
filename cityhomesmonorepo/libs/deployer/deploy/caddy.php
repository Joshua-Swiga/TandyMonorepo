<?php

declare(strict_types=1);

namespace Deployer;

desc(title: 'Install caddy');
task(name: 'caddy:install', body: function () {
    // Caddy repository
    run(command: "curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg");
    run(command: "curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list");

    // Update
    run(command: 'apt-get update', options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive']]);

    run(command: 'sudo apt install caddy');

    run(command: 'usermod -a -G caddy deployer');

    info(message: 'Caddy installed');
})->oncePerNode();

desc(title: 'Verify caddy');
task(name: 'caddy:verify', body: function () {
    run(command: 'caddy version');
})->verbose();

desc('Check caddy status');
task('caddy:status', function () {
    run(command: 'systemctl status caddy');
})->verbose();

desc('Reload caddy server');
task('caddy:reload', function () {
    run(command: 'systemctl reload caddy');
})->verbose();
