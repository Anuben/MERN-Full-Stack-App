import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';

function ListCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from courses',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);



  
  const pagestyle = {
    color: "black",
    backgroundColor: "LightBlue",
    padding: "20px",
    fontFamily: "Arial"
  };

  const pagestyle1 = {
    color: "black",
    backgroundColor: "SteelBlue",
    padding: "20px",
    fontFamily: "Arial"
  };
  
  return (
    <div className="container mt-5" style={pagestyle1}>
    <h1>Courses</h1>
    <div className="card mt-3 shadow" style={pagestyle}>
        <div className="card-header px-4">
            <div className="d-flex justify-content-between">
                <h3>List of courses</h3>
        
            </div>
        </div>
        <div className="card-body">
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Section</th>
                        <th>Semester</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(course => (
                            <tr id={course._id}>
                                <td>{course.courseCode}</td>
                                <td>{course.courseName}</td>
                                <td>{course.section}</td>
                                <td>{course.semester}</td>
                                <td className='d-flex gap-2'>
                                <Link className='btn btn-sm btn-success' to={`/course-students/${course._id}`}>View students</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className='btn btn-sm btn-primary' to={`/editcourse/${course._id}`}>Edit</Link>&nbsp;
                                    </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>

</div>
  );
}
//
export default withRouter(ListCourses);