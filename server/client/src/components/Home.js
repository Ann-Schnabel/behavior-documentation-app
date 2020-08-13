import React, { Component } from 'react';
import '../styles/Home.css';

import NavBar from './NavBar'
import StudentList from './StudentList'

class Home extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <StudentList />
            
        </div>
      );
  }
}

export default Home;