<?php

    include 'bd/BD.php';

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: access");


if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from usuarios where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from usuarios";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}


header("HTTP/1.1 400 Bad Request");

?>