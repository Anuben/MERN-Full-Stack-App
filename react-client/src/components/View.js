import CreateCourse from './CreateCourse';
import React, { useState } from 'react';

import axios from 'axios';


function View (props) {
  
  const { screen, setScreen } = props;
  
  const [data, setData] = useState();
 
  const [course, setCourse] = useState('');
  
  const deleteCookie = async () => {
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
 
  return (
    <div className="App">
      {course !== 'y'
        ? <div>
            <p>{screen}</p>
            <p>{data}</p>
            <button onClick={verifyCookie}>Verify Cookie</button>
            <button onClick={createCourse}>Create Course</button>
            <button onClick={listCourses(data)}>List Courses</button>

            <button onClick={deleteCookie}>Log out</button>
          </div>            
        : <CreateCourse screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}


export default View;