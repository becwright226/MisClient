import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import ComCreate from './ComCreate';
import ComDisplay from './ComDisplay';

interface ComIndexProps {
    token: string
    post: postData
    trigger: boolean;
}

interface postData {
    id: string,
    date: string,
   title: string,
   content: string
   role: string
   model: boolean
}
 
interface ComIndexState {
    trigger: boolean
}
 
class ComIndex extends Component<ComIndexProps, ComIndexState> {
    constructor(props: ComIndexProps) {
        super(props);
        this.state ={
            trigger: false 
           };
    }


     
    triggerMethod = () => {
        this.setState({trigger:!this.state.trigger})
    }



    render() { 
        return ( 
            <>
           
                 
            <ComCreate triggerMethod={this.triggerMethod} token={this.props.token} post={this.props.post}/>
            <Container>     
               <Row>
                    <Col>
                        <ComDisplay post={this.props.post} token={this.props.token} trigger={this.props.trigger} />
                    </Col>
                </Row>
                
            </Container>
            </>
         );
    }
}
 
export default ComIndex;