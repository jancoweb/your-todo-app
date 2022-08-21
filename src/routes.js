const express = require('express');
const routes = express();
const addTask = require('./Controllers/addTask');
const auth = require('./Controllers/auth');
const deleteTask = require('./Controllers/deleteTask');
const editTask = require('./Controllers/editTask');
const getTasks = require('./Controllers/getTasks');
const login = require('./Controllers/login');
const signUp = require('./Controllers/signUp');


routes.post('/signup', signUp);
routes.post('/login', login);

routes.use(auth);

routes.post('/task', addTask);
routes.get('/task', getTasks);
routes.patch('/task/:id', editTask)
routes.delete('/task/:id', deleteTask);


module.exports = routes;