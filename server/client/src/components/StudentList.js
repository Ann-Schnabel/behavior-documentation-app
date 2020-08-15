import React from 'react';
import '../styles/StudentList.css';
import { NavLink } from 'react-router-dom';


function StudentList() {
  return (
    <div>
      <div id='student-container'>
        <div id='student-container-header'>
          <h2>Students</h2>
          <h2 className='add'>+</h2>
        </div>
        <NavLink to='/home/:id' className='student-links'>
          Ann Schnabel
        </NavLink>
        <NavLink to='/home/:id' className='student-links'>
          Spalding Vance
        </NavLink>
        <NavLink to='/home/:id' className='student-links'>
          Will Schnabel
        </NavLink>
        <NavLink to='/home/:id' className='student-links'>
          Really really long name
        </NavLink>
      </div>
    </div>
  );
}

export default StudentList;
