<?php

declare(strict_types=1);
namespace Model;

ini_set("display_errors", 1);

require_once __DIR__ . "/../../vendor/autoload.php";
use Lib\Response;
use Model\Model;

class User extends Model
{
    public function __construct($connection)
    {
        parent::__construct($connection);
        $this->tbl_name = "users";
    }

    public function create_user(string $name, string $email, string $password)
    {
        $query = "INSERT INTO $this->tbl_name(name,email,password) VALUES(?,?,?)";
        $stmt = $this->connection->prepare($query);

        $name = htmlspecialchars(strip_tags($name));
        $email = htmlspecialchars(strip_tags($email));
        $password = htmlspecialchars(strip_tags(password_hash($password, PASSWORD_DEFAULT)));

        $stmt->bind_param("sss", $name, $email, $password);
        return $stmt->execute() ?? false;
    }

    public function get_user_with_email(string $email)
    {
        $query = "SELECT * FROM $this->tbl_name WHERE email = ?";
        $stmt = $this->connection->prepare($query);
        $email = htmlspecialchars(strip_tags($email));

        $stmt->bind_param("s", $email);
        $executed = $stmt->execute() ? true : false;
        $this->execution_error($executed);
        return $stmt->get_result();
    }

    public function get_user_with_id(int $id)
    {
        $query = "SELECT * FROM $this->tbl_name WHERE id = ?";
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param("i", $id);
        $executed = $stmt->execute() ? true : false;
        $this->execution_error($executed);
        return $stmt->get_result();
    }
}