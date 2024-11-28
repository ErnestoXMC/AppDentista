<h1 class="nombre-pagina">Panel de Administrador</h1>

<?php include_once __DIR__ . "/../templates/barra.php"?>

<h2>Buscar Cita</h2>

<div class="busqueda">
    <form action="" class="fomulario" method="POST">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" name="fecha" id="fecha" value="<?php echo date("Y-m-d");?>">
        </div>
    </form> 
</div>

<div class="citas-admin">
    <h2>Citas</h2>
    <ul>
        <?php $idCita = 0;
                foreach($citas as $cita){
                    if($idCita !== $cita->id){?>
                        <li>
                            <p>N° Cita: <span><?php echo $cita->id; ?></span></p>
                            <p>Hora: <span><?php echo $cita->hora; ?></span></p>
                            <p>Cliente: <span><?php echo $cita->cliente; ?></span></p>
                            <p>Email: <span><?php echo $cita->email; ?></span></p>
                            <p>Teléfono: <span><?php echo $cita->telefono; ?></span></p>
                            <h3>Servicios</h3>
                    <?php $idCita = $cita->id;
                            } ?>
                            <div class="servicios-admin">
                                <p>Servicio: <span><?php echo $cita->servicio; ?></span></p>
                                <p>Precio: <span><?php echo $cita->precio; ?></span></p>
                            </div>
                </li>
        <?php } ?>
    </ul>
</div>













