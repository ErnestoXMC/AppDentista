<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController{

    public static function login(Router $router){
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

            $auth = new Usuario($_POST);
            $alertas = $auth->validarLogin();
            
            if(empty($alertas)){
                //Verificar que el usuario exista
                $usuario = Usuario::where('email', $auth->email);

                if(!is_null($usuario)){
                    $resultPassword = $usuario->verificarPassword($auth->password);

                    if($resultPassword){
                        $resultConfirmado = $usuario->verificarCuenta();

                        if($resultConfirmado){
                            session_start();

                            $_SESSION['id'] = $usuario->id;
                            $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                            $_SESSION['email'] = $usuario->email;
                            $_SESSION['login'] = true;
                            
                            if($usuario->admin){
                                $_SESSION['admin'] = $usuario->admin ?? null;
                                header("Location: /admin");
                            }else{
                                $_SESSION['admin'] = null;
                                header("Location: /citas");
                            }
                        }
                    }
                    
                }else{
                    Usuario::setAlerta('error', 'Usuario no encontrado');
                }
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/login', [
            "alertas" => $alertas
        ]);
    }

    public static function logout(){
        session_start();
        $_SESSION = [];

        header("Location: /");
    }

    public static function olvidar(Router $router){
        $alertas = [];
        
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $auth = new Usuario($_POST);
            $alertas = $auth->validarEmail();

            if(empty($alertas)){
                //Validar la existencia del usuario
                $usuario = Usuario::where('email', $auth->email);
                if($usuario){
                    if($usuario->confirmado === '1'){
                        $usuario->crearToken();
                        $usuario->guardar();

                        $email = new Email($usuario->nombre, $usuario->email, $usuario->token);
                        $email->enviarInstrucciones();

                        Usuario::setAlerta('exito', 'Revisa tu correo');

                    } else{
                        Usuario::setAlerta('error', 'El usuario no esta confirmado');
                    }
                }else{
                    Usuario::setAlerta('error', 'El usuario no existe');
                }
            }
        }
        $alertas = Usuario::getAlertas();

        $router->render('auth/olvide-password', [
            'alertas' => $alertas
        ]);
    }

    public static function recuperar(Router $router){
        $alertas = [];
        $token = s($_GET['token']);
        $error = false;

        if($token){
            $usuario = Usuario::where('token', $token);
            if($usuario){

               if($_SERVER['REQUEST_METHOD'] === 'POST'){
                    $auth = new Usuario($_POST);
                    $alertas = $auth->validarPassword();

                    if(empty($alertas)){

                        $usuario->password = null;
                        $usuario->password = $auth->password;
                        $usuario->hashPassword();

                        $usuario->token = null;

                        $resultado = $usuario->guardar();

                        if($resultado){
                            header('Location: /');
                        }
                    }
               }
            }else{
                Usuario::setAlerta('error', 'El Token es invalido');
                $error = true;
            }
        }else{
            Usuario::setAlerta('error', 'El Token No existe');
            $error = true;
        }
        
        $alertas = Usuario::getAlertas();

        $router->render('auth/recuperar-password', [
            'alertas' => $alertas,
            'error' => $error
        ]);
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
                Usuario::setAlerta('exito', "Tu cuenta ha sido confirmada");
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






