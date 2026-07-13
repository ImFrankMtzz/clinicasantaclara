/* ============================================================
   CONFIGURACIÓN CENTRAL — Centro Médico de Especialidades Santa Clara
   Todos los datos de contacto del sitio se editan AQUÍ.
   No es necesario tocar ningún archivo HTML.

   Datos tomados de la página de Facebook oficial (julio 2026).
   ⚠ La página de Facebook está desactualizada: CONFIRMAR con el
   cliente teléfono, WhatsApp y correo antes de publicar.
   ============================================================ */

const CONFIG = {
  nombreClinica: 'Centro Médico de Especialidades Santa Clara',
  ciudad: 'Lázaro Cárdenas, Michoacán',

  // Dirección completa (ficha de Facebook)
  direccion: 'Calle D N° 193, Fracc. Agua Marina, C.P. 60950, Cd. Lázaro Cárdenas, Michoacán',

  // Teléfono fijo (ficha de Facebook). En publicaciones también aparece
  // el (753) 688 1855 — confirmar cuál sigue vigente.
  telefono: '(753) 532 9069',
  telefonoLink: 'tel:+527535329069',

  // WhatsApp en formato internacional SIN signos ni espacios (52 + 1 + lada + número).
  // ⚠ Confirmar con el cliente qué número tiene WhatsApp activo.
  whatsapp: '5217535329069',

  // Correo de la ficha de Facebook — confirmar si prefieren uno institucional
  email: 'melkymagaa@centromedicolzc.com',

  // Página de Facebook oficial
  facebook: 'https://www.facebook.com/profile.php?id=100057571564324',

  // Clave de acceso de Web3Forms para el envío de formularios por correo.
  // Se obtiene gratis en https://web3forms.com (solo pide un correo).
  // Mientras diga "TU_ACCESS_KEY", el formulario ofrecerá únicamente WhatsApp.
  web3formsKey: 'TU_ACCESS_KEY',

  // Mapa incrustado (Google Maps) apuntando a la dirección de la ficha
  mapaEmbed: 'https://www.google.com/maps?q=Calle%20D%20193%2C%20Fraccionamiento%20Agua%20Marina%2C%20L%C3%A1zaro%20C%C3%A1rdenas%2C%20Michoac%C3%A1n%2060950&output=embed',

  // Horario general — la ficha de Facebook indica "Siempre abierto"
  horarioGeneral: [
    { dias: 'Todos los días', horas: 'Abierto las 24 horas' },
    { dias: 'Urgencias', horas: 'Las 24 horas' },
    { dias: 'Consulta de especialidad', horas: 'Según horario de cada médico' },
  ],
};

/* Construye un enlace de WhatsApp con mensaje pre-llenado */
function waLink(mensaje) {
  return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(mensaje);
}
