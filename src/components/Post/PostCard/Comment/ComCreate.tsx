import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, ModalHeader, ModalBody, Modal } from 'reactstrap';


interface ComCreateProps {
    token: string
    triggerMethod: Function
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
 
interface ComCreateState {
   date: string,
   content: string 
   model: boolean
}
 
class ComCreate extends Component<ComCreateProps, ComCreateState> {
    constructor(props: ComCreateProps) {
        super(props);
       this.state = { 
           date: '',
           content: '',
           model: false 

         };
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestObject = {
            date: this.state.date,
            content: this.state.content
        } 
        try {
            const res = await fetch(`http://localhost:2206/comment/${this.props.post.id}`, {
                method: 'POST',
                body: JSON.stringify(requestObject),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token    
            })
        })
        const data = await res.json()
        this.props.triggerMethod()
            this.setState({
                date: '', 
                content: '',
                model: false 

            })

    } catch (error) {
        console.log({error})
    }
}

modal = () => {
    this.setState({model: !this.state.model})
}

    render() { 
        return ( 
            <>
            <div className="wrapper text-center">
            <button className='comm-btn mb-3'  style={{backgroundColor:'#a7719e',color: 'black', width: '45%', borderRadius: '4px', border: 'solid rgb(224, 231, 224) .5px'}} onClick={this.modal}>Comment</button>
            </div>
            <Modal isOpen={this.state.model}>
                <ModalHeader> Post your comment</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input id="li_date" type="date" name="date" placeholder="enter the date" onChange={(e:any) => this.setState({date: e.target.value})} value={this.state.date} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input id="li_content" type='textarea' name="content" placeholder="make your announcement" onChange={(e:any) => this.setState({content: e.target.value})} value={this.state.content} />
                    </FormGroup>
                    <Button type="submit" className="btn" > Submit </Button>
            </Form>
            </ModalBody>
            </Modal>
          
            </>
        );
    }
}
 
export default ComCreate;