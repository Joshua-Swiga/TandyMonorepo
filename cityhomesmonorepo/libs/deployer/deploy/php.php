<?php

declare(strict_types=1);

namespace Deployer;

desc(title: 'Add php  repositories and update');
task(name: 'php:update', body: function () {
    // PHP
    run(command: 'apt-add-repository ppa:ondrej/php -y', options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive']]);

    // Update
    run(command: 'apt-get update', options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive']]);
})->oncePerNode();

set('php_version', function () {
    return ask(message: ' What PHP version to install? ', default: '8.3', autocomplete: ['8.3', '8.2']);
});

desc(title: 'Installs PHP packages');
task(name: 'php:install', body: function () {
    $version = get(name: 'php_version');
    info(message: "Installing PHP $version");
    $packages = [
        "php$version-bcmath",
        "php$version-cli",
        "php$version-curl",
        "php$version-dev",
        "php$version-fpm",
        "php$version-gd",
        "php$version-imap",
        "php$version-intl",
        "php$version-mbstring",
        "php$version-pgsql",
        "php$version-readline",
        "php$version-soap",
        "php$version-xml",
        "php$version-zip",
    ];

    run(command: 'apt-get install -y ' . implode(separator: ' ', array: $packages), options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive']]);

    // Configure PHP-CLI
    run(command: "sudo sed -i 's/error_reporting = .*/error_reporting = E_ALL/' /etc/php/$version/cli/php.ini");
    run(command: "sudo sed -i 's/display_errors = .*/display_errors = On/' /etc/php/$version/cli/php.ini");
    run(command: "sudo sed -i 's/memory_limit = .*/memory_limit = 512M/' /etc/php/$version/cli/php.ini");
    run(command: "sudo sed -i 's/upload_max_filesize = .*/upload_max_filesize = 128M/' /etc/php/$version/cli/php.ini");
    run(command: "sudo sed -i 's/;date.timezone.*/date.timezone = UTC/' /etc/php/$version/cli/php.ini");

    // Configure PHP-FPM
    run(command: "sed -i 's/error_reporting = .*/error_reporting = E_ALL/' /etc/php/$version/fpm/php.ini");
    run(command: "sed -i 's/display_errors = .*/display_errors = On/' /etc/php/$version/fpm/php.ini");
    run(command: "sed -i 's/memory_limit = .*/memory_limit = 512M/' /etc/php/$version/fpm/php.ini");
    run(command: "sed -i 's/upload_max_filesize = .*/upload_max_filesize = 128M/' /etc/php/$version/fpm/php.ini");
    run(command: "sed -i 's/;date.timezone.*/date.timezone = UTC/' /etc/php/$version/fpm/php.ini");
    run(command: "sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/' /etc/php/$version/fpm/php.ini");

    // Configure FPM Pool
    run(command: "sed -i 's/;request_terminate_timeout = .*/request_terminate_timeout = 60/' /etc/php/$version/fpm/pool.d/www.conf");
    run(command: "sed -i 's/;catch_workers_output = .*/catch_workers_output = yes/' /etc/php/$version/fpm/pool.d/www.conf");
    run(command: "sed -i 's/;php_flag\[display_errors\] = .*/php_flag[display_errors] = yes/' /etc/php/$version/fpm/pool.d/www.conf");
    run(command: "sed -i 's/;php_admin_value\[error_log\] = .*/php_admin_value[error_log] = \/var\/log\/fpm-php.www.log/' /etc/php/$version/fpm/pool.d/www.conf");
    run(command: "sed -i 's/;php_admin_flag\[log_errors\] = .*/php_admin_flag[log_errors] = on/' /etc/php/$version/fpm/pool.d/www.conf");

    // Configure PHP sessions directory
    run(command: 'chmod 733 /var/lib/php/sessions');
    run(command: 'chmod +t /var/lib/php/sessions');
})
    ->limit(limit: 1);

desc(title: 'Installs Composer');
task(name: 'php:composer', body: function () {
    run(command: 'curl -sS https://getcomposer.org/installer | php');
    run(command: 'mv composer.phar /usr/local/bin/composer');
})->oncePerNode();

desc(title: 'Upgrades all packages');
task(name: 'php:verify', body: function () {
    run(command: 'php -v');
    run(command: 'composer about');
})->verbose();
