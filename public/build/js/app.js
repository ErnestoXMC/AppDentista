let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function eliminarAlerta(){document.querySelectorAll(".alertas").forEach((e=>{e.classList.contains("error")?setTimeout((()=>{e.remove()}),1e4):setTimeout((()=>{e.remove()}),3e3)}))}function iniciarApp(){mostrarSecciones(),pagAnterior(),pagSiguiente(),botonesPaginador(),tabs(),obtenerAPI(),ingresarNombre(),ingresarFecha(),ingresarHora()}function tabs(){document.querySelectorAll(".tabs button").forEach((e=>{e.addEventListener("click",(e=>{paso=parseInt(e.target.dataset.paso),mostrarSecciones(),botonesPaginador()}))}))}function mostrarSecciones(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector(`#paso-${paso}`).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(t.classList.remove("ocultar"),e.classList.add("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar")):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSecciones()}function pagAnterior(){document.querySelector("#anterior").addEventListener("click",(()=>{paso<=1||(paso--,botonesPaginador())}))}function pagSiguiente(){document.querySelector("#siguiente").addEventListener("click",(()=>{paso>=3||(paso++,botonesPaginador())}))}async function obtenerAPI(){try{const e="http://localhost:3001/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach((e=>{const{id:t,nombre:o,precio:a}=e,r=document.createElement("P");r.classList.add("nombre-servicio"),r.textContent=o;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent=`$${a}`;const n=document.createElement("DIV");n.classList.add("servicio"),n.dataset.idServicio=t,n.onclick=function(){seleccionarServicio(e)},n.appendChild(r),n.appendChild(c);document.querySelector(".listado-secciones").appendChild(n)}))}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some((e=>e.id===t))?(cita.servicios=o.filter((e=>e.id!==t)),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado"))}function ingresarNombre(){cita.nombre=document.querySelector("#nombre").value}function ingresarFecha(){document.querySelector("#fecha").addEventListener("input",(e=>{const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(cita.fecha="",e.target.value="",mostrarAlerta("No hay atencion los fines de semana","error")):(cita.fecha=e.target.value,removerAlerta()),console.log(cita)}))}function ingresarHora(){document.querySelector("#hora").addEventListener("input",(e=>{const t=e.target.value.split(":")[0];t<8||t>=20?(cita.hora="",e.target.value="",mostrarAlerta("Hora no válida","error")):(cita.hora=e.target.value,removerAlerta()),console.log(cita)}))}function mostrarAlerta(e,t){if(document.querySelector(".alertas"))return;const o=document.createElement("DIV");o.classList.add("alertas",`${t}`),o.textContent=e;const a=document.querySelector(".formulario");a.parentNode.insertBefore(o,a)}function removerAlerta(){const e=document.querySelector(".alertas");e&&e.remove()}document.addEventListener("DOMContentLoaded",(()=>{eliminarAlerta(),window.location.pathname.includes("citas")&&iniciarApp()}));