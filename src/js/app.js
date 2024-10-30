let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3


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
