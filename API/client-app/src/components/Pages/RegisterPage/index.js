import React,{Component} from 'react';
import {Link } from 'react-router-dom';
import {Form,Input, Button,Col,InputNumber,Row,Alert} from 'antd';
import { connect } from "react-redux";
import { history } from '../../../index';
import {registerError} from '../../../actions/AccountAction';
import { WithApiService } from "../../../with-api-service/with-api-service";
class RegistrationPage extends Component{
  
  state = {
    name: "",
    lastName: "",
    email: "",
    age: "",
    password: ""
  };
 
  onFinish=(event)=>{

    const data = {
      name: event.name,
      lastName: event.lastname,
      age: event.age,
      email: event.email,
      password: event.password,
    };

    const{apiStoreService,registerError}=this.props;
    apiStoreService.register(data).then(res=>{
      console.log(res.data);
       if(res.data===201){
       history.push("/confirmemail");
       }
       else
       {
        console.log(res.data.errors)
         registerError(res.data.errors);
       }

      }).catch(err => registerError(err))
      }


    render(){
      const {errors}=this.props;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
          };
       
     return(
      
      <div className="tmp">
        <Row align="middle" justify="center" className="container_row_registerpage"> 
          <Col span={24} className="register-form">
            <h1 id="registr_page">Registration </h1>
            { errors && <Alert message={errors} type="error"/> }
            <Form  {...formItemLayout} onFinish={this.onFinish}   name="basic" initialValues={{ remember: true }}>
              <Form.Item name="name" labelAlign="left"  style={{color:'white'}}
               rules={[{ required: true, message: 'Please input your Name!' }]}>
           
      
                  <Input placeholder="Name"  />
              </Form.Item>
              <Form.Item name="lastname" labelAlign="left" rules={[{ required: true, message: 'Please input your LastName!' }]} >
           
                  <Input  placeholder="LastName"/>
               
              </Form.Item>
              <Form.Item name="age" labelAlign="left" rules={[{ required: true, message: 'Please input your Age!' }]}>
              <InputNumber style={{ width: '100% '}} min={16} max={40} placeholder="Age"/>
           
              
              </Form.Item>
              <Form.Item name="email" labelAlign="left" rules={[{ required: true, message: 'Please input your Email!' }]}>
                  <Input placeholder="Email" />
              </Form.Item>
             
              <Form.Item name="password" labelAlign="left"  rules={[{ required: true, message: 'Please input your password!'}]}> 
                  <Input.Password  placeholder="Password"/>
               
              </Form.Item>
              <Form.Item  name="confirm" dependencies={['password']}hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]}>
        <Input.Password placeholder="Confirm Password"/>
      </Form.Item>
              <Form.Item style={{margin:'0 20 0 20px'}} >
                  <Button align="center" type="dashed" htmlType="submit" className="register-form-btn" >
                    Register
                  </Button>
              </Form.Item>
            </Form>
       
            <Link  className="register-form-link" to="/"> Back to Login</Link>
          </Col>
        </Row>
      </div>
        );
    }
}


const mapStateToProps = ({AccountReducer})  => {
  const {  errors } = AccountReducer;
  return { errors}
}

const mapDispatchToProps  = {
   registerError
}
export default WithApiService()(connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)) ;