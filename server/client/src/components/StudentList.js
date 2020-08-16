import React, { Component } from 'react';
import '../styles/StudentList.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'


class StudentList extends Component {
  constructor() {
    super()

    this.state = {
      dropDown: true
    }
  }

  toggleStudents = () => {
    this.setState({dropDown: !this.state.dropDown})
  }

  screenSizeDropDownDecision() {
    if (window.innerWidth < 600) {
      this.setState({dropDown: false})
    } else this.setState({dropDown: true})
  }

  renderStudents() {
    const students = ['Ann Schnabel', 'Spalding Vance', 'Pierre Lourens'];

    return students.map(student => {
      return (
        <NavLink to='/home/:id' className='student-links'>
            {student}
        </NavLink>
      )
    });
  }
  
  render() {
    return (
      <div>
        <div id='student-container'>
          <div id='student-container-header'>
            <h2>Students</h2>
            {this.state.dropDown && <FontAwesomeIcon className='drop-down-icon' onClick={this.toggleStudents} icon={faChevronDown} size='3x'/> }
            {!this.state.dropDown && <FontAwesomeIcon className='drop-down-icon' onClick={this.toggleStudents} icon={faChevronUp} size='3x'/> }
          </div>
          {this.state.dropDown && this.renderStudents()}
        </div>
      </div>
    );
  }
}

export default StudentList;


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
