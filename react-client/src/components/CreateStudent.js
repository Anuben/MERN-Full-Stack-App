import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateStudent(props) {
  const [student, setStudent] = useState({ _id: '', username: '', firstName: '', lastName: '', 
                email: '',studentNumber: '',password: '', studentAddress: '', studentCity: '', studentPhoneNumber: '', studentProgram: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {username: student.username, firstName: student.firstName, lastName: student.lastName, 
      email: student.email, password: student.password, studentAddress: student.studentAddress, studentCity: student.studentCity,  studentPhoneNumber: student.studentPhoneNumber, studentProgram: student.studentProgram };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  const pagestyle = {
    color: "black",
    backgroundColor: "LightBlue",
    padding: "20px",
    fontFamily: "Arial"
  };

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron style={pagestyle}>
        <Form onSubmit={saveStudent}>
        <Form.Group>
            <Form.Label>Student Number</Form.Label>
            <Form.Control type="text" name="username" id="username" placeholder="Enter Student Number" value={student.username} onChange={onChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={student.password} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="studentAddress" id="studentAddress" placeholder="Enter address" value={student.studentAddress} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="studentCity" id="studentCity" placeholder="Enter city" value={student.studentCity} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="studentPhoneNumber" id="studentPhoneNumber" placeholder="Enter phone number" value={student.studentPhoneNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Student Program</Form.Label>
            <Form.Control type="text" name="studentProgram" id="studentProgram" placeholder="Enter Program Name" value={student.studentProgram} onChange={onChange} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateStudent);
