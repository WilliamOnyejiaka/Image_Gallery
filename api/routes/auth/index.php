<?php

declare(strict_types=1);
ini_set("display_errors", 1);

require_once __DIR__ . "/../../../vendor/autoload.php";
include_once __DIR__ . "/../../../config/config.php";



use Lib\Router;
use Lib\Controller;
use Lib\Database;
use Model\User;
use Lib\Validator;
use Lib\Serializer;
use Lib\Response;
use \Firebase\JWT\JWT;
use Lib\TokenAttributes;


$auth = new Router("auth", false);
$controller = new Controller();

$auth->post(
    "/sign-up",
    fn() => $controller->public_controller(function ($body,$response) {
        $connection = (new Database(config("host"), config("username"), config("password"), config("db_name")))->connect();
        $validator = new Validator();
        $validator->validate_body($body, ["name", "email", "password"]);
        $validator->validate_email_with_response($body->email);
        $validator->validate_password_with_response($body->password, 5);

        $user = new User($connection);
        $email_exits = (new Serializer(['email']))->tuple($user->get_user_with_email($body->email));

        if (!$email_exits) {
            if ($user->create_user($body->name, $body->email, $body->password)) {
                $response->send_response(201, [
                    'error' => false,
                    'message' => "user created successfully"
                ]);
            } else {
                $response->send_response(500, [
                    'error' => true,
                    'message' => "something went wrong"
                ]);
            }

        }
        $response->send_response(400, [
            'error' => true,
            'message' => "email already taken"
        ]);
    }
    )
);

$auth->get('/login', fn() => $controller->public_controller(function ($body,$response) {

    $email = $_SERVER['PHP_AUTH_USER'] ?? null;
    $password = $_SERVER['PHP_AUTH_PW'] ?? null;

    $connection = (new Database(config("host"), config("username"), config("password"), config("db_name")))->connect();
    $user = new User($connection);
    $current_user = (new Serializer(["email", "password"]))->tuple($user->get_user_with_email($email));

    if($current_user){
        if(password_verify($password,$current_user['password'])){
            $active_user = (new Serializer(["id","name","email", "created_at","updated_at"]))->tuple($user->get_user_with_email($email));
            $token_attributes = new TokenAttributes($active_user);
            $access_token = JWT::encode($token_attributes->access_token_payload(), config("secret_key"), config("hash"));
            $refresh_token = JWT::encode($token_attributes->refresh_token_payload(), config("secret_key"), config("hash"));
            $response->send_response(200, [
                'error' => false,
                'data' => [
                    'user' => $active_user,
                    'access_token' => $access_token,
                    'refresh_token' => $refresh_token
            ]]);
        }
        $response->send_response(200, [
            'error' => true,
            'message' => "invalid password"
        ]);
    }
    $response->send_response(404, [
        'error' => true,
        'message' => "email not found"
    ]);
}));

$auth->get('/token/access-token',fn() => $controller->access_token_controller(function ($payload, $body,$response) {
    $user = new User((new Database(config("host"), config("username"), config("password"), config("db_name")))->connect());
    $active_user = (new Serializer(['id']))->tuple($user->get_user_with_id($payload->data->id));
    if($active_user){
        $access_token = JWT::encode((new TokenAttributes($active_user))->access_token_payload(),config('secret_key'),config('hash'));
        $response->send_response(201, [
            'error' => false,
            'access_token' => $access_token
        ]);
    }
    
    $response->send_response(404, [
        'error' => true,
        'message' => "user does not exist"
    ]);
}));

$auth->run();