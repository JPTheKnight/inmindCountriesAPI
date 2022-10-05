FROM node:14-alpine3.16 AS Build
COPY . /app
WORKDIR /app
RUN npm i
RUN npm run build --prod

FROM nginx:alpine
COPY --from=Build /app/dist/CountriesAPI /usr/share/nginx/html
EXPOSE 80