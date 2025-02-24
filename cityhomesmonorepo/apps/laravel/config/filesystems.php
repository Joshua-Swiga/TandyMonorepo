<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    |   Below are examples of configuraions to be done.
    |   you can modify the configuration to reflect your storage preferences and credentials
    |
    |
    |
    |
    */

    'disks' => [

        // Used for local storage. Default path: storage/app/...
        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
            'throw' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
            'throw' => false,
        ],

        // Externall dirve. Use for deployment on Amazon s3 cloud storage services.
        'r2' => [
            'driver'                  => 's3',
            'key'                     => env(key: 'R2_ACCESS_KEY_ID'),
            'secret'                  => env(key: 'R2_SECRET_ACCESS_KEY'),
            'region'                  => 'auto',
            'bucket'                  => env(key: 'R2_BUCKET'),
            'url'                     => env(key: 'R2_URL'),
            'endpoint'                => env(key: 'R2_ENDPOINT'),
            'use_path_style_endpoint' => env(key: 'R2_USE_PATH_STYLE_ENDPOINT', default: false),
            'throw'                   => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | Here you may configure the symbolic links that will be created when the
    | `storage:link` Artisan command is executed. The array keys should be
    | the locations of the links and the values should be their targets.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];

// Public path for the storage is hidden.
