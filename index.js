const express = require('express');
const path = require('path');
const controllers = require('./controllers');

const {menu} = require('./menu');

const PORT = 3000;

const server = express()

server.set('view engine', 'ejs');
server.set('views', path.resolve(__dirname, 'view'));

server.use(express.static(path.resolve(__dirname, 'public')));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(controllers);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

menu();
