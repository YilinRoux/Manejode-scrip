import assert from 'node:assert/strict';
import test from 'node:test';
import { agregar, alternar } from '../.release/tareas.mjs';

test('agrega una tarea pendiente y recorta espacios', () => {
  assert.deepEqual(agregar([], ' Entregar práctica '), [
    { titulo: 'Entregar práctica', completa: false },
  ]);
});

test('rechaza una tarea en blanco', () => {
  assert.deepEqual(agregar([], '   '), []);
});

test('marca y desmarca únicamente la tarea seleccionada', () => {
  const tareas = agregar(agregar([], 'Primera'), 'Segunda');
  const actualizadas = alternar(tareas, 1);
  assert.deepEqual(actualizadas.map(({ completa }) => completa), [false, true]);
  assert.deepEqual(alternar(actualizadas, 1), tareas);
});
