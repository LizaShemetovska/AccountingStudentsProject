import React,{Component} from 'react';
import {Col,Row} from 'antd';
import {Link} from 'react-router-dom'
class ConfirmEmail extends Component{
    render(){
        return(
            <div className="tmp">
            <Row align="middle" justify="center" className="container_row_loginpage"> 
            <Col span={24}  className="confirmemail-form"> 
            <p>Thank you for registration. <br></br>Please confirm your registration in your email!</p>
            <Link className="register-form-link" to="/"> Sign in</Link>
            </Col>
          
            </Row>
            </div>
        );
    }
}
export default ConfirmEmail;