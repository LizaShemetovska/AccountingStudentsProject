import React ,{Component} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Card, Button ,DatePicker,Space} from 'antd';
class Courses extends Component{
    render(){
        return(
        <Container>
            <Row>
                <Col md={3} xs={12}>
                    <Card
                        style={{marginTop:'10px' ,height:'auto'}}
                        cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                        }
                        actions={[
                         
                            <Button align="center" type="dashed" htmlType="submit"  style={{ backgroundColor: '#fc3955',  fontFamily: 'Candara',  color: 'white' , border:'none'}}>
                        Subscribe
                        </Button>
                
                        ]}
                    >
                        <Card.Meta
                        style={{textAlign:'center'}}
                        title="Card title"
                        description="This is the description"
                        />
                        <Space direction="vertical" style={{width:'100%',marginTop:'10px'}} >
                         <DatePicker style={{width:'100%'}} />
                       </Space>
                    </Card>
                </Col>
  
            </Row>
        </Container>
        )
    }
}
export default Courses;