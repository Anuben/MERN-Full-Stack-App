import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ShowStudent(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };

  const deleteStudent = (id) => {
    setShowLoading(true);
    const user = {firstName: data.firstName, lastName: data.lastName, 
      email: data.email, username: data.username, password: data.password,studentAddress: data.studentAddress, studentCity: data.studentCity, studentPhoneNumber: data.studentPhoneNumber, studentProgram: data.studentProgram   };
  
    axios.delete(apiUrl, user)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Name: {data.firstName}, {data.lastName}</h1>
        <p>Email: {data.email}</p>
        <p>Student Number: {data.username}</p>
        <p>Student Address: {data.studentAddress}</p>
        <p>Student City: {data.studentCity}</p>
        <p>Student Phone Number: {data.studentPhoneNumber}</p>
        <p>Student Program: {data.studentProgram}</p>

        <p>
          <Button type="button" variant="primary" className='btn btn-primary mt-4' onClick={() => { editStudent(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" className='btn btn-primary mt-4'  onClick={() => { deleteStudent(data._id) }}>Delete</Button>&nbsp;
          <Link className='btn btn-primary mt-4' to={`/list/`}>Back to student list</Link>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudent);
