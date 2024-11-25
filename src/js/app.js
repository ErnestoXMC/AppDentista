let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', ()=>{
    eliminarAlerta();

    if(window.location.pathname.includes('citas')){
        iniciarApp();
    }
})

function eliminarAlerta(){
    const alertas = document.querySelectorAll('.alertas');
    alertas.forEach(alerta=>{
        if(alerta.classList.contains('error')){
            setTimeout(() => {
                alerta.remove();
            }, 10000);
        }else{
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
    });
}

function iniciarApp(){
    mostrarSecciones();
    pagAnterior();
    pagSiguiente();
    botonesPaginador();
    tabs();
    obtenerAPI();

    //Llenando el objeto
    ingresarNombre();
    ingresarFecha();
    ingresarHora();
    ingresarId();
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton =>{
        boton.addEventListener('click', (e)=>{
            paso = parseInt(e.target.dataset.paso);
            mostrarSecciones();
            botonesPaginador();
        })
    })
}

function mostrarSecciones(){
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');

    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }

    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function botonesPaginador(){
    const pagAnte = document.querySelector('#anterior');
    const pagSig = document.querySelector('#siguiente');

    if(paso === 1){
        pagSig.classList.remove('ocultar');
        pagAnte.classList.add('ocultar');
    }else if(paso === 3){
        pagAnte.classList.remove('ocultar');
        pagSig.classList.add('ocultar');
        mostrarResumen();
    }else{
        pagAnte.classList.remove('ocultar');
        pagSig.classList.remove('ocultar');
    }
    mostrarSecciones();
}

function pagAnterior(){
    const pagAnte = document.querySelector('#anterior');
    pagAnte.addEventListener('click', ()=>{
        if(paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    })
}

function pagSiguiente(){
    const pagSig = document.querySelector('#siguiente');
    pagSig.addEventListener('click', ()=>{
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    })
}

async function obtenerAPI(){
   try {
        const url = 'http://localhost:3001/api/servicios';

        const response = await fetch(url);
        const servicios = await response.json();

        mostrarServicios(servicios);

   } catch (error) {
        console.log(error);
   }

}

function mostrarServicios(servicios){

    servicios.forEach(servicio =>{
        const {id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);//* Hacemos un callback
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        const contenedorServicios = document.querySelector('.listado-secciones');
        contenedorServicios.appendChild(servicioDiv);

    })
}

function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;

    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    const existe = servicios.some( service => service.id === id );

    if(existe){
        cita.servicios = servicios.filter(serv => serv.id !== id);
        divServicio.classList.remove('seleccionado');
    }else{
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
}

function ingresarNombre(){
    cita.nombre = document.querySelector('#nombre').value;
}

function ingresarFecha(){

    const inputFecha = document.querySelector('#fecha');

    inputFecha.addEventListener('input', (e)=>{
        const dia = new Date(e.target.value).getUTCDay();

        if([6, 0].includes(dia)){
            cita.fecha = '';
            e.target.value = '';
            mostrarAlerta('No hay atencion los fines de semana', 'error', '#paso-2 .formulario');
        }else{
            cita.fecha = e.target.value;
            removerAlerta();
        }
    })

}

function ingresarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', (e)=>{

        const hora = e.target.value.split(':')[0];
        
        if(hora < 8 || hora >= 20){
            cita.hora = '';
            e.target.value = '';
            mostrarAlerta('Hora no válida', 'error', '#paso-2 .formulario');
        }else{
            cita.hora = e.target.value;
            removerAlerta();
        }
        console.log(cita);
    })
}

function ingresarId(){
    cita.id = document.querySelector('#id').value;
}

function mostrarAlerta(mensaje, tipo, elemento){
    //Solo mostrar una alerta, evitar repetidas
    removerAlerta();

    const divAlerta = document.createElement('DIV');
    divAlerta.classList.add('alertas', `${tipo}`);
    divAlerta.textContent = mensaje;

    //Añadir la alerta previo al formulario
    const referencia = document.querySelector(elemento);
    referencia.parentNode.insertBefore(divAlerta, referencia);

}

