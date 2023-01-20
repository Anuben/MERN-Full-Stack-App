
var students = require('../controllers/students.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    
    app.get("/students",students.requiresLogin,students.list); 
    
    app.post('/', students.create);
    
	app.route('/students/:studentId')
    .get(students.read)
    .put(students.update)
    .delete(students.delete)
   
    app.param('studentId', students.studentByID);
   
    app.post('/signin', students.authenticate);
    app.get('/signout', students.signout);
    app.get('/read_cookie', students.isSignedIn);


   
	app.get('/welcome',students.welcome);
    
};

