let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function eliminarAlerta(){document.querySelectorAll(".alertas").forEach((e=>{e.classList.contains("error")?setTimeout((()=>{e.remove()}),1e4):setTimeout((()=>{e.remove()}),3e3)}))}function iniciarApp(){mostrarSecciones(),pagAnterior(),pagSiguiente(),botonesPaginador(),tabs(),obtenerAPI(),ingresarNombre(),ingresarFecha(),ingresarHora()}function tabs(){document.querySelectorAll(".tabs button").forEach((e=>{e.addEventListener("click",(e=>{paso=parseInt(e.target.dataset.paso),mostrarSecciones(),botonesPaginador()}))}))}function mostrarSecciones(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector(`#paso-${paso}`).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(t.classList.remove("ocultar"),e.classList.add("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSecciones()}function pagAnterior(){document.querySelector("#anterior").addEventListener("click",(()=>{paso<=1||(paso--,botonesPaginador())}))}function pagSiguiente(){document.querySelector("#siguiente").addEventListener("click",(()=>{paso>=3||(paso++,botonesPaginador())}))}async function obtenerAPI(){try{const e="http://localhost:3001/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach((e=>{const{id:t,nombre:o,precio:a}=e,n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=o;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent=`$${a}`;const c=document.createElement("DIV");c.classList.add("servicio"),c.dataset.idServicio=t,c.onclick=function(){seleccionarServicio(e)},c.appendChild(n),c.appendChild(r);document.querySelector(".listado-secciones").appendChild(c)}))}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some((e=>e.id===t))?(cita.servicios=o.filter((e=>e.id!==t)),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado")),console.log(cita)}function ingresarNombre(){cita.nombre=document.querySelector("#nombre").value}function ingresarFecha(){document.querySelector("#fecha").addEventListener("input",(e=>{const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(cita.fecha="",e.target.value="",mostrarAlerta("No hay atencion los fines de semana","error","#paso-2 .formulario")):(cita.fecha=e.target.value,removerAlerta()),console.log(cita)}))}function ingresarHora(){document.querySelector("#hora").addEventListener("input",(e=>{const t=e.target.value.split(":")[0];t<8||t>=20?(cita.hora="",e.target.value="",mostrarAlerta("Hora no válida","error","#paso-2 .formulario")):(cita.hora=e.target.value,removerAlerta()),console.log(cita)}))}function mostrarAlerta(e,t,o){removerAlerta();const a=document.createElement("DIV");a.classList.add("alertas",`${t}`),a.textContent=e;const n=document.querySelector(o);n.parentNode.insertBefore(a,n)}function removerAlerta(){const e=document.querySelector(".alertas");e&&e.remove()}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes(""))return void mostrarAlerta("Debes seleccionar una fecha y hora","error",".contenido-resumen");if(0===cita.servicios.length)return void mostrarAlerta("Debes seleccionar un servicio","error",".contenido-resumen");removerAlerta();const{nombre:t,fecha:o,hora:a,servicios:n}=cita,r=document.createElement("H2");r.textContent="Resumen";const c=document.createElement("P");c.classList.add("text-center"),c.textContent="Verifica que la información sea correcta",e.appendChild(r),e.appendChild(c);const s=document.createElement("DIV");s.classList.add("contenedor-info");const i=document.createElement("H3");i.textContent="Información de la cita";const l=document.createElement("p");l.innerHTML=`<span>Nombre: </span>${t}`;const d=new Date(o),u=d.getDate()+2,m=d.getMonth(),p=d.getFullYear(),v=new Date(Date.UTC(p,m,u)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),h=document.createElement("P");h.innerHTML=`<span>Fecha: </span>${v}`;let f=parseInt(a.split(":")[0])>=12?"PM":"AM";const g=document.createElement("P");g.innerHTML=`<span>Hora: </span>${a} ${f}`,s.appendChild(i),s.appendChild(l),s.appendChild(h),s.appendChild(g),e.appendChild(s);const L=document.createElement("H3");L.textContent="Servicios Seleccionados",e.appendChild(L);let C=0;n.forEach((t=>{const o=document.createElement("DIV");o.classList.add("contenedor-servicio");const{id:a,nombre:n,precio:r}=t;C+=parseFloat(r);const c=document.createElement("P");c.textContent=n;const s=document.createElement("P");s.innerHTML=`<span>Precio: </span>$${r}`,o.appendChild(c),o.appendChild(s),e.appendChild(o)}));const S=document.createElement("P");S.classList.add("total-pagar"),S.innerHTML=`<span>Total a pagar: </span>$${C}`;const E=document.createElement("BUTTON");E.classList.add("boton"),E.textContent="Reservar Cita",E.onclick=reservarCita,e.appendChild(S),e.appendChild(E)}function reservarCita(){console.log("reservando cita")}document.addEventListener("DOMContentLoaded",(()=>{eliminarAlerta(),window.location.pathname.includes("citas")&&iniciarApp()}));