# Instalación con Docker — Landing de detección TEA

Guía paso a paso para desplegar la landing estática **Detección de TEA — Pipeline de IA** (`deteccion_autismo_flujo.html`) usando Docker y Nginx.

Los nombres de imagen, contenedor, red y servicio están generados en torno al tema (espectro autista, neurodetección, pipeline clínico).

---

## Requisitos previos

| Requisito | Versión mínima recomendada |
|-----------|----------------------------|
| Docker Engine | 24.x |
| Docker Compose (plugin) | v2.20+ |
| Git | cualquier versión reciente |

Comprueba que Docker responde:

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

Si ya lo tienes clonado, actualiza la rama con la guía y los archivos Docker:

```bash
git fetch origin
git checkout install-guide
git pull origin install-guide
```

---

## Paso 2 — Revisar la estructura relevante

Debes tener, como mínimo, estos archivos en la raíz del proyecto:

```
HerramientasdeGestion/
├── docker/
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── Documentación/
│   └── deteccion_autismo_flujo.html   ← landing (se publica como index.html)
└── Recursos/
    └── eye.png                         ← recursos estáticos opcionales
```

---

## Paso 3 — Entender los nombres del despliegue

| Elemento | Nombre asignado | Descripción |
|----------|-----------------|-------------|
| Proyecto Compose | `proyecto-neuroespectro` | Agrupación del stack |
| Servicio | `servicio-pagina-espectro` | Proceso que sirve la web |
| Imagen | `espectro-aurora-landing:2.4` | Imagen construida localmente |
| Contenedor | `contenedor-neurovista-tea` | Instancia en ejecución |
| Red Docker | `red-pipeline-deteccion` | Red aislada del servicio |
| Puerto host | `8742` | Acceso: `http://localhost:8742` |

---

## Paso 4 — Construir la imagen

Desde la raíz del repositorio:

```bash
docker compose build servicio-pagina-espectro
```

Salida esperada: build exitoso y etiqueta `espectro-aurora-landing:2.4`.

Para forzar una reconstrucción sin caché:

```bash
docker compose build --no-cache servicio-pagina-espectro
```

---

## Paso 5 — Levantar el contenedor

```bash
docker compose up -d servicio-pagina-espectro
```

Verifica que el contenedor está activo:

```bash
docker ps --filter name=contenedor-neurovista-tea
```

Estado esperado: `Up` y puerto `0.0.0.0:8742->80/tcp`.

---

## Paso 6 — Abrir la landing en el navegador

| Entorno | URL |
|---------|-----|
| Máquina local | http://localhost:8742 |
| Misma red (otro equipo) | http://<IP-del-host>:8742 |

Deberías ver el título **Detección de TEA — Pipeline de IA** y el diagrama de flujo del pipeline.

Recursos estáticos (si los referencias en el HTML):  
`http://localhost:8742/recursos/eye.png`

---

## Paso 7 — Comprobar logs y salud

```bash
docker compose logs -f servicio-pagina-espectro
```

Prueba HTTP rápida:

```bash
curl -I http://localhost:8742
```

Respuesta esperada: `HTTP/1.1 200 OK`.

---

## Paso 8 — Detener y eliminar (manteniendo la imagen)

```bash
docker compose down
```

Solo el contenedor y la red `red-pipeline-deteccion` se eliminan; la imagen `espectro-aurora-landing:2.4` permanece en disco.

Para eliminar también la imagen:

```bash
docker compose down --rmi local
```

---

## Paso 9 — Actualizar la landing tras cambios en el HTML

1. Edita `Documentación/deteccion_autismo_flujo.html`.
2. Reconstruye y reinicia:

```bash
docker compose up -d --build servicio-pagina-espectro
```

---

## Solución de problemas

### El puerto 8742 ya está en uso

Edita `docker-compose.yml` y cambia la línea de puertos, por ejemplo:

```yaml
ports:
  - "8743:80"
```

Luego:

```bash
docker compose up -d --build servicio-pagina-espectro
```

### `Cannot connect to the Docker daemon`

Inicia el servicio Docker en tu sistema o añade tu usuario al grupo `docker` y vuelve a iniciar sesión.

### Página en blanco o 404

- Confirma que existe `Documentación/deteccion_autismo_flujo.html`.
- Reconstruye sin caché (Paso 4, variante `--no-cache`).
- Revisa logs: `docker compose logs servicio-pagina-espectro`.

### Fuentes de Google no cargan

La landing usa fuentes externas (`fonts.googleapis.com`). Se necesita salida a internet desde el navegador del cliente, no desde el contenedor.

---

## Referencia rápida de comandos

```bash
# Arrancar
docker compose up -d servicio-pagina-espectro

# Estado
docker compose ps

# Logs
docker compose logs -f servicio-pagina-espectro

# Parar
docker compose down
```

---

## Resumen

1. Clonar o actualizar el repo en la rama `install-guide`.
2. `docker compose build servicio-pagina-espectro`
3. `docker compose up -d servicio-pagina-espectro`
4. Abrir http://localhost:8742

La landing se sirve como `index.html` desde Nginx dentro del contenedor `contenedor-neurovista-tea`.
