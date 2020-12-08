# node base image
FROM node:12.2.0-alpine as build

# working directory
WORKDIR /app

# copy everything to current working directory 
COPY . ./

# run npm install
RUN npm install &&\
  npm run build

# nginx base image
FROM nginx:1.16.0-alpine

# copy static contents of project to nginx html 
COPY --from=build /app/dist/angular-demoapp8 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
