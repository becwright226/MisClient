import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import DiaryCreate from './DiaryCreate';
import DiaryDisplay from './DiaryDisplay';



interface DiaryProps {
    token:string
    clearLocalStorage: () => void
}
 
interface DiaryState {
    trigger: boolean 
}
 
class Diary extends Component<DiaryProps, DiaryState> {
    constructor(props: DiaryProps) {
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
            <Container className='diary-main' style={{float:'right'}}>
            <Row>
          <Col md='4'>
          <DiaryCreate triggerMethod={this.triggerMethod} token={this.props.token} />
          </Col> 
              <Col md='8'>
                 <DiaryDisplay token={this.props.token} trigger={this.state.trigger}/> 
              </Col>      
          </Row>
        </Container></>
            
         );
    }
}
 
export default Diary;