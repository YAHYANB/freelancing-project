<?php
/**
 * PayPal Setting & API Credentials
 * Created by Raza Mehdi <srmk@outlook.com>.
 */

return [
    'client_id' => env('PAYPAL_SANDBOX_CLIENT_ID'),
    'secret' => env('PAYPAL_SANDBOX_CLIENT_SECRET'),
    'settings' => [
        'mode' => env('PAYPAL_MODE', 'sandbox'),
        'http.ConnectionTimeOut' => 30,
        'log.LogEnabled' => true,
        'log.FileName' => storage_path('/logs/paypal.log'),
        'log.LogLevel' => 'DEBUG',
        'website_percentage' => '5'
    ],

    // 'payment_action' => env('PAYPAL_PAYMENT_ACTION', 'Sale'), // Can only be 'Sale', 'Authorization' or 'Order'
    // 'currency' => env('PAYPAL_CURRENCY', 'USD'),
    // 'notify_url' => env('PAYPAL_NOTIFY_URL', ''), // Change this accordingly for your application.
    // 'locale' => env('PAYPAL_LOCALE', 'en_US'), // force gateway language  i.e. it_IT, es_ES, en_US ... (for express checkout only)
    // 'validate_ssl' => env('PAYPAL_VALIDATE_SSL', true), // Validate SSL when creating api client.
];