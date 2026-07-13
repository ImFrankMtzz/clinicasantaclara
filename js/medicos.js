/* ============================================================
   medicos.js — Directorio de médicos
   Genera las tarjetas de médicos a partir de MEDICOS (data.js).
   - En medicos.html: renderiza el directorio completo + filtros.
   - En index.html: renderiza solo los primeros 3 (destacados).
   ============================================================ */

(function () {
  var GRADIENTES = [
    'linear-gradient(135deg, #1e8e4e, #0e9584)',
    'linear-gradient(135deg, #0e9584, #2fbf71)',
    'linear-gradient(135deg, #14663a, #1e8e4e)',
    'linear-gradient(135deg, #2fbf71, #0e9584)',
    'linear-gradient(135deg, #0b3a24, #1e8e4e)',
    'linear-gradient(135deg, #1e8e4e, #2fbf71)',
  ];

  var ICONO_RELOJ =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

  function iniciales(nombre) {
    var partes = nombre.replace(/^Dra?\.\s*/i, '').trim().split(/\s+/);
    var primera = partes[0] ? partes[0][0] : '';
    var segunda = partes[1] ? partes[1][0] : '';
    return (primera + segunda).toUpperCase();
  }

  function tarjetaMedico(medico, indice) {
    var mensaje =
      'Hola, me gustaría agendar una cita con ' +
      medico.nombre +
      ' (' +
      medico.especialidad +
      '). ¿Me pueden apoyar con la disponibilidad?';

    var horarioHtml = medico.horario
      .map(function (h) {
        return (
          '<li>' + ICONO_RELOJ + '<span>' + h.dias + '</span><strong>' + h.horas + '</strong></li>'
        );
      })
      .join('');

    return (
      '<article class="doc-card reveal" data-especialidad="' + medico.especialidad + '">' +
        '<div class="doc-head">' +
          '<span class="doc-avatar" style="background:' + GRADIENTES[indice % GRADIENTES.length] + '">' +
            iniciales(medico.nombre) +
          '</span>' +
          '<div>' +
            '<h3>' + medico.nombre + '</h3>' +
            '<span class="doc-esp">' + medico.especialidad + '</span>' +
            '<span class="doc-ced">' + medico.cedula + '</span>' +
          '</div>' +
        '</div>' +
        '<ul class="doc-horario">' + horarioHtml + '</ul>' +
        '<a class="btn btn-whatsapp" href="' + waLink(mensaje) + '" target="_blank" rel="noopener">' +
          '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
          'Agendar por WhatsApp' +
        '</a>' +
      '</article>'
    );
  }

  function renderizar(contenedor, lista) {
    contenedor.innerHTML = lista
      .map(function (m, i) {
        return tarjetaMedico(m, MEDICOS.indexOf(m));
      })
      .join('');
    // Activar la animación de las tarjetas recién creadas
    requestAnimationFrame(function () {
      contenedor.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // --- Médicos destacados en el inicio ---
    var destacados = document.getElementById('medicosDestacados');
    if (destacados) renderizar(destacados, MEDICOS.slice(0, 3));

    // --- Directorio completo con filtros ---
    var grid = document.getElementById('medicosGrid');
    var filtros = document.getElementById('filtrosEspecialidad');
    if (!grid) return;

    renderizar(grid, MEDICOS);

    if (filtros) {
      var especialidades = [];
      MEDICOS.forEach(function (m) {
        if (especialidades.indexOf(m.especialidad) === -1) especialidades.push(m.especialidad);
      });

      filtros.innerHTML =
        '<button class="chip active" data-filtro="todos">Todos</button>' +
        especialidades
          .map(function (e) {
            return '<button class="chip" data-filtro="' + e + '">' + e + '</button>';
          })
          .join('');

      filtros.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip');
        if (!chip) return;
        filtros.querySelectorAll('.chip').forEach(function (c) {
          c.classList.remove('active');
        });
        chip.classList.add('active');

        var filtro = chip.getAttribute('data-filtro');
        var lista =
          filtro === 'todos'
            ? MEDICOS
            : MEDICOS.filter(function (m) {
                return m.especialidad === filtro;
              });
        renderizar(grid, lista);
      });
    }
  });
})();
