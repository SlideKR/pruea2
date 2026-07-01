const experiencias = [
  {
    id: 1,
    nombre: 'Capillas de Mármol',
    categoria: 'Navegación',
    lugar: 'Puerto Río Tranquilo',
    precio: 35000,
    cuposDisponibles: 8,
    descripcion:
      'Navegación por el Lago General Carrera para descubrir columnas de mármol y los paisajes más icónicos de la región.',
    icono: '⛵',
  },
  {
    id: 2,
    nombre: 'Cerro Castillo',
    categoria: 'Trekking',
    lugar: 'Villa Cerro Castillo',
    precio: 28000,
    cuposDisponibles: 12,
    descripcion:
      'Trekking guiado con vistas panorámicas a glaciares, lagunas y el imponente paisaje de la Cordillera de la Costa.',
    icono: '🥾',
  },
  {
    id: 3,
    nombre: 'Laguna San Rafael',
    categoria: 'Navegación',
    lugar: 'Puerto San Rafael',
    precio: 42000,
    cuposDisponibles: 6,
    descripcion:
      'Expedición en embarcación para observar glaciares, fiordos y fauna marina en un entorno de gran valor ecológico.',
    icono: '🛶',
  },
  {
    id: 4,
    nombre: 'Pesca con Mosca',
    categoria: 'Pesca',
    lugar: 'Coyhaique',
    precio: 32000,
    cuposDisponibles: 5,
    descripcion:
      'Taller práctico de pesca con mosca en ríos y lagunas, con guía experto y enfoque en la conservación del recurso.',
    icono: '🎣',
  },
  {
    id: 5,
    nombre: 'Kayak en Fiordos',
    categoria: 'Navegación',
    lugar: 'Chile Chico',
    precio: 26000,
    cuposDisponibles: 10,
    descripcion:
      'Recorrido en kayak por aguas tranquilas con miradores a montañas, bosques y aves endémicas de la Patagonia.',
    icono: '🛶',
  },
  {
    id: 6,
    nombre: 'Carretera Austral',
    categoria: 'Cultura',
    lugar: 'Caleta Tortel',
    precio: 18000,
    cuposDisponibles: 15,
    descripcion:
      'Recorrido cultural por comunidades locales, puentes de madera y miradores que narran la historia de la Carretera Austral.',
    icono: '🛣️',
  },
  {
    id: 7,
    nombre: 'Cochrane y el Baker',
    categoria: 'Trekking',
    lugar: 'Cochrane',
    precio: 31000,
    cuposDisponibles: 9,
    descripcion:
      'Avistamiento de glaciares y caminatas de bajo impacto acompañadas por guías comunitarios de la zona.',
    icono: '🏞️',
  },
  {
    id: 8,
    nombre: 'Museo y Feria Local',
    categoria: 'Cultura',
    lugar: 'Puerto Aysén',
    precio: 12000,
    cuposDisponibles: 20,
    descripcion:
      'Visita guiada a museos, talleres artesanales y feria local que promueve el emprendimiento sostenible de la región.',
    icono: '🏛️',
  },
];

const filtroEstado = {
  categoriaActiva: 'Todos',
};

function filtrarPorCategoria(categoria) {
  if (categoria === 'Todos') {
    return experiencias;
  }

  return experiencias.filter((experiencia) => experiencia.categoria === categoria);
}

function renderFiltros() {
  const filtrosContainer = document.getElementById('filtros');
  filtrosContainer.innerHTML = '';

  const categorias = ['Todos', ...new Set(experiencias.map((experiencia) => experiencia.categoria))];

  categorias.forEach((categoria) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'filtro-btn';
    boton.classList.toggle('activo', filtroEstado.categoriaActiva === categoria);
    boton.dataset.categoria = categoria;
    boton.textContent = categoria;
    filtrosContainer.appendChild(boton);
  });
}

function renderExperiencias(lista) {
  const container = document.getElementById('experienciasContainer');
  container.innerHTML = '';

  lista.forEach((experiencia) => {
    const card = document.createElement('article');
    card.className = 'experiencia-card';

    const cardHead = document.createElement('div');
    cardHead.className = 'card-head';

    const icono = document.createElement('span');
    icono.className = 'icono';
    icono.textContent = experiencia.icono;

    const categoria = document.createElement('span');
    categoria.className = 'categoria-pill';
    categoria.textContent = experiencia.categoria;

    cardHead.appendChild(icono);
    cardHead.appendChild(categoria);

    const title = document.createElement('h3');
    title.textContent = experiencia.nombre;

    const lugar = document.createElement('p');
    lugar.className = 'lugar';
    lugar.textContent = experiencia.lugar;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const meta = document.createElement('div');
    meta.className = 'card-meta';

    const precio = document.createElement('span');
    precio.textContent = `$${experiencia.precio.toLocaleString('es-CL')}`;

    const cupos = document.createElement('span');
    cupos.textContent = `${experiencia.cuposDisponibles} cupos`;

    meta.appendChild(precio);
    meta.appendChild(cupos);

    const detalle = document.createElement('div');
    detalle.className = 'detalle';
    detalle.hidden = true;

    const descripcion = document.createElement('p');
    descripcion.textContent = experiencia.descripcion;

    detalle.appendChild(descripcion);

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'ver-mas';
    boton.setAttribute('aria-expanded', 'false');
    boton.textContent = 'Ver más';

    boton.addEventListener('click', () => {
      const visible = detalle.classList.toggle('visible');
      detalle.hidden = !visible;
      boton.textContent = visible ? 'Ver menos' : 'Ver más';
      boton.setAttribute('aria-expanded', visible.toString());
    });

    cardBody.appendChild(meta);
    cardBody.appendChild(detalle);
    cardBody.appendChild(boton);

    card.appendChild(cardHead);
    card.appendChild(title);
    card.appendChild(lugar);
    card.appendChild(cardBody);

    container.appendChild(card);
  });
}

