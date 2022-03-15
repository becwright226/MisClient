import React, { Component } from 'react';
import { 
    
    Container,
    Row,
    Col,

} from 'reactstrap';
import PostDisplay from './PostCard/PostDisplay'
import PostCreate from './PostCreate';





interface PostIndexProps {
    token: string
    clearLocalStorage: () => void
    updateLocalStorage: (newToken: string, newRole: string) => void

    
}
interface PostIndexState {
    trigger: boolean 
}



class PostIndex extends Component <PostIndexProps, PostIndexState> {

   
    constructor(props: PostIndexProps) {
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
          <Container className='post-main col-sm-12 col-md-12 col-lg-8' style={{float:'right'}}>
              
              <Row>
              <Col md='4'>
             <PostCreate triggerMethod={this.triggerMethod} token={this.props.token}/>
              </Col> 
                  <Col md='8'>
                     <PostDisplay trigger={this.state.trigger} token={this.props.token} /> 
                  </Col>      
              </Row>
          </Container>
            </>
         );
    }
}
 
  export default PostIndex;