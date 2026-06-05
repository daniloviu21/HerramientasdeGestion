# Instalación con Docker — Página de presentación de detección TEA

Guía paso a paso para desplegar la página estática **Detección de TEA — Pipeline de IA** (`deteccion_autismo_flujo.html`) mediante Docker y Nginx.

Este sitio forma parte del ecosistema **AutiSense**: plataforma orientada a la detección temprana de señales de riesgo del Trastorno del Espectro Autista (TEA) mediante inteligencia artificial y visión por computadora.

Los nombres de imagen, contenedor, red y servicio se generaron en torno al tema (espectro autista, neurodetección, canal de análisis clínico).

---

## Requisitos previos

| Requisito | Versión mínima recomendada |
|-----------|----------------------------|
| Motor Docker (Docker Engine) | 24.x |
| Complemento Docker Compose | v2.20+ |
| Git | Cualquier versión reciente |

Comprueba que Docker responde correctamente:

```bash
docker --version
docker compose version
```

---

## Paso 1 — Obtener el repositorio

```bash
git clone https://github.com/daniloviu21/HerramientasdeGestion.git
cd HerramientasdeGestion
```

Si ya tienes el proyecto clonado, actualiza la rama que incluye esta guía y los archivos Docker:

```bash
git fetch origin
git checkout install-guide
git pull origin install-guide
```

---

## Paso 2 — Revisar la estructura del proyecto

En la raíz del repositorio deben existir, como mínimo, estos archivos:

```
HerramientasdeGestion/
├── docker/
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── Documentación/
│   └── deteccion_autismo_flujo.html   ← página principal (se publica como index.html)
└── Recursos/
    └── eye.png                         ← recursos estáticos opcionales
```

---

## Paso 3 — Nombres del despliegue

| Elemento | Nombre asignado | Descripción |
|----------|-----------------|-------------|
| Proyecto Compose | `proyecto-neuroespectro` | Agrupación del conjunto de servicios |
| Servicio | `servicio-pagina-espectro` | Proceso que sirve la página web |
| Imagen | `espectro-aurora-landing:2.4` | Imagen construida en tu equipo |
| Contenedor | `contenedor-neurovista-tea` | Instancia en ejecución |
| Red Docker | `red-pipeline-deteccion` | Red aislada del servicio |
| Puerto en la máquina anfitriona | `8742` | Acceso local: `http://localhost:8742` |

---

## Paso 4 — Construir la imagen

Desde la raíz del repositorio:

```bash
docker compose build servicio-pagina-espectro
```

**Resultado esperado:** construcción correcta y etiqueta de imagen `espectro-aurora-landing:2.4`.

Para forzar una reconstrucción completa (sin usar caché):

```bash
docker compose build --no-cache servicio-pagina-espectro
```

---

## Paso 5 — Iniciar el contenedor

```bash
docker compose up -d servicio-pagina-espectro
```

Comprueba que el contenedor está en ejecución:

```bash
docker ps --filter name=contenedor-neurovista-tea
```

**Estado esperado:** columna `STATUS` con valor `Up` (en ejecución) y puerto `0.0.0.0:8742->80/tcp`.

---

## Paso 6 — Abrir la página en el navegador

| Entorno | Dirección |
|---------|-----------|
| Equipo local | http://localhost:8742 |
| Otro equipo en la misma red | http://<IP-de-tu-equipo>:8742 |

Deberías ver el título **Detección de TEA — Pipeline de IA** y el diagrama de flujo del proceso de detección.

Recursos estáticos (si los enlazas desde el HTML):

`http://localhost:8742/recursos/eye.png`

---

## Paso 7 — Revisar registros y comprobar el servicio

Ver registros en tiempo real:

```bash
docker compose logs -f servicio-pagina-espectro
```

Prueba rápida por HTTP:

```bash
curl -I http://localhost:8742
```

**Respuesta esperada:** línea inicial `HTTP/1.1 200 OK` (servicio disponible).

---

## Paso 8 — Detener y eliminar (conservando la imagen)

```bash
docker compose down
```

Se eliminan el contenedor y la red `red-pipeline-deteccion`; la imagen `espectro-aurora-landing:2.4` permanece almacenada en disco.

Para eliminar también la imagen local:

```bash
docker compose down --rmi local
```

---

## Paso 9 — Actualizar la página tras modificar el HTML

1. Edita `Documentación/deteccion_autismo_flujo.html`.
2. Reconstruye e inicia de nuevo:

```bash
docker compose up -d --build servicio-pagina-espectro
```

---

## Solución de problemas

### El puerto 8742 ya está en uso

Edita `docker-compose.yml` y cambia el mapeo de puertos, por ejemplo:

```yaml
ports:
  - "8743:80"
```

Después ejecuta:

```bash
docker compose up -d --build servicio-pagina-espectro
```

### No se puede conectar al demonio de Docker

Mensaje habitual: `Cannot connect to the Docker daemon`.

**Qué hacer:** inicia el servicio Docker en tu sistema operativo o añade tu usuario al grupo `docker`, cierra sesión y vuelve a entrar.

### Página en blanco o error 404

- Verifica que existe `Documentación/deteccion_autismo_flujo.html`.
- Reconstruye sin caché (ver Paso 4, opción `--no-cache`).
- Consulta los registros: `docker compose logs servicio-pagina-espectro`.

### Las fuentes de Google no se muestran

La página usa tipografías externas (`fonts.googleapis.com`). El navegador del usuario necesita acceso a internet; el contenedor no tiene que descargar esas fuentes.

---

## Referencia rápida de comandos

```bash
# Iniciar en segundo plano
docker compose up -d servicio-pagina-espectro

# Ver estado de los servicios
docker compose ps

# Ver registros
docker compose logs -f servicio-pagina-espectro

# Detener y limpiar contenedor y red
docker compose down
```

---

## Resumen

1. Clonar o actualizar el repositorio en la rama `install-guide`.
2. Ejecutar `docker compose build servicio-pagina-espectro`.
3. Ejecutar `docker compose up -d servicio-pagina-espectro`.
4. Abrir http://localhost:8742 en el navegador.

La página se publica como `index.html` desde Nginx dentro del contenedor `contenedor-neurovista-tea`.
