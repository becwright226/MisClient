import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';


interface PostEditProps {
   token: string
   fetchPosts: Function
   post: postData
  
}

interface postData {
    id: string,
    date: string,
   title: string,
   content: string
   role: string
   model: boolean
}
 
interface PostEditState {
  id: string,
  date: string,
 title: string,
 content: string
 role: string
 model: boolean
}
 
class PostEdit extends Component<PostEditProps, PostEditState> {

    constructor(props: PostEditProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            title: '',
            content: '',
            role: '',
            model: false
         };
    }


    postUpdate = (event:any) => {
        event.preventDefault()
        console.log(this.props.post.id)
        console.log(this.props.post)
        fetch(`http://localhost:2206/post/${this.props.post.id}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            date: this.state.date,
            title: this.state.title,
            content: this.state.content,
            role: this.state.role
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => {
          this.setState({ model: false })
          this.props.fetchPosts();
        })
      }

    modal = () => {
        this.setState({model: !this.state.model})
    }


    render() { 
        console.log(this.props.post)
        return ( 
            <div>
                <Button className='edit-btn m-2' style={{backgroundColor:'#b2d33a', float:'left',color: 'black'}} onClick={this.modal}>Update</Button>
             <Modal isOpen={this.state.model} >
                <ModalHeader >Post Update</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.postUpdate}>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input id="date" type="date" name="date" defaultValue={this.props.post.date} onChange={(e:any) => this.setState({date: e.target.value})} placeholder="enter date"  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" onChange={(e:any) => this.setState({title: e.target.value})}  defaultValue={this.props.post.title} placeholder="Post Title"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input id="content" type='textarea' name="content" onChange={(e:any) => this.setState({content: e.target.value})}  defaultValue={this.props.post.content} placeholder="What would you like to say?"  />
                        </FormGroup>
                        <FormGroup>
                        <Label for="role">Role</Label>
                        <Input id="li_role" type='select' name="role" placeholder="FOH?, BOH?, All?" onChange={(e:any) => this.setState({role: e.target.value})} defaultValue={this.props.post.role}> 
                        <option> BOH </option>
                        <option > FOH </option>
                        <option > All Staff </option>
                        </Input>
                    </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                    </Form>
                </ModalBody>

            </Modal> 

        </div>
         );
    }
}
 
export default PostEdit;