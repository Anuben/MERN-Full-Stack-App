import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditStudent(props) {
  const [student, setStudent] = useState({ _id: '', firstName: '', lastName: '', 
  email: '',username: '',password: '', studentAddress: '',studentCity: '',studentPhoneNumber: '',studentProgram: ''   });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + props.match.params.id;
  
  useEffect(() => {
    setShowLoading(false);
    
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: student.firstName, lastName: student.lastName, 
      email: student.email,username: student.username, studentAddress: student.studentAddress, studentCity: student.studentCity, studentPhoneNumber: student.studentPhoneNumber, studentProgram: student.studentProgram    };
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateStudent}>
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
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" name="username" id="username" placeholder="Enter user name" value={student.username} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="studentAddress" id="studentAddress" placeholder="Enter student address" value={student.studentAddress} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="studentCity" id="studentCity" placeholder="Enter student city" value={student.studentCity} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="text" name="studentPhoneNumber" id="studentPhoneNumber" placeholder="Enter student phone number" value={student.studentPhoneNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control type="text" name="studentProgram" id="studentProgram" placeholder="Enter student program" value={student.studentProgram} onChange={onChange} />
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditStudent);
