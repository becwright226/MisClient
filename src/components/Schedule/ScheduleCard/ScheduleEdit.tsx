import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

interface SchedEditProps {
   token: string
   fetchScheds: Function
   schedule: ScheduleData  
}

interface ScheduleData {
    id: string,
    date: string,
    task: string,
    desc: string,
    empAssign: string,
}
 
interface SchedEditState {
    id: string,
    date: string,
    task: string,
    desc: string,
    empAssign: string,  
    model: boolean
}
 
class ScheduleEdit extends React.Component<SchedEditProps, SchedEditState> {
    constructor(props: SchedEditProps) {
        super(props);
        this.state = {
            id: '',
            date: '',
            task: '',
            desc: '',
            empAssign: '',
            model: false
         };
    }

    recipeUpdate = (e:any) => {
        e.preventDefault()
        console.log(this.props.schedule.id)
        console.log(this.props.schedule)
        fetch(`http://localhost:2206/schedule/${this.props.schedule.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                date:this.state.date,
                task: this.state.task,
                desc: this.state.desc,
                empAssign: this.state.empAssign,
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => {
            this.setState({model: false})
            this.props.fetchScheds();
        })
    }


    modal = () => {
        this.setState({model: !this.state.model})
    }

    render() { 
        console.log(this.props.schedule)
        return (
            <div>
                <Button className='edit-btn m-2 pl-4 pr-4' style={{backgroundColor:'#b2d33a', float:'left',color: 'black'}} onClick={this.modal}>Update</Button>
                <Modal isOpen={this.state.model} >
                <ModalHeader >Schedule Update</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.recipeUpdate}>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input id="date" type="text" name="date" defaultValue={this.props.schedule.date} onChange={(e:any) => this.setState({date: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="task">Task</Label>
                            <Input type="text" name="task" id="task" onChange={(e:any) => this.setState({task: e.target.value})}  defaultValue={this.props.schedule.task} />
                        </FormGroup>
                        <FormGroup>
                        <Label for="desc">Description</Label>
                        <Input id="li_desc" type='textarea' name="role"  onChange={(e:any) => this.setState({desc: e.target.value})} defaultValue={this.props.schedule.desc}/> 
                        </FormGroup>
                        <FormGroup>
                        <Label for="empassign"> Employee Assignment </Label>
                        <Input id="li_empassign" type='number' name="empassign"  onChange={(e:any) => this.setState({empAssign: e.target.value})} defaultValue={this.props.schedule.empAssign}/> 
                        </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                    </Form>
                </ModalBody>

            </Modal> 
            </div>
          );
    }
}
 
export default ScheduleEdit;