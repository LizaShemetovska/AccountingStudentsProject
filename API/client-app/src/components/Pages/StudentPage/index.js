import React,{Component, Fragment} from 'react';
import {Container} from 'react-bootstrap';
import Header from '../../Pages/Header/';
import Courses from '../Courses';

import Students from '../../Admin/StudentTable';
class StudentPage extends Component{
    render(){
        return(
          <Fragment>
           <Header/>
         <Courses/>
           </Fragment>
        );
    }
}
export default StudentPage;