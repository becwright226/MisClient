import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import RecipeCreate from './RecipeCreate';
import RecipeDisplay from './RecipeDisplay';



interface RecipeProps {
    token:string
    clearLocalStorage: () => void

}
 
interface RecipeState {
   trigger: boolean 
}
 
class Recipe extends Component<RecipeProps, RecipeState> {
    constructor(props: RecipeProps) {
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
           
        <Container className='recipe-main' style={{float:'right'}}>
           <Row>
              <Col md='4'>
              <RecipeCreate triggerMethod={this.triggerMethod} token={this.props.token} /> 
              </Col> 
                  <Col md='8'>
                     <RecipeDisplay token={this.props.token} trigger={this.state.trigger}/> 
                  </Col>      
              </Row>
        </Container>
            </>
            );
    }
}
 
export default Recipe;