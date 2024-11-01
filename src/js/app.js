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
    consultarAPI();
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

async function consultarAPI(){
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
    const {servicios} = cita;

    const existe = servicios.some( service => service.id === servicio.id );

    if(!existe){
        cita.servicios = [...servicios, servicio];
    }

    console.log(existe);
    console.log(cita);
}
































