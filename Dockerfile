# build
FROM node:9.11.1 as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
#RUN npm install --silent
RUN npm install
#RUN npm install react-scripts -g --silent
RUN npm install react-scripts -g 
COPY . /usr/src/app
RUN npm run build
# prod
FROM nginx:1.13.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
