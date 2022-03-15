import React, { Component } from 'react'
import { Button } from 'reactstrap';

interface RecipeDeleteProps {
    token: string
    recipe: RecipeData
    fetchRecipes: Function
}

interface RecipeData {
    id: string,
    cuisine: string,
    title: string,
    course: string,
    desc: string,
    time: number,
    method?: string
}
 
interface RecipeDeleteState {
    id: string,
    cuisine: string,
    title: string,
    course: string,
    desc: string,
    time: number,
    method?: string
}
 
class RecipeDelete extends Component<RecipeDeleteProps, RecipeDeleteState> {
   
    constructor(props: RecipeDeleteProps) {
        super(props);
        this.state = { 
            id: '',
            cuisine: '',
            title: '',
            course: '',
            desc: '',
            time: 0,
            method: ''
         };
    }

    recipeDelete = (e:any) => {
        fetch(`http://localhost:2206/recipe/${this.props.recipe.id}`, {
          method: 'DELETE',
          body: JSON.stringify({    
            cuisine: this.state.cuisine,
            title: this.state.title,
            course: this.state.course,
            desc: this.state.desc,
            time: this.state.time,
            method: this.state.method
        }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => this.props.fetchRecipes())
      }

    render() { 
        return ( 
            <div>
                <Button onClick={this.recipeDelete} className='edit-btn m-2' style={{backgroundColor:'#d3773a', float: 'right', color: 'black'}}>Delete</Button>
            </div>
         );
    }
}
 
export default RecipeDelete;