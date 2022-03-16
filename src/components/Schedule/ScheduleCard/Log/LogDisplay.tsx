import React, { useState, useEffect, Component } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  
  CardFooter,
  
  CardHeader,
} from "reactstrap";
import APIURL from '../../../../helpers/environment'
import LogEdit from "./LogEdit";
import LogDelete from "./LogDelete";



interface LogDisplayProps {
  token: string;
  trigger: boolean;
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

interface LogDisplayState {
  logs: object[];
  updatePressed: boolean;
  logToUpdate: object;
}

class LogDisplay extends Component<LogDisplayProps, LogDisplayState> {
  constructor(props: LogDisplayProps) {
    super(props);
    this.state = {
      logs: [],
      updatePressed: false,
      logToUpdate: {},
    };
  }

  fetchLogs = async () => {
    try {
      const res = await fetch(`${APIURL}/log/${this.props.schedule.id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: String(localStorage.getItem("token")),
        }),
      });
      const data = await res.json();
      this.setState({ logs: data });
      console.log(data);
      console.log(this.state.logs);
    } catch (error) {
      console.log({ error });
    }
  };

  setUpdatedLog = (e: any, log: any) => {
    this.setState({
      logToUpdate: log,
      updatePressed: true,
    });
    console.log(log);
  };

  componentDidUpdate(
    prevProps: LogDisplayProps,
    prevState: LogDisplayState
  ) {
    if (this.props.trigger != prevProps.trigger) {
      this.fetchLogs();
    }
  }

  componentDidMount = () => {
    this.fetchLogs();
  };

  render() {
    const logMapper = () => {
      return this.state.logs.map((log: any, index: any) => {
        return (

<div className="wrapper text-center mx-auto" style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>


        <Card
    className="m-1"
  
    
    
    style={{
      backgroundColor: "rgb(99, 128, 99)",
      color: "black",
      opacity: "90%",
      fontFamily: "Faustina",
      border: "solid #a7719e 1px",
    }}
    key={index}
    >    

<CardHeader className="text-center">{log.date}----{log.time}min to complete</CardHeader>
  <CardBody
  className="postcard-content text-center"
  style={{
 backgroundColor: " rgb(224, 231, 224)",
 color: "black",
 fillOpacity: "100%"}}
  >
      {log.task}
      </CardBody>
  <CardFooter span>
  <Col md='12'>
  <div style={{float:'left'}} >
    <LogEdit
               log={log}
               token={this.props.token}
               fetchLogs={this.fetchLogs}
             />
  </div>
  <div style={{float:'right'}}  >
    
   
    <LogDelete
               token={this.props.token}
               fetchLogs={this.fetchLogs}
               log={log}
             />
  </div> 
    </Col>
  
    </CardFooter>
  
</Card>



</div>




           
        );
      });
    };
    return (
      <>
        <Container>
          <Row>
            {logMapper()}
          </Row>
        </Container>
      </>
    );
  }
}

export default LogDisplay;