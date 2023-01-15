<?php

declare(strict_types=1);
ini_set("display_errors", 1);

require_once __DIR__ . "./../../../vendor/autoload.php";
include_once __DIR__ . "./../../../config/config.php";

use Lib\Router;
use Lib\Controller;
use Lib\Database;
use Module\UploadImage;
use Lib\Response;
use Model\Image;
use Lib\Validator;
use Lib\Serializer;
use Lib\Pagination;

$image = new Router("image", false);
$controller = new Controller();

$image->post(
    "/upload-image",
    fn() => $controller->protected_controller(function ($payload, $body,$response) {
        $image_name = (new UploadImage($_FILES['image_file'], "./../../../images"))->upload_image();

        (!$image_name) && $response->send_response(500, [
            'error' => true,
            'message' => "something went wrong"
        ]);

        $connection = (new Database(config('host'), config('username'), config('password'), config('db_name')))->connect();
        $image = new Image($connection);
        $user_id = $payload->data->id;

        if ($image->add_image($image_name, $user_id)) {
            $response->send_response(200, [
                'error' => false,
                'message' => "image successfully uploaded"
            ]);
        }

        $response->send_response(500, [
            'error' => true,
            'message' => "something went wrong"
        ]);
    }
    )
);

$image->get('/get-image', fn() => $controller->protected_controller(function ($payload, $body,$response) {
    $image_id = intval((new Validator())->validate_query_strings(['id'])['id']);
    $user_id = $payload->data->id;
    $connection = (new Database(config('host'), config('username'), config('password'), config('db_name')))->connect();
    $image = new Image($connection);
    $result = (new Serializer(['id', 'name', 'user_id', 'created_at']))->tuple($image->get_image($image_id,$user_id));
    if($result){
        $response->send_response(200, [
            'error' => false,
            'data' => $result,
        ]);
    }
    $response->send_response(404, [
        'error' => true,
        'message' => "image not found",
    ]);
}));

$image->get('/get-all-images', fn() => $controller->protected_controller(function ($payload, $body,$response) {
    $page = (int)$_GET['page'] ?? 1;
    $limit = (int)$_GET['limit'] ?? 10;

    $user_id = $payload->data->id;
    $params = [
        'page' => $page,
        'results_per_page' => $limit,
        'user_id' =>$user_id
    ];

    $connection = (new Database(config('host'), config('username'), config('password'), config('db_name')))->connect();
    $meta_data = (new Pagination($connection, 'images', ['id', 'name', 'user_id', 'created_at'],$params))->meta_data();

    $response->send_response(200, [
        'error' => false,
        'page' => $page,
        'meta_data' => $meta_data,
    ]);
}
));

$image->delete(
    "/delete-image",
    fn() => $controller->protected_controller(function ($payload, $body,$response) {
        $image_id = intval((new Validator())->validate_query_strings(['id'])['id']);
        $user_id = $payload->data->id;
        $connection = (new Database(config('host'), config('username'), config('password'), config('db_name')))->connect();
        $image = new Image($connection);
        $image_exists = (new Serializer(['name']))->tuple($image->get_image($image_id, $user_id));
        if ($image_exists) {
            $image_path = "./../../../images/" . $image_exists['name'];
            (!file_exists($image_path)) && $response->send_response(404, [
                'error' => true,
                'message' => "image not found on server"
            ]);
            if (unlink($image_path) && $image->delete_image($image_id, $user_id)) {
                $response->send_response(200, [
                    'error' => false,
                    'message' => "image deleted successfully"
                ]);
            }
            $response->send_response(500, [
                'error' => true,
                'message' => "something went wrong"
            ]);
        }
        $response->send_response(404, [
            'error' => true,
            'message' => "image not found"
        ]);
    }
    )
);

$image->run();