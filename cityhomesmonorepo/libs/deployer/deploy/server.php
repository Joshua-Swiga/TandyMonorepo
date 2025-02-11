<?php

declare(strict_types=1);

namespace Deployer;

use function Deployer\Support\parse_home_dir;

desc(title: 'Checks pre-required state');
task(name: 'server:check', body: function () {
    if (get(name: 'remote_user') !== 'root' && get(name: 'become') !== 'root') {
        warning(message: '');
        warning(message: 'Run server as root: -o remote_user=root');
        warning(message: 'or with a sudo enabled user: -o become=root');
        warning(message: '');
    }

    $release = run(command: 'cat /etc/os-release');
    ['NAME' => $name] = parse_ini_string(ini_string: $release);
    if ($name !== 'Ubuntu') {
        warning(message: '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        warning(message: '!!                                    !!');
        warning(message: '!!     Only Ubuntu are supported!     !!');
        warning(message: '!!                                    !!');
        warning(message: '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }

    $description = run(command: 'lsb_release -ds');
    $release = run(command: 'lsb_release -cs');

    info(message: "Success! Connected to $description [$release] via SSH.");

})->oncePerNode();

desc(title: 'Set OS timezone');
task(name: 'server:timezone', body: function () {
    $timezone = get(name: 'timezone', default: 'UTC');

    run(command: "sudo timedatectl set-timezone $timezone");

    run(command: 'timedatectl');
})
    ->oncePerNode();

desc(title: 'Set OS locale');
task(name: 'server:locale', body: function () {
    run(command: "sudo sed -i '/^#.* en_GB.* /s/^#//' /etc/locale.gen");

    run(command: 'sudo locale-gen');

    run(command: 'locale -a');
});

desc(title: 'Adds repository and update packages');
task(name: 'server:update', body: function () {
    // Update
    run(command: 'apt-get update', options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive']]);
})
    ->oncePerNode();

desc(title: 'Upgrades all packages');
task(name: 'server:upgrade', body: function () {
    run(command: 'apt-get upgrade -y', options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive'], 'timeout' => 900]);
})
    ->oncePerNode();

desc(title: 'Installs base packages');
task(name: 'server:install', body: function () {
    $packages = [
        'acl',
        'apt-transport-https',
        'build-essential',
        'curl',
        'debian-archive-keyring',
        'debian-keyring',
        'fail2ban',
        'gcc',
        'git',
        'gpg',
        'libmcrypt4',
        'libpcre3-dev',
        'libsqlite3-dev',
        'make',
        'ncdu',
        'pkg-config',
        'python-is-python3',
        'supervisor',
        'ufw',
        'unzip',
        'uuid-runtime',
        'whois',
    ];
    run(command: 'apt-get install -y '.implode(separator: ' ', array: $packages), options: ['env' => ['DEBIAN_FRONTEND' => 'noninteractive'], 'timeout' => 900]);
})
    ->oncePerNode();

desc(title: 'Setups a firewall');
task(name: 'server:firewall', body: function () {
    run(command: 'ufw allow 22');
    run(command: 'ufw allow 80');
    run(command: 'ufw allow 443');
    run(command: 'ufw --force enable');
})
    ->oncePerNode();

set('sudo_password', function () {
    return askHiddenResponse(message: ' To continue, please enter password for sudo: ');
});

desc(title: 'Setups a deployer user');
task(name: 'server:deployer', body: function () {
    if (test('id deployer >/dev/null 2>&1')) {
        // TODO: Check what created deployer user configured correctly.
        // TODO: Update sudo_password of deployer user.
        // TODO: Copy ssh_copy_id to deployer ssh dir.
        info(message: 'Deployer user already exist!');
    } else {
        run(command: 'useradd deployer');
        run(command: 'mkdir -p /home/deployer/.ssh');
        run(command: 'mkdir -p /home/deployer/.deployer');
        run(command: 'adduser deployer sudo');

        run(command: 'chsh -s /bin/bash deployer');
        run(command: 'cp /root/.profile /home/deployer/.profile');
        run(command: 'cp /root/.bashrc /home/deployer/.bashrc');

        // Make color prompt.
        run(command: "sed -i 's/#force_color_prompt=yes/force_color_prompt=yes/' /home/deployer/.bashrc");

        $password = run(command: "mkpasswd -m sha-512 '%secret%'", options: ['secret' => get(name: 'sudo_password')]);
        run(command: "usermod --password '%secret%' deployer", options: ['secret' => $password]);

        if (! empty(get(name: 'ssh_copy_id'))) {
            $file = parse_home_dir(path: get(name: 'ssh_copy_id'));
            if (! file_exists(filename: $file)) {
                info(message: 'Configure path to your public key.');
                writeln(message: '');
                writeln(message: "    set(<info>'ssh_copy_id'</info>, <info>'~/.ssh/id_ed25519.pub'</info>);");
                writeln(message: '');
                $file = ask(message: ' Specify path to your public ssh key: ', default: '~/.ssh/id_ed25519.pub');
            }
            run(command: 'echo "$KEY" >> /root/.ssh/authorized_keys', options: ['env' => ['KEY' => file_get_contents(filename: parse_home_dir(path: $file))]]);
        }
        run(command: 'cp /root/.ssh/authorized_keys /home/deployer/.ssh/authorized_keys');
        run(command: 'ssh-keygen -f /home/deployer/.ssh/id_rsa -t rsa -N ""');

        run(command: 'chown -R deployer:deployer /home/deployer');
        run(command: 'chmod -R 755 /home/deployer');
        run(command: 'chmod 700 /home/deployer/.ssh/id_rsa');

        run(command: 'usermod -a -G www-data deployer');
        run(command: 'groups deployer');

        info(message: 'Configured deployer user successfully!');
    }
})->oncePerNode();

desc(title: 'Verifies what provision was successful');
task(name: 'server:verify', body: function () {
    fetch(url: '{{domain}}', method: 'get', headers: [], body: null, info: $info, nothrow: true);
    if ($info['http_code'] === 404) {
        info(message: 'provisioned successfully!');
    }
});
