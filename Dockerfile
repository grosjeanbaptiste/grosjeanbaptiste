FROM nginx:1.27-alpine

COPY grosjeanbaptiste.github.io/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
