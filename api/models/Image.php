<?php

declare(strict_types=1);
namespace Model;
ini_set("display_errors", 1);

require_once __DIR__ . "/../../vendor/autoload.php";
use Model\Model;

class Image extends Model
{
    public function __construct($connection)
    {
        parent::__construct($connection);
        $this->tbl_name = "images";
    }

    public function add_image($name, $user_id)
    {
        $query = "INSERT INTO $this->tbl_name(name,user_id) VALUES(?,?)";
        $stmt = $this->connection->prepare($query);

        $name = htmlspecialchars(strip_tags($name));

        $stmt->bind_param("si", $name, $user_id);
        return $stmt->execute() ?? false;
    }

    public function get_image(int $id,int $user_id){
        $query = "SELECT * FROM $this->tbl_name WHERE id = ? AND user_id = ?";
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param("ii", $id,$user_id);
        $executed = $stmt->execute() ? true : false;
        $this->execution_error($executed);
        return $stmt->get_result();
    }

    public function delete_image($id,$user_id){
        $query = "DELETE FROM $this->tbl_name WHERE id = ? AND user_id = ?";
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param("ii", $id, $user_id);
        return $stmt->execute() ?? false;        
    }
}