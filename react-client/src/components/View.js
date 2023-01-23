import CreateCourse from './CreateCourse';
import React, { useState } from 'react';

import axios from 'axios';


function View (props) {
  
  const { screen, setScreen } = props;
  
  const [data, setData] = useState();
 
  const [course, setCourse] = useState('');
  
  const logOut = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const listCourses = (username) => {

    console.log('in listCourses: ',username)
  

  }
  
  const createCourse = () => {
    console.log('in createCourse')
    setCourse('y')

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
    <div className="container mt-5" style={pagestyle1}>
      <div className="container mt-5" style={pagestyle}>
      {course !== 'y'
        ? <div>
            <p>{data}</p>
            <h3>Welcome </h3> 
          
            <button onClick={createCourse} className='btn btn-primary mt-4'>Add Course</button>&nbsp;&nbsp;
            <button onClick={logOut} className='btn btn-danger mt-4'>Log out</button>
          </div>            
        : <CreateCourse screen={screen} setScreen={setScreen} />
      }
    </div>
    </div>
  );
}


export default View;