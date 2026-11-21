# Manejo de scripts

Esta práctica usa una lista de tareas para mostrar cómo se prueba y se publica una aplicación con GitHub Actions. La lista permite agregar pendientes y marcarlos como hechos. Los pendientes se guardan en el navegador.

## Cómo funciona el pipeline

Al subir un cambio a la rama `main`, GitHub Actions ejecuta estos pasos:

1. **Preparar.** `scripts/preparar_entorno.sh` copia el HTML y el JavaScript al entorno de liberación.
2. **Probar.** `scripts/ejecutar_pruebas.sh` comprueba que se puedan agregar y marcar tareas, y que se rechacen las entradas vacías.
3. **Publicar.** Si las pruebas pasan, `scripts/desplegar.sh` arma el paquete y GitHub Actions lo publica en GitHub Pages. Al final, comprueba que la página cargue.

## Entrega

- [Documento del caso de estudio](tarea1.docx)
- [Aplicación publicada](https://yilinroux.github.io/Manejode-scrip/)
- [Ejecuciones del pipeline](https://github.com/YilinRoux/Manejode-scrip/actions)
