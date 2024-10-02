<?php

namespace Controllers;

use Model\Usuario;
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
        $usuario = new Usuario;
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta();

            if(empty($alertas)){
               //Verificar la existencia del usuario
               $resultado = $usuario->verificarEmail();
               if($resultado->num_rows){
                    $alertas = Usuario::getAlertas();
               }else{
                    //Hashear contraseña
                    $usuario->hashPassword();
                    //Crear token
                    $usuario->crearToken();
                    debuguear($usuario);
               }

            }
        }
        
        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }
}

?>






