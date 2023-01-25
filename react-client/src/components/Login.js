import React, { useState, useEffect } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import View from './View'

function App() {
  
  const [screen, setScreen] = useState('auth');
  
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  
  const auth = async () => {
    console.log('calling auth')
    console.log(username)
    try {
      
      const loginData = { auth: { username, password } }
      
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { 
      console.log(e);
    }
  
  };
  
 
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      
      const res = await axios.get('/read_cookie');
      
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  
  useEffect(() => {
    readCookie();
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
  <div className="App">
     {screen === 'auth'
     ? <div style={{ height: '90vh' }} className="row d-flex justify-content-center align-items-center">
          <div className="container mt-5" style={pagestyle1}>
              <div className="card">
                  <div className="card-body"style={pagestyle}>

                      <div className="row  d-flex justify-content-center align-items-center">
                          <div className="col-md-6">
                              <img className='img-fluid' src="logo.png" alt="" />
                          </div>
                          <div className="col-md-6">
                              <h3>Login</h3>
                              <div className="form-group mt-4">
                                  <label htmlFor="">Username</label>
                                  <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className='form-control' />
                              </div>
                              <div className="form-group mt-4">
                                  <label htmlFor="">Password</label>
                                  <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='form-control' />
                              </div>
                              <button onClick={auth} className='btn btn-primary mt-4'>Login</button>
                          </div>
                          
                      </div>


                  </div>
              </div>
          </div>
      </div>
: <View screen={screen} setScreen={setScreen} />
}
</div>
);
}
export default App;



