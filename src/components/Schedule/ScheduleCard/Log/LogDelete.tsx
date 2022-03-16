import React, { Component } from 'react'
import { Button } from 'reactstrap';
import APIURL from '../../../../helpers/environment'

interface LogDeleteProps {
    token: string
    log: LogData
    fetchLogs: Function
}

interface LogData {
    id: string,
    date: string;
    task: string;
    time: number;
    
}
 
interface LogDeleteState {
    id: string,
    date: string;
    task: string;
    time: number;
  
}
 
class LogDelete extends Component<LogDeleteProps, LogDeleteState> {
   
    constructor(props: LogDeleteProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            task: '',
            time: 0,
         
         };
    }

    logDelete = (e:any) => {
        fetch(`${APIURL}/log/${this.props.log.id}`, {
          method: 'DELETE',
          body: JSON.stringify({    
            date:this.state.date,
            task: this.state.task,
            time: this.state.time,
        
        }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => this.props.fetchLogs())
      }

    render() { 
        return ( 
            <div>
                <Button onClick={this.logDelete} className='edit-btn m-2' style={{backgroundColor:'#d3773a', float: 'right', color: 'black'}}>Delete</Button>
            </div>
         );
    }
}
 
export default LogDelete;