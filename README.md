---
title: Manejo de Scripts
subtitle: Caso de estudio · Lista de tareas
lang: es-MX
---

La aplicación permite agregar tareas y marcarlas como completadas. Los datos se guardan en el navegador del usuario mediante `localStorage`. El servicio desplegado entrega la página y su módulo JavaScript por HTTPS.

## 1. Justificación del pipeline

Cada cambio en `main` prepara una copia de liberación, ejecuta las pruebas sobre esa copia y genera el artefacto solo si todas pasan. GitHub Actions despliega ese mismo artefacto en GitHub Pages y comprueba por HTTPS que se sirva la página esperada y que `version.txt` coincida con el commit publicado. La prueba previa impide que una versión que falla llegue al despliegue. El identificador del commit permite rastrear la versión publicada.

## 2. Entorno requerido

El entorno de liberación usa un ejecutor hospedado de GitHub Actions con Ubuntu 24.04, Bash y Node.js 24. El script de preparación copia HTML y JavaScript a `.release/`. Las pruebas usan el módulo integrado `node:test`. El script de despliegue copia los archivos probados a `dist/` y agrega el identificador de versión. El entorno de producción es GitHub Pages y recibe `dist/` como artefacto de GitHub Actions.

## 3. Niveles de servicio acordados

Acuerdos del caso simulado para cada mes calendario.

- Disponibilidad de la página y del módulo JavaScript de al menos 99.5 %.
- Tiempo de respuesta p95 de hasta 800 ms en las comprobaciones HTTP exitosas.
- Tasa de respuestas HTTP 5xx de hasta 0.5 % del total de comprobaciones HTTP.

## 4. Métricas para el monitoreo

Un monitor HTTP externo consultaría la página principal y `tareas.mjs` cada cinco minutos desde un mismo punto de observación, con un tiempo límite de 10 segundos por solicitud. Registraría el código HTTP, la duración total y los tiempos de espera agotados. El pipeline ya incluye la comprobación posterior al despliegue. El sondeo periódico corresponde al plan de monitoreo del caso.

| Métrica | Cálculo mensual |
|---|---|
| Disponibilidad | Rondas en las que ambas solicitudes respondieron 200 dentro del tiempo límite, divididas entre el total de rondas ejecutadas, por 100. |
| Latencia p95 | Percentil 95 de la duración total de las solicitudes con respuesta 200. |
| Tasa de HTTP 5xx | Solicitudes con respuesta 5xx divididas entre todas las solicitudes intentadas, por 100. Los tiempos de espera agotados afectan la disponibilidad. |

## 5. Parámetros de configuración

| Herramienta | Configuración |
|---|---|
| GitHub Actions | `.github/workflows/pipeline.yml`. Se ejecuta al subir cambios a `main` o de forma manual. Grupo de concurrencia `github-pages`. |
| Node.js | Versión 24. Pruebas con `node --test tests/*.test.mjs`. |
| GitHub Pages | En Configuración → Pages, seleccionar **GitHub Actions** como origen. El trabajo de despliegue usa el entorno `github-pages` y los permisos `pages: write` e `id-token: write`. |
| Artefacto y verificación | `dist/` contiene el sitio y `version.txt`. `GITHUB_SHA` identifica el commit y `PAGE_URL` recibe la URL devuelta por el despliegue. |

| Archivo | Función |
|---|---|
| `.github/workflows/pipeline.yml` | Orquesta la liberación y el despliegue. |
| `scripts/preparar_entorno.sh` | Prepara el entorno de liberación. |
| `scripts/ejecutar_pruebas.sh` | Ejecuta las pruebas sobre la copia de liberación. |
| `scripts/desplegar.sh` | Genera el artefacto que se publica en GitHub Pages. |
