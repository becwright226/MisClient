import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import OrderCreate from './OrderCreate';
import OrderDisplay from './OrderDisplay';
import './Order.css'

interface OrderIndexProps {
    token: string
    clearLocalStorage:()=>void
}
 
interface OrderIndexState {
    trigger: boolean 
}
 
class OrderIndex extends React.Component<OrderIndexProps, OrderIndexState> {
    constructor(props: OrderIndexProps) {
        super(props);
        this.state = {
            trigger: false };
    }

    triggerMethod = () => {
        this.setState({trigger:!this.state.trigger})
    }

    render() { 
        return ( 
            <>
            
              <Container className='order-main' style={{float:'right'}}>
                <Row>
              <Col md='4'>
              <OrderCreate triggerMethod={this.triggerMethod} token={this.props.token}/>
              </Col> 
                  <Col md='8'>
                     <OrderDisplay token={this.props.token} trigger={this.state.trigger} /> 
                  </Col>      
              </Row>
            </Container>
            </>
          
         );
    }
}
 
export default OrderIndex;