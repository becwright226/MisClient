import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';


interface LogEditProps {
   token: string
   fetchLogs: Function
   log: logData
  
}

interface logData {
    id: string,
    date: string;
    task: string;
    time: number;
    model: boolean
    
}
 
interface LogEditState {
    id: string,
    date: string;
    task: string;
    time: number;
    model: boolean
}
 
class LogEdit extends Component<LogEditProps, LogEditState> {

    constructor(props: LogEditProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            task: '',
            time: 0,
            model: false
         };
    }


    logUpdate = (event:any) => {
        event.preventDefault()
        console.log(this.props.log.id)
        console.log(this.props.log)
        fetch(`http://localhost:2206/log/${this.props.log.id}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            date: this.state.date,
            task: this.state.task,
            time: this.state.time,
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => {
          this.setState({ model: false })
          this.props.fetchLogs();
        })
      }

    modal = () => {
        this.setState({model: !this.state.model})
    }


    render() { 
        console.log(this.props.log)
        return ( 
            <div>
                <Button className='edit-btn m-2' style={{backgroundColor:'#b2d33a', float:'left',color: 'black'}} onClick={this.modal}>Update</Button>
             <Modal isOpen={this.state.model} >
                <ModalHeader >Comment Update</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.logUpdate}>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input id="li_date" type="date" name="date" placeholder="enter the date" onChange={(e:any) => this.setState({date: e.target.value})} value={this.state.date} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="task">Task</Label>
                        <Input id="li_task" type="text" name="task" placeholder="enter the task you have completed..." onChange={(e:any) => this.setState({task: e.target.value})} value={this.state.task} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="time">Time</Label>
                        <Input id="li_time" type='number' name="time" placeholder="How long did this task take to complete?..." onChange={(e:any) => this.setState({time: e.target.value})} value={this.state.time} />
                    </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                    </Form>
                </ModalBody>

            </Modal> 

        </div>
         );
    }
}
 
export default LogEdit;