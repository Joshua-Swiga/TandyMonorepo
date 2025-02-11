<?php

declare(strict_types=1);

namespace Deployer;

# Install PostgreSQL
desc(title: 'Provision PostgreSQL');
task(name: 'postgresql:install', body: function () {
    # Import the repository signing key:
    run(command: 'install -d /usr/share/postgresql-common/pgdg');
    run(command: 'curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc');

    # Create the repository configuration file:
    run(command: 'sh -c \'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list\'');

    # Update the package lists:
    run(command: 'apt-get update');

    // Install specific version
    run(command: 'apt-get install -y postgresql-client-{{pg_version}} postgresql-{{pg_version}}', options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive'], 'timeout' => 900]);
});

desc(title: 'Verify PostgreSQL');
task(name: 'postgresql:verify', body: function () {
    run(command: 'psql --version');
})->verbose();

set(name: 'db_database', value: function () {
    return ask(message: ' Enter DB_DATABASE: ');
});

set(name: 'db_username', value: function () {
    return ask(message: ' Enter DB_USERNAME: ');
});

set(name: 'db_secret', value: function () {
    return askHiddenResponse(message: ' Enter DB_PASSWORD: ');
});

desc(title: 'Provision PostgreSQL');
task(name: 'postgresql:create', body: function () {
    $database = get(name: 'db_database');
    $username = get(name: 'db_username');
    $secret = get(name: 'db_secret');

    run(command: "cd /tmp && sudo -u postgres psql <<< $'CREATE DATABASE $database;'", );

    run(command: "cd /tmp && sudo -u postgres psql <<< $'CREATE USER $username WITH ENCRYPTED PASSWORD \'$secret\';'", );

    run(command: "cd /tmp && sudo -u postgres psql <<< $'GRANT ALL ON DATABASE $database TO $username;'", );

    run(command: "cd /tmp && sudo -u postgres psql <<< $'ALTER DATABASE $database OWNER TO $username;'", );

    # PostgresSQL 15+
    run(command: "cd /tmp && sudo -u postgres psql <<< $'GRANT ALL ON SCHEMA public TO $username;'", );
});

desc(title: 'List all PostgreSQL users');
task(name: 'postgresql:list:users', body: function () {
    run(command: 'cd /tmp && sudo -u postgres psql -c "\du"');
})->verbose();

desc(title: 'List all PostgreSQL databases');
task(name: 'postgresql:list:db', body: function () {
    run(command: 'cd /tmp && sudo -u postgres psql -c "\l"');
})->verbose();

desc(title: 'Restart PostgreSQL');
task(name: 'postgresql:restart', body: function () {
    run(command: "sudo service postgresql restart");
})->verbose();
