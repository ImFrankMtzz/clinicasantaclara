/* ============================================================
   DATOS EDITABLES — Médicos y horarios
   Para agregar, quitar o modificar un médico u horario,
   se edita ÚNICAMENTE este archivo. La página de Médicos
   se genera automáticamente a partir de esta lista.
   ============================================================ */

const MEDICOS = [
  {
    nombre: 'Dra. María Elena Gutiérrez Ríos',
    especialidad: 'Medicina General',
    cedula: 'Céd. Prof. 1234567',
    horario: [
      { dias: 'Lunes a Viernes', horas: '9:00 – 14:00' },
      { dias: 'Sábado', horas: '9:00 – 13:00' },
    ],
  },
  {
    nombre: 'Dr. Ricardo Salgado Mendoza',
    especialidad: 'Pediatría',
    cedula: 'Céd. Prof. 2345678',
    horario: [
      { dias: 'Lunes, Miércoles y Viernes', horas: '10:00 – 15:00' },
      { dias: 'Sábado', horas: '10:00 – 13:00' },
    ],
  },
  {
    nombre: 'Dra. Ana Sofía Villanueva Cruz',
    especialidad: 'Ginecología y Obstetricia',
    cedula: 'Céd. Prof. 3456789',
    horario: [
      { dias: 'Martes y Jueves', horas: '9:00 – 14:00' },
      { dias: 'Viernes', horas: '16:00 – 20:00' },
    ],
  },
  {
    nombre: 'Dr. Jorge Luis Herrera Campos',
    especialidad: 'Medicina Interna',
    cedula: 'Céd. Prof. 4567890',
    horario: [
      { dias: 'Lunes a Jueves', horas: '16:00 – 20:00' },
    ],
  },
  {
    nombre: 'Dr. Fernando Aguilar Peña',
    especialidad: 'Traumatología y Ortopedia',
    cedula: 'Céd. Prof. 5678901',
    horario: [
      { dias: 'Lunes y Miércoles', horas: '11:00 – 15:00' },
      { dias: 'Sábado', horas: '9:00 – 12:00' },
    ],
  },
  {
    nombre: 'Dra. Laura Patricia Núñez Solís',
    especialidad: 'Cardiología',
    cedula: 'Céd. Prof. 6789012',
    horario: [
      { dias: 'Martes y Jueves', horas: '16:00 – 20:00' },
    ],
  },
  {
    nombre: 'Dra. Carmen Rocío Estrada Vega',
    especialidad: 'Dermatología',
    cedula: 'Céd. Prof. 7890123',
    horario: [
      { dias: 'Miércoles y Viernes', horas: '9:00 – 13:00' },
    ],
  },
  {
    nombre: 'Dr. Miguel Ángel Torres Bravo',
    especialidad: 'Odontología',
    cedula: 'Céd. Prof. 8901234',
    horario: [
      { dias: 'Lunes a Viernes', horas: '10:00 – 14:00 y 16:00 – 19:00' },
    ],
  },
];
