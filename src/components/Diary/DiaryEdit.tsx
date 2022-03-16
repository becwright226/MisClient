import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../helpers/environment'

interface DiaryEditProps {
   token: string
   fetchDiaries: Function
   diary: DiaryData
  
}

interface DiaryData {
    id: string,
    date: string,
   title: string,
   content: string,
   model: boolean
}
 
interface DiaryEditState {
  id: string,
  date: string,
 title: string,
 content: string,
 model: boolean
}
 
class DiaryEdit extends React.Component<DiaryEditProps, DiaryEditState> {

    constructor(props: DiaryEditProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            title: '',
            content: '',
            model: false
         };
    }


    diaryUpdate = (event:any) => {
        event.preventDefault()
        console.log(this.props.diary.id)
        console.log(this.props.diary)
        fetch(`${APIURL}/diary/${this.props.diary.id}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            date: this.state.date,
            title: this.state.title,
            content: this.state.content
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => {
          this.setState({ model: false })
         // this.props.fetchDiaries();
        })
        
      }

      componentDidUpdate = () => {
        this.props.fetchDiaries();//like this?
      }

    modal = () => {
        this.setState({model: !this.state.model})
    }


    render() { 
        console.log(this.props.diary)
        return ( 
            <div>
                <Button className='edit-btn m-2' style={{backgroundColor:'#b2d33a', float:'left',color: 'black'}} onClick={this.modal}>Update</Button>
             <Modal isOpen={this.state.model} >
                <ModalHeader >Entry Update</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.diaryUpdate}>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input id="date" type="date" name="date" defaultValue={this.props.diary.date} onChange={(e:any) => this.setState({date: e.target.value})}  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" onChange={(e:any) => this.setState({title: e.target.value})}  defaultValue={this.props.diary.title} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input id="content" type='textarea' name="content" onChange={(e:any) => this.setState({content: e.target.value})}  defaultValue={this.props.diary.content}   />
                        </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                    </Form>
                </ModalBody>

            </Modal> 

        </div>
         );
    }
}
 
export default DiaryEdit;