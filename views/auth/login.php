<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia Sesión con tus datos</p>

<?php 
    include_once __DIR__ . '/../templates/alertas.php';
?>


<form class="formulario" action="/" method="post">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Ingresa Tu Email">
    </div>
    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" name="password" id="password" placeholder="Ingresa Tu Contraseña">
    </div>

    <input type="submit" value="Iniciar Sesión" class="boton">
</form>

<div class="acciones">
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
    <a href="/olvidar">¿Olvidaste tu contraseña?</a>
</div>

<?php $script = "<script src='build/js/app.js'></script>"; ?>





























