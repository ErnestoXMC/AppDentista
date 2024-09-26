<?php

namespace Controllers;
use MVC\Router;

class LoginController{

    public static function login(Router $router){
       $router->render('auth/login');
    }

    public static function logout(){
        echo "Desde Logout";
    }

    public static function olvidar(Router $router){
        $router->render('auth/olvide-password');
    }

    public static function recuperar(){
        echo "Desde recuperar contraseña";
    }

    public static function crearCuenta(Router $router){
        $router->render('auth/crear-cuenta');
    }
}

?>






