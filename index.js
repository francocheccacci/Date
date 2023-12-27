//((((((((( TOAST )))))))))\\
document.addEventListener("DOMContentLoaded", function() {
  // Selecciona el elemento del toast
  const toastElement = document.querySelector(".toast");

  // Crea un objeto Toast de Bootstrap
  const toast = new bootstrap.Toast(toastElement, {
      animation: true, // Habilita las animaciones del Toast
    });

  // Muestra el Toast
  toast.show();
});

//((((((((( TOAST )))))))))\\





function changeActive(event, option) {
  const navItems = document.querySelectorAll('.nav-item');
  const labelFecha2 = document.getElementById('labelFecha2');
  const datepickerFin = document.getElementById('datepicker-fin');
  const numDias = document.getElementById('num-dias');
  const botonCuenta = document.getElementById('btn-cuenta');
  const botonSumar = document.getElementById('btn-sumar');
  const botonRestar = document.getElementById('btn-restar');
  
  navItems.forEach(item => {
    item.classList.remove('active');
  });

  event.target.classList.add('active');

  if (option === 'fechas') {
    labelFecha2.textContent = 'Fecha 2:';
    datepickerFin.classList.remove('hidden');
    numDias.classList.add('hidden');
    botonSumar.classList.add('hidden');
    botonRestar.classList.add('hidden');
    botonCuenta.classList.remove('hidden')
  } else if (option === 'dias') {
    labelFecha2.textContent = 'Cantidad de días:';
    datepickerFin.classList.add('hidden');
    numDias.classList.remove('hidden');
    botonSumar.classList.remove('hidden');
    botonRestar.classList.remove('hidden');
    botonCuenta.classList.add('hidden')
  }
}
function calculate(event, operation) {
  event.preventDefault();

  
  if (document.querySelector('.nav-item.active').textContent === 'Diferencia entre fechas') {
    if (operation == 'dif-fechas') {
      let fecha1 = new Date(document.getElementById("datepicker-ini").value);
      let fecha2 = new Date(document.getElementById("datepicker-fin").value);
      
      // Ajustar a la zona horaria de Argentina
      fecha1 = convertirAFechaArgentina(fecha1);
      fecha2 = convertirAFechaArgentina(fecha2);
      
      if (!isNaN(fecha1) && !isNaN(fecha2)) {
        let milisegundosEnUnDia = 24 * 60 * 60 * 1000;
        let diferenciaEnDias = Math.abs((fecha2 - fecha1) / milisegundosEnUnDia);
        document.getElementById("result").value = "La diferencia en días es: " + diferenciaEnDias;
      } else {
        document.getElementById("result").value = "Selecciona ambas fechas";
      }
    }
  } else if (operation === 'sumar') {
    let fecha1 = new Date(document.getElementById("datepicker-ini").value);
    let cantDias = document.getElementById('num-dias').value;
    let fechaFin = new Date();

    const toast = new bootstrap.Toast(document.querySelector('.toast'));
    const toastBody = toast._element.querySelector('.toast-body');

    // Ajustar a la zona horaria de Argentina
    fecha1 = convertirAFechaArgentina(fecha1);
    
    if (fecha1 != "Invalid Date" && cantDias != 0) {
      
      fechaFin = sumarDiasAFecha(fecha1, parseInt(cantDias) + 1);
      fechaFin = convertirAFechaArgentina(fechaFin);
      console.log(fecha1)
      console.log(fechaFin)
      let anio = fechaFin.getFullYear();
      let mes = fechaFin.getMonth() + 1;
      let dia = fechaFin.getDate();
      console.table(anio, mes, dia)
      document.getElementById("result").value = `El día es: ${anio}/${mes}/${dia}`;

    }else if(fecha1 == null && cantDias == 0){
      
      const errorToastElement = document.querySelector('.toast');
      const toastBody = errorToastElement.querySelector('.toast-body');
      toastBody.textContent = '¡Ups! Hubo un error. Por favor, selecciona una fecha y la cantidad de días.';
      
      if(!errorToastElement.classList.contains('toast-error')){
        errorToastElement.classList.add('toast-error')
      }
      // Crea un objeto Toast de Bootstrap para mostrar el Toast de error
      const errorToast = new bootstrap.Toast(errorToastElement);
      errorToast.show();
    
    }else if(fecha1 == "Invalid Date"){
      const errorToastElement = document.querySelector('.toast');
      const toastBody = errorToastElement.querySelector('.toast-body');
      toastBody.textContent = '¡Ups! Hubo un error. Por favor, selecciona una fecha.';
      if(!errorToastElement.classList.contains('toast-error')){
        errorToastElement.classList.add('toast-error')
      }
      // Crea un objeto Toast de Bootstrap para mostrar el Toast de error
      const errorToast = new bootstrap.Toast(errorToastElement);
      errorToast.show();
    }



  }else if(operation === 'restar'){
    let fecha1 = new Date(document.getElementById("datepicker-ini").value);
    let cantDias = document.getElementById('num-dias').value;
    let fechaFin = new Date();

    fecha1 = convertirAFechaArgentina(fecha1);
    
    if (fecha1 != null && cantDias != 0) {
      fechaFin = restarDiasAFecha(fecha1, parseInt(cantDias) - 1);
      fechaFin = convertirAFechaArgentina(fechaFin);
    
      let anio = fechaFin.getFullYear();
      let mes = fechaFin.getMonth() + 1;
      let dia = fechaFin.getDate();
      
      console.table([{ Anio: anio, Mes: mes, Dia: dia }]);
    
      document.getElementById("result").value = `El día es: ${anio}/${mes}/${dia}`;
    }

  }
}

function sumarDiasAFecha(fechaInicial, diasASumar) {
  const fecha = new Date(fechaInicial);
  fecha.setDate(fecha.getDate() + diasASumar);
  return fecha;
}

function restarDiasAFecha(fechaInicial, diasARestar) {
  const fecha = new Date(fechaInicial);
  fecha.setDate(fecha.getDate() - diasARestar);
  return fecha;
}

function convertirAFechaArgentina(fecha) {
  const desplazamientoHorario = -180; // Desplazamiento en minutos para UTC-3 (Argentina)
  return new Date(fecha.getTime() + (desplazamientoHorario * 60 * 1000));
}