export function agregar(tareas, texto) {
  const titulo = texto.trim();
  return titulo ? [...tareas, { titulo, completa: false }] : tareas;
}

export function alternar(tareas, indice) {
  return tareas.map((tarea, posicion) =>
    posicion === indice ? { ...tarea, completa: !tarea.completa } : tarea,
  );
}

if (typeof document !== 'undefined') {
  const clave = 'manejo-de-scripts:tareas';
  const lista = document.querySelector('ul');
  const formulario = document.querySelector('form');
  const campo = document.querySelector('#tarea');
  let tareas = JSON.parse(localStorage.getItem(clave) ?? '[]');

  function mostrar() {
    lista.replaceChildren();
    tareas.forEach((tarea, indice) => {
      const elemento = document.createElement('li');
      const etiqueta = document.createElement('label');
      const casilla = document.createElement('input');
      casilla.type = 'checkbox';
      casilla.checked = tarea.completa;
      casilla.addEventListener('change', () => {
        tareas = alternar(tareas, indice);
        localStorage.setItem(clave, JSON.stringify(tareas));
      });
      etiqueta.append(casilla, tarea.titulo);
      elemento.append(etiqueta);
      lista.append(elemento);
    });
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    tareas = agregar(tareas, campo.value);
    localStorage.setItem(clave, JSON.stringify(tareas));
    campo.value = '';
    mostrar();
    campo.focus();
  });
  mostrar();
}
