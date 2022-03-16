import React, { Component} from 'react';
import { 
    Form,
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import APIURL from '../../../../helpers/environment'


interface LogCreateProps {
    token: string
    triggerMethod: Function
    schedule: schedData
}

interface schedData {
    id: string,
    date: string,
    task: string,
    desc: string,
    empAssign?: string
    model: boolean
}
 
interface LogCreateState {
    date: string;
    task: string;
    time: number;
    model: boolean

    
}
 
class LogCreate extends Component<LogCreateProps, LogCreateState> {
    constructor(props: LogCreateProps) {
        super(props);
        this.state = { 
            date: '', 
            task: '',
            time: 0,
            model: false
        };
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestObject = {
            date: this.state.date,
            task: this.state.task,
            time: this.state.time,
        } 
        try {
            const res = await fetch(`${APIURL}/log/${this.props.schedule.id}`, {
                method: 'POST',
                body: JSON.stringify(requestObject),
                headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
              })
            })
            const data = await res.json()
            console.log(data)
            this.props.triggerMethod()
            this.setState ({ 
                date: '', 
                task: '',
                time: 0,
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
            <button className='comm-btn mb-3' style={{backgroundColor:'#a7719e',color: 'black' , width: '45%', borderRadius: '4px', border: 'solid rgb(224, 231, 224) .5px'}} onClick={this.modal}>Record Work</button>
            </div>
            <Modal isOpen={this.state.model}>
                <ModalHeader> Log your work: </ModalHeader>
                <ModalBody>
            <Form onSubmit={this.handleSubmit}>
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
                    <Button type="submit" className="btn" > Submit </Button>
            </Form>
            </ModalBody>
            </Modal>
            </>
         );
    }
}
 
export default LogCreate;