import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import SchedDisplay from './ScheduleCard/SchedDisplay';
import SchedCreate from './ScheduleCreate';
import './Schedule.css'

interface SchedIndexProps {
    token: string
    clearLocalStorage: () => void
}
 
interface SchedIndexState {
    trigger: boolean 
}
 
class SchedIndex extends React.Component<SchedIndexProps, SchedIndexState> {
    constructor(props: SchedIndexProps) {
        super(props);
        this.state = { 
            trigger: false  };
    }

    triggerMethod = () => {
        this.setState({trigger:!this.state.trigger})
    }

    render() { 
        return ( 
            <>
            
        <Container className='schedule-main' style={{float:'right'}}>
           <Row>
              <Col md='4'>
              <SchedCreate triggerMethod={this.triggerMethod} token={this.props.token}/>
              </Col> 
                  <Col md='8'>
                     <SchedDisplay token={this.props.token} trigger={this.state.trigger} /> 
                  </Col>      
              </Row>
        </Container>

        </>
            );
    }
}
 
export default SchedIndex;