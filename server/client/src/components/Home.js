import React, { Component } from 'react';
import '../styles/Home.css';

import NavBar from './NavBar';
import StudentList from './StudentList';
import EmptyHome from './EmptyHome';

class Home extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <StudentList />
            <EmptyHome />
        </div>
      );
  }
}

export default Home;