function poblarSelectExperiencias() {
  const select = document.getElementById('experiencia');
  select.innerHTML = '';

  const opcionDefault = document.createElement('option');
  opcionDefault.value = '';
  opcionDefault.textContent = 'Selecciona una experiencia';
  select.appendChild(opcionDefault);

  experiencias.forEach((experiencia) => {
    const opcion = document.createElement('option');
    opcion.value = experiencia.id;
    opcion.textContent = `${experiencia.icono} ${experiencia.nombre} (${experiencia.cuposDisponibles} cupos)`;
    opcion.disabled = experiencia.cuposDisponibles <= 0;
    select.appendChild(opcion);
  });
}

function mostrarError(campo, mensaje) {
  campo.classList.add('input-error');
  const errorSpan = document.querySelector(`[data-error-for="${campo.id}"]`);
  if (errorSpan) {
    errorSpan.textContent = mensaje;
  }
}

function limpiarError(campo) {
  campo.classList.remove('input-error');
  const errorSpan = document.querySelector(`[data-error-for="${campo.id}"]`);
  if (errorSpan) {
    errorSpan.textContent = '';
  }
}

function limpiarErrores() {
  const campos = ['nombre', 'email', 'experiencia', 'personas', 'fecha'];
  campos.forEach((id) => {
    const campo = document.getElementById(id);
    limpiarError(campo);
  });
}

function descontarCupo(id, personas) {
  const experiencia = experiencias.find((item) => item.id === id);
  if (experiencia) {
    experiencia.cuposDisponibles -= personas;
  }
}

function validarFormulario(event) {
  event.preventDefault();

  limpiarErrores();

  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const experienciaSelect = document.getElementById('experiencia');
  const personas = document.getElementById('personas');
  const fecha = document.getElementById('fecha');
  const mensajeExito = document.getElementById('mensajeExito');

  let formularioValido = true;

  if (!nombre.value.trim()) {
    mostrarError(nombre, 'Debes ingresar tu nombre completo.');
    formularioValido = false;
  }

  if (!email.value.trim()) {
    mostrarError(email, 'Debes ingresar tu correo electrónico.');
    formularioValido = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      mostrarError(email, 'El correo electrónico no tiene un formato válido.');
      formularioValido = false;
    }
  }

  const experienciaId = Number(experienciaSelect.value);
  const experienciaElegida = experiencias.find((item) => item.id === experienciaId);

  if (!experienciaId || !experienciaElegida) {
    mostrarError(experienciaSelect, 'Debes seleccionar una experiencia.');
    formularioValido = false;
  }

  const personasValor = Number(personas.value);

  if (!personas.value.trim()) {
    mostrarError(personas, 'Debes ingresar la cantidad de personas.');
    formularioValido = false;
  } else if (!Number.isInteger(personasValor) || personasValor < 1) {
    mostrarError(personas, 'La cantidad de personas debe ser un número entero mayor a 0.');
    formularioValido = false;
  } else if (experienciaElegida && personasValor > experienciaElegida.cuposDisponibles) {
    mostrarError(personas, `No puedes reservar ${personasValor} personas. Solo quedan ${experienciaElegida.cuposDisponibles} cupos.`);
    formularioValido = false;
  }

  if (!fecha.value) {
    mostrarError(fecha, 'Debes seleccionar una fecha de salida.');
    formularioValido = false;
  }

  if (formularioValido) {
    descontarCupo(experienciaElegida.id, personasValor);
    mensajeExito.hidden = false;
    mensajeExito.textContent = `Reserva confirmada para ${personasValor} personas en ${experienciaElegida.nombre} para el ${fecha.value}.`;

    document.getElementById('formReserva').reset();
    poblarSelectExperiencias();
    renderExperiencias(filtrarPorCategoria(filtroEstado.categoriaActiva));
  } else {
    mensajeExito.hidden = true;
    mensajeExito.textContent = '';
  }
}

function inicializarAplicacion() {
  renderFiltros();
  renderExperiencias(filtrarPorCategoria(filtroEstado.categoriaActiva));
  poblarSelectExperiencias();

  const filtrosContainer = document.getElementById('filtros');
  filtrosContainer.addEventListener('click', (event) => {
    const boton = event.target.closest('button[data-categoria]');
    if (!boton) {
      return;
    }

    filtroEstado.categoriaActiva = boton.dataset.categoria;
    renderFiltros();
    renderExperiencias(filtrarPorCategoria(filtroEstado.categoriaActiva));
  });

  const formulario = document.getElementById('formReserva');
  formulario.addEventListener('submit', validarFormulario);
}

inicializarAplicacion();
