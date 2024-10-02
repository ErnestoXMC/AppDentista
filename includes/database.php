<?php

$db = mysqli_connect('localhost', 'root', '975179971', 'db_dentista');


if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "Error de depuración: " . mysqli_connect_errno();
    echo "Error de depuración: " . mysqli_connect_error();
    exit;
}
