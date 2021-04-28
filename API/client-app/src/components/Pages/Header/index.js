import React from 'react';
import './style.css';
import { connect } from "react-redux";
import { WithApiService } from "../../../with-api-service/with-api-service";
import { logout } from'../../../actions/AccountAction';
import jwt from 'jsonwebtoken';
import { history } from '../../../index';
import { Container } from 'react-bootstrap';
import { Menu,Typography ,Button} from 'antd';
import {Link} from 'react-router-dom';
class Header extends React.Component {
  state = {
    current: 'mail',
  }
  logoutClick=()=>{
    const { logout } = this.props; 
    logout();
    history.push("/");
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({
        current: e.key,
    });
};
  render() {
    let username = "";
    const token = localStorage.getItem("studAcc-Token");
    const role = localStorage.getItem("studAcc-Role");
    if(token === null&& role===null){
      localStorage.removeItem("studAcc-Token");
      localStorage.removeItem("studAcc-Role");
      history.push("/");
    }
    else{
      let userFromToken = jwt.decode(token);
      const { nameid } = userFromToken
      username = nameid;
  }
    return (
      <Container fluid style={{ backgroundColor: '#969696',opacity:'90%' }}>
         <Container >
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{ backgroundColor: '#969696',opacity:'90%' }}>
                <Menu.Item style={{ float: 'left' }} key="app" disabled>
                    <Typography.Text style={{color:'white'}} className="header_name" >Student Accounting</Typography.Text >
                </Menu.Item>
                {
                  role==="user"? <Menu.Item >
                  <Link style={{fontFamily: 'Footlight MT',color:'white',fontSize: '16px'}} to="/main/profile">My profile</Link >
                    </Menu.Item>
                    :
                    <Menu.Item >
                  <Link style={{fontFamily: 'Footlight MT',fontSize: '16px',color:'white'}} to="/admin">Users</Link >
                    </Menu.Item>
                }
                {
                  role==="admin"? <Menu.Item >  <Link style={{fontFamily: 'Footlight MT',fontSize: '16px',color:'white'}} to="/admin/all-courses">All courses</Link ></Menu.Item>
                  
                  :<Menu.Item >  <Link style={{fontFamily: 'Footlight MT',fontSize: '16px',color:'white'}} to="/main">Courses</Link ></Menu.Item>}
                
                <Menu.Item  style={{float:'right'}} disabled>
                      <Typography.Text style={{fontFamily: 'Footlight MT',fontSize: '16px',color:'white' ,paddingRight:'5px'}} >{username}</Typography.Text >
                      <Button style={{ backgroundColor: '#fc3955',  fontFamily: 'Candara',  color: 'white' , border:'none'}} type="primary" onClick={this.logoutClick}>Logout</Button>
                  </Menu.Item>

            </Menu>
      
            </Container>
      </Container>
    );
  }
}
const mapStateToProps = ({AccountReducer})  => {
  const {  errors  } = AccountReducer;
  return { errors  };
}

const mapDispatchToProps  = {
  logout
}
export default WithApiService()(connect(mapStateToProps,mapDispatchToProps)(Header)) ;