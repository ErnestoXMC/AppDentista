<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\AdminController;
use Controllers\APIController;
use Controllers\CitasController;
use Controllers\LoginController;
use MVC\Router;

$router = new Router();

//! AUTENTICACION DE USUARIOS - PUBLICA
//*Iniciar Sesion
$router->get("/", [LoginController::class, 'login']);
$router->post("/", [LoginController::class, 'login']);
$router->get("/logout", [LoginController::class, 'logout']);

//*Recuperar Contraseña
$router->get('/olvidar', [LoginController::class, 'olvidar']);
$router->post('/olvidar', [LoginController::class, 'olvidar']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

//*Crear Cuenta
$router->get('/crear-cuenta', [LoginController::class, 'crearCuenta']);
$router->post('/crear-cuenta', [LoginController::class, 'crearCuenta']);

//*Mensaje
$router->get('/mensaje', [LoginController::class, 'mensaje']);

//*Confirmar
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmarCuenta']);

//! GESTION DE CITAS - PRIVADA
//*Citas
$router->get('/citas', [CitasController::class, 'index']);
//*Admin
$router->get('/admin', [AdminController::class, 'index']);

//! API - SERVICIOS
$router->get('/api/servicios', [APIController::class, 'index']);
$router->post('/api/citas', [APIController::class, 'guardar']);
$router->post('/api/eliminar', [APIController::class, 'eliminar']);



// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();