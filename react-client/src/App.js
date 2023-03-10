import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

import List from './components/List';
//listcourses, createcourse, coursestudent
import ListCourses from './components/ListCourses';
import EditStudent from './components/EditStudent';
import EditCourse from './components/EditCourse';

import CreateCourse from './components/CreateCourse';
import CreateStudent from './components/CreateStudent';
import ShowStudent from './components/ShowStudent';
import ShowCourse from './components/ShowCourse';

import Home from './components/Home';
import Login from './components/Login';

function App() {

  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
     
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/list">List of Students</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
            <Nav.Link href="/listCourses">List of Courses</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
      </nav>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < ListCourses />} path="/listCourses" />
          <Route render ={()=> < CreateCourse />} path="/createCourse" />
          <Route render ={()=> < EditStudent />} path="/edit/:id" />
          <Route render ={()=> < CreateStudent />} path="/create" />
          <Route render ={()=> < ShowStudent />} path="/show/:id" />
          <Route render ={()=> < ShowCourse />} path="/showcourse/:id" />
          <Route render ={()=> < EditCourse />} path="/editcourse/:id" />

      </div>

    </Router>


  );
}

export default App;
