import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';


function CreateCourse(props) {
    
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '',username: '' });
    const [showLoading, setShowLoading] = useState(false);
    
    const apiUrl = "http://localhost:3000/api/courses"
    
    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {courseCode: course.courseCode , courseName: course.courseName , section: course.section , semester: course.semester, username: username };
        
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save courses:',result.data)
            props.history.push('/showcourse/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    
    const onChange = (e) => {
        e.persist();
        setCourse({...course, [e.target.name]: e.target.value});
      }

      const pagestyle = {
        color: "black",
        backgroundColor: "LightBlue",
        padding: "20px",
        fontFamily: "Arial"
      };
    
    return (
        
        <div>
            <h2> Welcome {username}, please add a course:</h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron style={pagestyle}>
            <Form onSubmit={saveCourse}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">                   
                            <div className="card-body"style={pagestyle}>
                                <div className="form-group mt-3">
                                    <label htmlFor="Ccose">Course Code</label>
                                    <input type="text" name="courseCode" id="courseCode" value={course.courseCode} onChange={onChange}  className="form-control" />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="Cname">Course Name</label>
                                    <input type="text" name="courseName" id="courseName" className="form-control" onChange={onChange} value={course.courseName} />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="Cname">Section</label>
                                    <select name="section" id="section" className='form-control' value={course.section} onChange={onChange}>
                                        <option value="">Select</option>
                                        <option value="SEC001">SEC001</option>
                                        <option value="SEC002">SEC002</option>
                                        <option value="SEC003">SEC003</option>
                                        <option value="SEC004">SEC004</option>
                                        <option value="SEC005">SEC005</option>
                                        <option value="SEC006">SEC006</option>
                                        <option value="SEC007">SEC007</option>
                                        <option value="SEC008">SEC008</option>
                                    </select>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="Cname">Semester</label>
                                    <select name="semester" id="semester" className='form-control' onChange={onChange} value={course.semester}>
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                      
        <Button variant="primary" type="submit">Save Course </Button>
        </div>
  </div>
  </div>
 

      </Form>
      </Jumbotron>
  </div>

);
}

export default withRouter(CreateCourse);