function removerAlerta(){
    const alerta = document.querySelector('.alertas');
    if(alerta) alerta.remove();
}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');

    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }
   
    if(Object.values(cita).includes('')){
        mostrarAlerta('Debes seleccionar una fecha y hora', 'error', '.contenido-resumen');
        return;
    }else if(cita.servicios.length === 0){
        mostrarAlerta('Debes seleccionar un servicio', 'error', '.contenido-resumen');
        return;
    }

    removerAlerta();
    const {nombre, fecha, hora, servicios} = cita;

    //*Titulo e informacion
    const tituloResumen = document.createElement('H2');
    tituloResumen.textContent = "Resumen";

    const infoResumen = document.createElement('P');
    infoResumen.classList.add('text-center');
    infoResumen.textContent = 'Verifica que la información sea correcta';

    resumen.appendChild(tituloResumen);
    resumen.appendChild(infoResumen);

    //*Datos personales - Informacion de la cita
    const divInfo = document.createElement('DIV');
    divInfo.classList.add('contenedor-info');

    const tituloInfo = document.createElement('H3');
    tituloInfo.textContent = 'Información de la cita';

    const nombreCita = document.createElement('p');
    nombreCita.innerHTML = `<span>Nombre: </span>${nombre}`;

    //*Formatear fecha
    const fechaObj = new Date(fecha);

    const dia = fechaObj.getDate() + 2;
    const mes = fechaObj.getMonth();
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes, dia));
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);
    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha: </span>${fechaFormateada}`;

    let newHora = parseInt(hora.split(':')[0]);
    let local = (newHora >= 12) ? 'PM' : 'AM';

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora: </span>${hora} ${local}`;

    divInfo.appendChild(tituloInfo);
    divInfo.appendChild(nombreCita);
    divInfo.appendChild(fechaCita);
    divInfo.appendChild(horaCita);

    resumen.appendChild(divInfo);

    //*Servicios seleccionados
    const tituloService = document.createElement('H3');
    tituloService.textContent = 'Servicios Seleccionados';

    resumen.appendChild(tituloService);

    let total = 0;

    servicios.forEach(service =>{
        const divService = document.createElement('DIV');
        divService.classList.add('contenedor-servicio');

        const {id, nombre, precio} = service;

        total += parseFloat(precio);

        const nombreService = document.createElement('P');
        nombreService.textContent = nombre;

        const precioService = document.createElement('P');
        precioService.innerHTML = `<span>Precio: </span>$${precio}`;

        divService.appendChild(nombreService);
        divService.appendChild(precioService);

        resumen.appendChild(divService);
    });

    const totalPagar = document.createElement('P');
    totalPagar.classList.add('total-pagar');
    totalPagar.innerHTML = `<span>Total a pagar: </span>$${total}`;

    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;
    
    resumen.appendChild(totalPagar);
    resumen.appendChild(botonReservar);
}


async function reservarCita(){
    const {id, nombre, fecha, hora, servicios} = cita;
    const idServicios = servicios.map(servicio => servicio.id);

    const datos = new FormData();
    datos.append('usuarioId', id);
    datos.append('nombre', nombre);
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('servicios', idServicios);

    console.log([...datos]);
    
    try {
        const url = 'http://localhost:3001/api/citas';
        const response = await fetch(url, {
            method: 'POST',
            body: datos
        })

        result = await response.json();
        if(result.cita && result.citaServicio){
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "¡Tu cita fue creada correctamente!",
                customClass: {
                    popup: 'swal-custom-popup', // contenedor
                    icon: 'swal-custom-icon',  // ícono
                    title: 'swal-custom-title', // título
                    confirmButton: 'swal-custom-button' // botón
                }
            }).then(() => {
                window.location.reload();
            });
        }
        console.log(result);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al crear la cita",
            customClass: {
                popup: 'swal-custom-popup', // contenedor
                icon: 'swal-custom-icon',  // ícono
                title: 'swal-custom-title', // título
                confirmButton: 'swal-custom-button' // botón
            }
          }).then(()=>{
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });
        console.log(error);
    }
}




















