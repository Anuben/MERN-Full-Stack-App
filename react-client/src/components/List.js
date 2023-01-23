import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "http://localhost:3000/students";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          
          if(result.data.screen !== 'auth')
          {
            
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show/' + id
    });
  }

  const pagestyle = {
    color: "black",
    backgroundColor: "SteelBlue",
    padding: "20px",
    fontFamily: "Arial"
  };

  const pagestyle1 = {
    color: "black",
    backgroundColor: "LightBlue",
    padding: "20px",
    fontFamily: "Arial"
  };

  return (
    <div style={pagestyle}>
      { data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <ListGroup style={pagestyle1}>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.username}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(List);
