import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import { Form, Input, Button,Col,Row,Alert} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { WithApiService } from "../../../with-api-service/with-api-service";
import { loginRequested, loginError, loginWithToken } from'../../../actions/AccountAction';
import Loader from "./spinner";
import { history } from '../../../index';

class LoginPage extends Component{
  
  onFinish=(event)=>{
    console.log("event",event);
    const { apiStoreService, loginError,loginRequested ,loginWithToken} = this.props; 
    loginRequested();
    apiStoreService.login(event).then(res => {
    if (res.hasOwnProperty('statusText')){
      const error = "Невірний логін або пароль."; 
       loginError(error);
    }
    else{
      loginWithToken(res.data); 
      const token = localStorage.getItem("studAcc-Token");
      const role = localStorage.getItem("studAcc-Role");
      if (token !== null && role !== null){
        console.log("role",role);
            if(role==="admin"){
              history.push("/admin");
            }
            else{
              history.push("/main");
            }
      }
    
    }
  }).catch(err => loginError(err))
}
    render(){
      const {  errors} = this.props; 
        return(
                <div className="tmp">
                <Row align="middle" justify="center" className="container_row_loginpage"> 
                <Col span={24}  className="login-form"> 
                <h1 id="login_page">Login</h1>
                { errors && <Alert message={errors} type="error"/> }
                <Form  name="normal_login" style={{marginTop:'10px'}} onFinish={this.onFinish}  initialValues={{ remember: true }}>
               
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your Username!' }]}>
                      <Input prefix={<UserOutlined className="color_icon site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                      <Input prefix={<LockOutlined className="color_icon site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                       <Button  type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                  </Form.Item>
                </Form>
                <Row justify="center" >
                        <p style={{paddingTop:'15px',color:'white'}}> Don't have an account <Link style={{color:'#fc3955',fontSize:'16px'}}to="/register">Register</Link></p>
                     </Row>
                </Col>
                </Row>
              </div>
        
        );
    }
}
const mapStateToProps = ({AccountReducer})  => {
  const {  errors, loading } = AccountReducer;
  return { errors, loading}
}

const mapDispatchToProps  = {
  loginRequested, loginError,loginWithToken
}

export default WithApiService()(connect(mapStateToProps, mapDispatchToProps)(LoginPage)) ;
