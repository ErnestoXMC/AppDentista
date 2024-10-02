<?php
    foreach($alertas as $tipo => $mensajes){
        foreach($mensajes as $mensaje){
?>
    <div class="alertas <?php echo $tipo; ?>">
        <?php echo $mensaje; ?>
    </div>
<?php        
        }
    }
    ?>













