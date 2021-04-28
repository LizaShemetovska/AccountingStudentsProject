import React,{Component, Fragment} from 'react';
import {Container} from 'react-bootstrap';
import Header from '../../Pages/Header/index';
import Students from '../../Admin/StudentTable';
class AdminPage extends Component{
    render(){
        return(
          <Fragment>
           <Header/>
          <Students/>
           </Fragment>
        );
    }
}
export default AdminPage;