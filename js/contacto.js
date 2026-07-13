/* ============================================================
   contacto.js — Formulario de contacto con doble canal
   1) Envío por correo mediante Web3Forms (sin backend propio).
   2) Envío por WhatsApp con mensaje pre-llenado.
   Si la clave de Web3Forms no está configurada en config.js,
   el botón de correo se deshabilita y solo queda WhatsApp.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('formContacto');
  if (!form) return;

  var btnEmail = document.getElementById('btnEmail');
  var btnWa = document.getElementById('btnWa');
  var estado = document.getElementById('formStatus');
  var mapa = document.getElementById('mapaClinica');

  // Poblar el select de especialidades a partir de los médicos (data.js)
  // más los servicios generales de la clínica.
  var select = form.especialidad;
  if (select) {
    var opciones = [];
    if (typeof MEDICOS !== 'undefined') {
      MEDICOS.forEach(function (m) {
        if (opciones.indexOf(m.especialidad) === -1) opciones.push(m.especialidad);
      });
    }
    ['Laboratorio Clínico', 'Rayos X e Imagenología', 'Urgencias', 'Otro'].forEach(function (s) {
      if (opciones.indexOf(s) === -1) opciones.push(s);
    });
    opciones.forEach(function (nombre) {
      var opt = document.createElement('option');
      opt.value = nombre;
      opt.textContent = nombre;
      select.appendChild(opt);
    });
  }

  // Mapa incrustado desde CONFIG
  if (mapa) mapa.src = CONFIG.mapaEmbed;

  var keyConfigurada = CONFIG.web3formsKey && CONFIG.web3formsKey !== 'TU_ACCESS_KEY';
  if (!keyConfigurada) {
    btnEmail.disabled = true;
    btnEmail.title = 'Configura la clave de Web3Forms en js/config.js para habilitar el envío por correo';
    mostrarEstado(
      'info',
      'El envío por correo estará disponible al configurar la clave de Web3Forms. Por ahora puedes escribirnos por WhatsApp.'
    );
  }

  function mostrarEstado(tipo, texto) {
    estado.className = 'form-status ' + tipo;
    estado.textContent = texto;
  }

  function leerCampos() {
    return {
      nombre: form.nombre.value.trim(),
      telefono: form.telefono.value.trim(),
      especialidad: form.especialidad.value,
      mensaje: form.mensaje.value.trim(),
    };
  }

  function validar() {
    var valido = true;
    ['nombre', 'telefono'].forEach(function (campo) {
      var field = form[campo].closest('.field');
      if (!form[campo].value.trim()) {
        field.classList.add('error');
        valido = false;
      } else {
        field.classList.remove('error');
      }
    });
    return valido;
  }

  // Quitar el marcador de error al escribir
  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field && e.target.value.trim()) field.classList.remove('error');
  });

  // ----- Envío por WhatsApp -----
  btnWa.addEventListener('click', function () {
    if (!validar()) {
      mostrarEstado('err', 'Por favor completa tu nombre y teléfono.');
      return;
    }
    var d = leerCampos();
    var mensaje =
      'Hola, soy ' + d.nombre + '.\n' +
      (d.especialidad ? 'Especialidad de interés: ' + d.especialidad + '\n' : '') +
      'Teléfono de contacto: ' + d.telefono + '\n' +
      (d.mensaje ? 'Mensaje: ' + d.mensaje : 'Me gustaría agendar una cita.');
    window.open(waLink(mensaje), '_blank', 'noopener');
    mostrarEstado('ok', 'Se abrió WhatsApp con tu mensaje listo para enviar.');
  });

  // ----- Envío por correo (Web3Forms) -----
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!keyConfigurada) return;
    if (!validar()) {
      mostrarEstado('err', 'Por favor completa tu nombre y teléfono.');
      return;
    }

    var d = leerCampos();
    btnEmail.disabled = true;
    var textoOriginal = btnEmail.textContent;
    btnEmail.textContent = 'Enviando…';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: CONFIG.web3formsKey,
        subject: 'Nueva solicitud de cita — ' + CONFIG.nombreClinica,
        from_name: d.nombre,
        Nombre: d.nombre,
        Teléfono: d.telefono,
        Especialidad: d.especialidad || 'No especificada',
        Mensaje: d.mensaje || 'Sin mensaje adicional',
      }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          mostrarEstado('ok', '¡Gracias! Recibimos tu solicitud y te contactaremos muy pronto.');
          form.reset();
        } else {
          mostrarEstado('err', 'No se pudo enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.');
        }
      })
      .catch(function () {
        mostrarEstado('err', 'Hubo un problema de conexión. Intenta de nuevo o escríbenos por WhatsApp.');
      })
      .finally(function () {
        btnEmail.disabled = false;
        btnEmail.textContent = textoOriginal;
      });
  });
});
