<h1 class="nombre-pagina">Crear Nueva Cita</h1>
<p class="descripcion-pagina">Elige tus servicios e ingresa tus datos</p>

<?php include_once __DIR__ . "/../templates/barra.php"?>

<div id="app">
    <!--Navegacion-->
    <nav class="tabs"> 
        <button type="button" data-paso="1">Servicios</button>
        <button type="button" data-paso="2">Información Cita</button>
        <button type="button" data-paso="3">Resumen</button>
        <button type="button" data-paso="4">Historial de Citas</button>
    </nav>

    <!--Secciones-inicio-->
    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios a continuación</p>
        <div id="servicios" class="listado-secciones"></div>
    </div>

    <div id="paso-2" class="seccion">
        <h2>Tus Datos y Cita</h2>
        <p class="text-center">Ingresa tus datos y la fecha de tu cita</p>

        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" value="<?php echo $nombre; ?>" disabled>
            </div>

            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" name="fecha" id="fecha" min="<?php echo date('Y-m-d', strtotime('+1 day')); ?>">
            </div>

            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" name="hora" id="hora">
            </div>
            <input type="hidden" name="id" id="id" value="<?php echo $id;?>">
        </form>
    </div>

    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Resumen</h2>
        <p class="text-center">Verifica que la información sea correcta</p>
    </div>

    <div id="paso-4" class="seccion contenido-resumen">
       <input type="hidden" name="id" value="<?php echo $id; ?>">
    </div>
     <!--Secciones-fin-->

     <!--Paginacion-->
     <div class="paginacion">
        <button class="boton" id="anterior">&laquo; Anterior</button>
        <button class="boton" id="siguiente">Siguiente &raquo;</button>
     </div>

</div>

<?php $script = "<script src='build/js/app.js'></script>"; ?>
<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>






















