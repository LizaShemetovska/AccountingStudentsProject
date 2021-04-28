import React,{Component} from 'react';
import {  Route, Switch,Redirect  } from 'react-router-dom';
import LoginPage from'../Pages/LoginPage/';
import RegistrationPage from '../Pages/RegisterPage/';
import ConfirmEmail from '../Pages/ConfirmEmail/';
import StudentPage from '../Pages/StudentPage';
import AdminPage from '../Admin/AdminPage/';
import StudentProfile from '../Pages/StudentProfile';
import AllCourses from '../Admin/AllCourses/';
import AdminEditUser from '../Admin/EditUser/';
import Courses from '../Pages/Courses/';
class App extends Component {
  PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
            localStorage.getItem("studAcc-Token") ? (
            children
          ) : (
            <Redirect to={{ pathname: "/", state: { from: location } }} />
          )
        }
      />
    );
  }

  RoleRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (localStorage.getItem("studAcc-Role") === "admin") {
            return children;
          } else {
            return (
              <Redirect to={{ pathname: "/main", state: { from: location } }} />
            );
          }
        }}
      />
    );
  }
  
 
  
render(){
  return(
  
      <Switch>
          <Route path="/" exact render={() => <LoginPage />} />
          <Route path="/register" exact render={() => <RegistrationPage />} />
          <Route path="/confirmemail" exact render={() => <ConfirmEmail />} />
          <this.RoleRoute path="/admin" exact>
              <AdminPage />
          </this.RoleRoute>
          <this.PrivateRoute path="/main" exact>
              <StudentPage />
          </this.PrivateRoute>
          <this.RoleRoute path="/admin/all-courses" exact >
            <AllCourses/>
          </this.RoleRoute> 
          <this.RoleRoute exact path="/admin/edit/:id" >
            <AdminEditUser/>
          </this.RoleRoute>
          <this.PrivateRoute path="/main/profile" exact>
              <StudentProfile />
          </this.PrivateRoute>
      </Switch>
     
  );
}
}

export default App;
