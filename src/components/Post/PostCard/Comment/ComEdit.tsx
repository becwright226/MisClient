import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../../../helpers/environment'

interface ComEditProps {
   token: string
   fetchComments: Function
   comment: commentData
  
}

interface commentData {
    id: string,
    date: string,
   content: string,
   model: boolean
}
 
interface ComEditState {
  id: string,
  date: string,
 content: string
 model: boolean
}
 
class ComEdit extends Component<ComEditProps, ComEditState> {

    constructor(props: ComEditProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            content: '',
            model: false
         };
    }


    commentUpdate = (event:any) => {
        event.preventDefault()
        console.log(this.props.comment.id)
        console.log(this.props.comment)
        fetch(`${APIURL}/comment/${this.props.comment.id}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            date: this.state.date,
            content: this.state.content,
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => {
          this.setState({ model: false })
          this.props.fetchComments();
        })
      }

    modal = () => {
        this.setState({model: !this.state.model})
    }


    render() { 
        console.log(this.props.comment)
        return ( 
            <div>
                <Button className='edit-btn m-2' style={{backgroundColor:'#b2d33a', float:'left',color: 'black'}} onClick={this.modal}>Update</Button>
             <Modal isOpen={this.state.model} >
                <ModalHeader >Comment Update</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.commentUpdate}>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input id="date" type="date" name="date" defaultValue={this.props.comment.date} onChange={(e:any) => this.setState({date: e.target.value})} placeholder="enter date"  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input id="content" type='textarea' name="content" onChange={(e:any) => this.setState({content: e.target.value})}  defaultValue={this.props.comment.content} placeholder="What would you like to say?"  />
                        </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                    </Form>
                </ModalBody>

            </Modal> 

        </div>
         );
    }
}
 
export default ComEdit;