import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditCourse(props) {
  console.log('edituser props:',props.match.params)
  const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '', username: '' });  
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  
  useEffect(() => {
    setShowLoading(false);
   
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { courseCode: course.courseCode,courseName: course.courseName,section: course.section,semester: course.semester};
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        props.history.push('/showcourse/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const course = {courseCode: data.courseCode , courseName: data.courseName , section: data.section , semester: data.semester};
    //
    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/listCourses')
      }).catch((error) => setShowLoading(false));
  };
  
  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
  }


  const pagestyle1 = {
    color: "black",
    backgroundColor: "SteelBlue",
    padding: "20px",
    fontFamily: "Arial"
  };
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
      <Jumbotron>
        <Form onSubmit={updateCourse}>
        <div className="container mt-5">
                <div className="row d-flex justify-content-center"style={pagestyle1}>
                    <div className="col-md-6">
                        <h1>{props.title}</h1>
                        <div className="card  mt-5">
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
                                        <option value="4">6</option>
                                    </select>
                                </div>
          <Button variant="primary" type="submit">Update Course</Button>&nbsp;&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Delete</Button>
          </div>
  </div>
  </div>
  </div>
  </div>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditCourse);

