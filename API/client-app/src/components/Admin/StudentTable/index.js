import React ,{Component} from 'react';
import {Table,Button,Input} from 'antd';
import { Container } from 'react-bootstrap';
import { connect } from "react-redux";
import { WithApiService } from "../../../with-api-service/with-api-service";
import { usersLoaded } from'../../../actions/UserAction';
import { history } from '../../../index';
import moment from 'moment';
import {Link} from 'react-router-dom';

class StudentsPage extends Component{
  
  state = {
  
    allUsersCount: 0,
    pageNumber: 1,
    defaultSearchParameter: "",
  }
  componentDidMount(){
  const {apiStoreService,  usersLoaded } = this.props
  const {pageNumber} =this.state;
  apiStoreService.getAllUsers(pageNumber).then((res) => {
    console.log(res);
    var users= res.users.map(item => {
      return {
        key: item.id,
        age: item.age,
        name: item.name,
        lastName: item.lastName,
        registeredDate: moment(item.registeredDate).format("D MMMM YYYY"),
        email: item.email
      }
    })
      usersLoaded(users);
      this.setState({
        allUsersCount: res.pageNumber,
      });
  })
}
onChange = (pagination) => {
  const { apiStoreService, usersLoaded } = this.props;

  apiStoreService.getAllUsers(pagination.current).then((res) => {
    var users = res.users.map(item => {
      return {
        key: item.id,
        age: item.age,
        name: item.name,
        lastName: item.lastName,
        registeredDate: moment(item.registeredDate).format("D MMMM YYYY"),
        email: item.email
      }
    })

    usersLoaded(users);
    this.setState({
      allUsersCount: res.pageNumber,
    });
  });
};

getUserID = (id) => {
  const { userIdLoaded } = this.props;
  userIdLoaded(id);
}
// onSearch = (value) => {
//   const { apiStoreService, usersLoaded } = this.props;
//   const {pageNumber} =this.state;
//   apiStoreService.getAllUsers(pageNumber).then((res) => {
//     console.log(res);
//     usersLoaded(res.users);
//     this.setState({
//       allUsersCount: res.generalCount,
//     });
//   });
// };



render(){
 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: "Firstname",
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: "Lastname",
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: "Age",
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: "Email",
      },
      {
        title: 'Registered Date ',
        dataIndex: 'registeredDate',
        key: "RegisteredDate",
  
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
  
        render: (res) => 
          <Button style={{ backgroundColor: '#fc3955',  fontFamily: 'Candara',  color: 'white' , border:'none'}} onClick={() => {
            history.push(`admin/edit/${res.key}`)}}>Edit</Button>,
      },
    ];
  const{ ListUsers }=this.props;
  
     
    return(
        <Container style={{marginTop:'20px'}}>
  <Input.Search
      placeholder="Input students"
      allowClear
      enterButton="Search"
      size="large"
     
      style={{ width: '30%',float:'right' ,margin:'10px'}}
    />
<Table
columns={columns}
   onChange={this.onChange.bind(this)}
  pagination={{
    defaultCurrent: this.state.pageNumber,
    pageSize: 3,
    total: this.state.allUsersCount,
    showSizeChanger: false,
  }}
 
  dataSource={ListUsers}/>
</Container>
    );
}
}
const mapStateToProps = ({UserReducer})  => {
  const {ListUsers } = UserReducer;
  return { ListUsers}
}
const mapDispatchToProps  = {
  usersLoaded
}
export default WithApiService()(connect(mapStateToProps, mapDispatchToProps)(StudentsPage));