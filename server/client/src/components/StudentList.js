import React, { Component, useState } from 'react';
import '../styles/StudentList.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'


export default function StudentList() {
  const [dropDown, setDropDown] = useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);

    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  const checkWindowWidth = () => {
    const breakpoint = window.matchMedia("(min-width: 600px)");
    if (breakpoint.matches) {
      setDropDown(true)
    } else setDropDown(false)
  };

  const toggleStudents = () => {
    setDropDown(!dropDown)
  }

  const renderStudents = () => {
    const students = ['Ann Schnabel', 'Spalding Vance', 'Pierre Lourens'];

    return students.map(student => {
      return (
        <NavLink to='/home/:id' className='student-links'>
            {student}
        </NavLink>
      )
    });
  }

  return (
    <div>
      <div id='student-container'>
        <div id='student-container-header'>
          <h2>Students</h2>
          {!dropDown && <FontAwesomeIcon className='drop-down-icon' onClick={toggleStudents} icon={faChevronDown} size='3x'/> }
          {dropDown && <FontAwesomeIcon className='drop-down-icon' onClick={toggleStudents} icon={faChevronUp} size='3x'/> }
        </div>
        {dropDown && renderStudents()}
      </div>
    </div>
  );

}


{/* <NavLink to='/home/:id' className='student-links'>
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
</NavLink>  */}
