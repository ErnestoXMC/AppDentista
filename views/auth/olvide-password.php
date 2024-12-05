<h1 class="nombre-pagina">Olvide Contraseña</h1>
<p class="descripcion-pagina">Recupera tu contraseña escribiendo tu email a continuación</p>

<?php 
    include_once __DIR__ . '/../templates/alertas.php';
?>
<form action="/olvidar" method="post" class="formulario">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Ingresa tu Email">
    </div>
    <input type="submit" value="Enviar Instrucciones" class="boton">
</form>
<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
</div>

<?php $script = "<script src='build/js/app.js'></script>"; ?>
















