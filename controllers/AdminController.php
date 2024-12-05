<?php

namespace Controllers;

use Model\AdminCita;
use MVC\Router;

class AdminController {

    public static function index(Router $router) {
        session_start();

        $fechaUrl = $_GET['fecha'] ?? date("Y-m-d");
        $fecha = explode("-", $fechaUrl);

        if(!checkdate($fecha[1], $fecha[2], $fecha[0])){
            header("Location: /404");
        }

        $nombre = $_SESSION['nombre'];

        $consulta = "SELECT citas.id, citas.hora, CONCAT( usuarios.nombre, ' ', usuarios.apellido) as cliente, ";
        $consulta .= " usuarios.email, usuarios.telefono, servicios.nombre as servicio, servicios.precio  ";
        $consulta .= " FROM citas  ";
        $consulta .= " LEFT OUTER JOIN usuarios ";
        $consulta .= " ON citas.usuarioId=usuarios.id  ";
        $consulta .= " LEFT OUTER JOIN citasServicios ";
        $consulta .= " ON citasServicios.citaId=citas.id ";
        $consulta .= " LEFT OUTER JOIN servicios ";
        $consulta .= " ON servicios.id=citasServicios.servicioId ";
        $consulta .= " WHERE fecha =  '{$fechaUrl}' ";

        $citas = AdminCita::SQL($consulta);

        $router->render('admin/index', [
            'nombre' => $nombre,
            'citas' => $citas,
            'fecha' => $fechaUrl
        ]);
    }
}
?>