FROM nginx


RUN rm -rf /etc/nginx/conf.d/* /docker-entrypoint.d/*

COPY  /nginx.conf /etc/nginx/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

