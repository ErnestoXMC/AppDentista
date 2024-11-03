let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3

const cita = {
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
            mostrarAlerta('No hay atencion los fines de semana', 'error');
        }else{
            cita.fecha = e.target.value;
            removerAlerta();
        }
        console.log(cita);
    })

}

function ingresarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', (e)=>{

        const hora = e.target.value.split(':')[0];
        
        if(hora < 8 || hora >= 20){
            cita.hora = '';
            e.target.value = '';
            mostrarAlerta('Hora no válida', 'error');
        }else{
            cita.hora = e.target.value;
            removerAlerta();
        }
        console.log(cita);
    })
}

function mostrarAlerta(mensaje, tipo){
    //Solo mostrar una alerta, evitar repetidas
    const alertaBefore = document.querySelector('.alertas');
    if(alertaBefore) return;

    const divAlerta = document.createElement('DIV');
    divAlerta.classList.add('alertas', `${tipo}`);
    divAlerta.textContent = mensaje;

    //Añadir la alerta previo al formulario
    const formulario = document.querySelector('.formulario');
    formulario.parentNode.insertBefore(divAlerta, formulario);

}

function removerAlerta(){
    const alerta = document.querySelector('.alertas');
    if(alerta) alerta.remove();
}
























