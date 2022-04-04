# Prueba técnica Front-End ReactJS

-> Biblioteca de videos, la cual accede a la API de Youtube para recuperar videos.

-> Tiempo de desarrollo: 6hrs

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Comandos a ejecutar para iniciar la APP

### `npm install`

### `npm start`

Abrir [http://localhost:3000](http://localhost:3000)

## Librerías utilizadas

-> axios - Para las peticiones HTTP (sólo utilizo GET) -> https://axios-http.com/
-> bootstrap v5.1.3 junto a react-bootstrap v2.1.2 -> https://react-bootstrap.netlify.app/

## API to USE

### Api de youtube que permite buscar videos con paginado

-> https://www.googleapis.com/youtube/v3/search"

## Orden de carpetas

La lógica de la aplicación se encuentra en ./src/App.js y los componentes implementados para los videos se encuentran en ./src/components (CardVideosComponent y CardVideo)
En la carpeta ./src/components/generals , se encuentran los componentes de loading y el de alerta

## Variables de Ambiente

para utilizar la api de youtube es necesario registrarse y utilizar una API_KEY, dicha llave fue creada con mis credenciales y se encuentra ubicada en .env.local -> REACT_APP_KEY

consideraciones:

- Esta clave expira, por lo tanto hay que actualizarla.
- La API tiene un limite de peticiones diarias de 1000
