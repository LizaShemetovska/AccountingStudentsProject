import React, { Fragment } from 'react';
import Header from '../../Pages/Header/';
import { WithApiService } from "../../../with-api-service/with-api-service";
import { withRouter } from "react-router";
import {Input,InputNumber,Button,Row,Col,message} from 'antd';
import { history } from '../../../index';
const key = 'updatable';
class EditUser extends React.Component{
  state = {
    id: "",
    name: "",
    lastname: "",
    age: "",
    registerdate: "",
    email: "",
    role: "",
   
};

componentDidMount() {
  const { apiStoreService } = this.props;
  const { id } = this.props.match.params;
  apiStoreService.getUserById(id).then((res) => {
  console.log(res);
    this.setState({
      id: id,
    name: res.name,
      lastname: res.lastName,
      age: res.age,
      email: res.email,
      registerdate: res.registerDate,
      role: res.role,
    });
  });
}
handleData = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
  });

}
handleAge = (e) => {
  this.setState({
      age: e,
  });
 
}
onCancel = () =>{
  history.push("/admin");
}
Save = () =>{
  const { apiStoreService } = this.props;
  
  const user ={
      id: this.state.id,
     name: this.state.name,
      lastname: this.state.lastname,
      age: this.state.age,
      email: this.state.email,
  }

  apiStoreService.updateUser(user).then(res => {
        message.loading({ content: 'Updating...', key });
    if(res===200)
    {
      message.success({ content: 'User data updated!', key, duration: 2 });
    history.push("/admin");
    }  
    else{
      message.error('Problems with user editing');
    }
  })
}
render(){
 
console.log(this.state.name);
    return (
        <Fragment>
        <Header/>
       <div >

        <Row align="middle" justify="center" >
          <Col   md={10} xs={24}>
           
          <h1 className="update_user_h1">Edit User </h1>
          <Row>
       <Col md={6} xs={8}> <p className="update_user_p">Name: </p>  </Col> 
      <Col md={18} xs={16}>
          <Input className="update_user_input" name="name" value={this.state.name} onChange={this.handleData} />
      </Col>  
          </Row>
          <Row>
       <Col md={6} xs={8}> <p className="update_user_p">LastName: </p>  </Col> 
      <Col md={18} xs={16}>
          <Input className="update_user_input" name="lastname" value={this.state.lastname}  onChange={this.handleData} />
      </Col>  
          </Row>
          <Row>
       <Col md={6} xs={8}> <p className="update_user_p">Age: </p>  </Col> 
      <Col md={18} xs={16}>
          <InputNumber style={{ width: '100% '}} className="update_user_input" name="age" min={16} max={40} value={this.state.age}  onChange={this.handleAge}/>
      </Col>  
      
          </Row>
          <Row>
       <Col md={6} xs={8}> <p className="update_user_p">Email: </p>  </Col> 
      <Col md={18} xs={16}>
          <Input  className="update_user_input" name="email" value={this.state.email}   onChange={this.handleData}/>
      </Col>  
     
          </Row>
          <Row>
       <Col md={6} xs={8}> <p className="update_user_p">Registered date: </p>  </Col> 
      <Col md={18} xs={16}>
      <p style={{fontSize:'18px'}}className="update_user_p">{this.state.registerdate} </p> 
      </Col>  
      </Row>
      <Row>
       <Col md={6} xs={8}> <p className="update_user_p">Role: </p>  </Col> 
      <Col md={18} xs={16}>
      <p style={{fontSize:'18px'}}className="update_user_p">{this.state.role} </p> 
      </Col>  
      </Row>
        <Row>
          <Col className="update-cancel_btn" md={12} xs={24} >
          <Button  type="dashed"  className="update-form-btn-saved" onClick={this.onCancel}>Cancel</Button>
        </Col>
        <Col className="update-save_btn" md={12} xs={24}>
                  <Button type="dashed" onClick={this.Save} className="update-form-btn-saved" >
                    Save
                  </Button>
                  </Col>
        </Row>
          </Col>
        </Row>
       </div>
        </Fragment>
    )
}
}

  export default WithApiService()(withRouter(EditUser));