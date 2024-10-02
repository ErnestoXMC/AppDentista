
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







