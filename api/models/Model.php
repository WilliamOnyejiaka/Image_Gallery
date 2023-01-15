<?php

declare(strict_types=1);
namespace Model;
ini_set('display_errors',true);

require_once __DIR__ ."./../../vendor/autoload.php";

use Lib\Response;
class Model {

    protected $connection;
    protected string $tbl_name;
    protected Response $response;

    public function __construct($connection){
        $this->connection = $connection;
        $this->response = new Response();
    }

    protected function execution_error($executed)
    {
        if (!$executed) {
            $this->response->send_response(500, [
                'error' => true,
                'message' => "something went wrong"
            ]);
            exit();
        }
    }
}