import React from 'react';
import {Spin,Col,Row} from 'antd';

const Loader = () => {
  return (
  
      <Row>
        <Col className="loader">
         <Spin size="large"/>
        </Col>
      </Row>
  
  )
};
export default Loader;