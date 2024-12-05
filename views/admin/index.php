<h1 class="nombre-pagina">Panel de Administrador</h1>

<?php include_once __DIR__ . "/../templates/barra.php"?>

<h2>Buscar Cita</h2>

<div class="busqueda">
    <form action="" class="fomulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" name="fecha" id="fecha" value="<?php echo $fecha;?>">
        </div>
    </form> 
</div>

<div class="citas-admin">
    <h2>Citas</h2>
    <ul>
        <?php if(count($citas) === 0){?>
            <p class="text-center">No se encontraron citas.</p>
        <?php } ?>
        <?php $idCita = 0;
                foreach($citas as $key => $cita){
                    
                    if($idCita !== $cita->id){
                        $total = 0; ?>
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
                                <p>Precio: <span>$<?php echo $cita->precio; ?></span></p>
                            </div>
                        <?php   $actual = $cita->id;
                                $proximo = $citas[$key + 1]->id;
                                $total += $cita->precio;

                                if($actual !== $proximo){?>
                                    <p class="servicio-total">Total: <span>$<?php echo $total; ?></span></p>
                                <?php } ?>
                </li>
        <?php } ?>
    </ul>
</div>

<?php echo "<script src='build/js/buscador.js'></script>"; ?>












