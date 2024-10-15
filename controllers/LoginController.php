<?php

namespace Controllers;

use Classes\Email;
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
                    //Instancia de Email
                    $email = new Email($usuario->nombre, $usuario->email, $usuario->token);
                    $email->confirmarCuenta();

                    $resultado = $usuario->guardar();
                    
                    if($resultado){
                        header("Location: /mensaje");
                    }
               }

            }
            
        }
        
        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router){
        $router->render('auth/mensaje');
    }

    public static function confirmarCuenta(Router $router){
        $alertas = [];

        $token = s($_GET['token']);
        
        if($token){
            $usuario = Usuario::where('token', $token);
            if($usuario){

                $usuario->token = null;
                $usuario->confirmado = '1';

                $usuario->guardar();
                Usuario::setAlerta('exito', "El token ha sido validado");
            }else{
                Usuario::setAlerta('error', "El token es invalido");
            }
        }else{
            Usuario::setAlerta('error', "El token no existe");
        }
        $alertas = Usuario::getAlertas();

        $router->render('auth/confirmar-cuenta', [
            "alertas" => $alertas
        ]);
    }
}

?>






