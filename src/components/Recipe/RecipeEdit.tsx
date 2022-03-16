import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import APIURL from '../../helpers/environment'

interface RecipeEditProps {
   token: string
   fetchRecipes: Function
   recipe: RecipeData  
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
 
interface RecipeEditState {
    id: string,
    cuisine: string,
    title: string,
    course: string,
    desc: string,
    time: number,
    method?: string,  
    model: boolean
}
 
class RecipeEdit extends React.Component<RecipeEditProps, RecipeEditState> {
    constructor(props: RecipeEditProps) {
        super(props);
        this.state = {
            id: '',
            cuisine: '',
            title: '',
            course: '',
            desc: '',
            time: 0,
            method: '',
            model: false
         };
    }

    recipeUpdate = (e:any) => {
        e.preventDefault()
        console.log(this.props.recipe.id)
        console.log(this.props.recipe)
        fetch(`${APIURL}/recipe/${this.props.recipe.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                cuisine:this.state.cuisine,
                title: this.state.title,
                course: this.state.course,
                desc: this.state.desc,
                time: this.state.time,
                method: this.state.method
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => {
            this.setState({model: false})
            this.props.fetchRecipes();
        })
    }


    modal = () => {
        this.setState({model: !this.state.model})
    }

    render() { 
        console.log(this.props.recipe)
        return (
            <div>
                <Button className='edit-btn m-2' style={{backgroundColor:'#b2d33a', float:'left',color: 'black'}} onClick={this.modal}>Update</Button>
                <Modal isOpen={this.state.model} >
                <ModalHeader >Recipe Update</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.recipeUpdate}>
                        <FormGroup>
                            <Label for="cuisine">Cuisine</Label>
                            <Input id="cuisine" type="text" name="cuisine" onChange={(e:any) => this.setState({cuisine: e.target.value})} defaultValue={this.props.recipe.cuisine}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" onChange={(e:any) => this.setState({title: e.target.value})}  defaultValue={this.props.recipe.title} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="course">Course</Label>
                            <Input id="course" type='text' name="course" onChange={(e:any) => this.setState({course: e.target.value})}  defaultValue={this.props.recipe.course}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="desc">Description</Label>
                        <Input id="li_desc" type='textarea' name="role"  onChange={(e:any) => this.setState({desc: e.target.value})} defaultValue={this.props.recipe.desc}/> 
                        </FormGroup>
                        <FormGroup>
                        <Label for="time">Time</Label>
                        <Input id="li_time" type='number' name="time"  onChange={(e:any) => this.setState({time: e.target.value})} defaultValue={this.props.recipe.time}/> 
                        </FormGroup>
                        <FormGroup>
                        <Label for="method">Method</Label>
                        <Input id="li_method" type='text' name="role"  onChange={(e:any) => this.setState({method: e.target.value})} defaultValue={this.props.recipe.method}/> 
                        </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                    </Form>
                </ModalBody>

            </Modal> 
            </div>
          );
    }
}
 
export default RecipeEdit;