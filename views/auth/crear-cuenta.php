<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcion-pagina">Inicia Sesión con tus Datos</p>

<form action="/crear-cuenta" method="post" class="formulario">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre" placeholder="Ingresa Tu Nombre">
    </div>
    <div class="campo">
        <label for="apellido">Apellidos</label>
        <input type="text" name="apellido" id="apellido" placeholder="Ingresa Tus Apellidos">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input type="text" name="telefono" id="telefono" placeholder="Ingresa Tu Teléfono">
    </div>
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Ingresa Tu Email">
    </div>
    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" name="password" id="password" placeholder="Ingresa Tu Contraseña">
    </div>
    <input type="submit" value="Crear Cuenta" class="boton">
</form>
<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/olvidar">¿Olvidaste tu contraseña?</a>
</div>














