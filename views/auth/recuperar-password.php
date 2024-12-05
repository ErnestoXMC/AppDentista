<h1 class="nombre-pagina">Reestablecer Contraseña</h1>
<p class="descripcion-pagina">Reestablece tu contraseña en el siguiente formulario</p>

<?php 
    include_once __DIR__ . '/../templates/alertas.php';
?>

<?php if($error) return; ?>

<form method="POST" class="formulario">
    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" name="password" id="password" placeholder="Ingresa tu nueva contraseña">
    </div>
    <input type="submit" value="Guardar Cambios" class="boton">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
</div>

<?php $script = "<script src='build/js/app.js'></script>"; ?>







