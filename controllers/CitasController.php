<?php

namespace Controllers;

use MVC\Router;

class CitasController{
    public static function index(Router $router){
        session_start();
        $nombre = $_SESSION['nombre'];

        $router->render('cita/index', [
            'nombre' => $nombre
        ]);
    }
}
?>