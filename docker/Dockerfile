FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY Documentación/deteccion_autismo_flujo.html /usr/share/nginx/html/index.html
COPY Recursos/ /usr/share/nginx/html/recursos/

EXPOSE 80
