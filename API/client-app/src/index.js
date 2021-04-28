import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import '../node_modules/antd/dist/antd.css';
import './index.css';
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import ApiStoreService from "./services/api-service";
import { ApiStoreServiceProvider } from "./components/api-service-context/api-service-context";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
const apiStoreService = new ApiStoreService();

export const history = createBrowserHistory();

ReactDOM.render(
<Provider store={store}>
    <ApiStoreServiceProvider value={apiStoreService}>
      <Router history={history}>
        <App/>
      </Router>
    </ApiStoreServiceProvider>
</Provider>, 
  document.getElementById('root')
);

