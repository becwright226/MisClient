import React, { Component } from 'react'
import { Button } from 'reactstrap';
import APIURL from '../../../helpers/environment'

interface ScheduleDeleteProps {
    token: string
    schedule: ScheduleData
    fetchScheds: Function
}

interface ScheduleData {
    id: string,
    date: string,
    task: string,
    desc: string,
    empAssign: string,  
}
 
interface ScheduleDeleteState {
    id: string,
    date: string,
    task: string,
    desc: string,
    empAssign: string,  
}
 
class ScheduleDelete extends Component<ScheduleDeleteProps, ScheduleDeleteState> {
   
    constructor(props: ScheduleDeleteProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            task: '',
            desc: '',
            empAssign: '',
         };
    }

    scheduleDelete = (e:any) => {
        fetch(`${APIURL}/schedule/${this.props.schedule.id}`, {
          method: 'DELETE',
          body: JSON.stringify({    
            date:this.state.date,
            task: this.state.task,
            desc: this.state.desc,
            empAssign: this.state.empAssign,
        }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => this.props.fetchScheds())
      }

    render() { 
        return ( 
            <div>
                <Button onClick={this.scheduleDelete} className='edit-btn m-2 pl-4 pr-4' style={{backgroundColor:'#d3773a', float: 'right', color: 'black'}}>Delete</Button>
            </div>
         );
    }
}
 
export default ScheduleDelete;