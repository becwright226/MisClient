import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../helpers/environment'

interface OrderEditProps {
   token: string
   fetchOrders: Function
   order: OrderData
  
}

interface OrderData {
    id:string
    date: string,
    itemCount: number,
    desc: string,
    isEvent: string,
    eventName?: string,
    cost: number  
}
 
interface OrderEditState {
    id: string,
    date: string,
    itemCount: number,
    desc: string,
    isEvent: string,
    eventName?: string,
    cost: number  
    model: boolean
}
 
class OrderEdit extends Component<OrderEditProps, OrderEditState> {

    constructor(props: OrderEditProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            itemCount: 0,
            desc: '',
            isEvent: "false",
            eventName: '',
            cost: 0, 
            model: false
         };
    }


    orderUpdate = (event:any) => {
        event.preventDefault()
        console.log(this.props.order.id)
        console.log(this.props.order)
        fetch(`${APIURL}/order/${this.props.order.id}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            date: this.state.date,
            itemCount: this.state.itemCount,
            desc: this.state.desc,
            isEvent: Boolean(this.state.isEvent),
            eventName: this.state.eventName,
            cost: this.state.cost
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => {
          this.setState({ model: false })
          this.props.fetchOrders();
        })
      }

    modal = () => {
        this.setState({model: !this.state.model})
    }


    render() { 
        console.log(this.props.order)
        return ( 
            <div>
                <Button className='edit-btn m-2' style={{backgroundColor:'#b2d33a', float:'left',color: 'black'}} onClick={this.modal}>Update</Button>
             <Modal isOpen={this.state.model} >
                <ModalHeader >Post Update</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.orderUpdate}>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input id="date" type="date" name="date" defaultValue={this.props.order.date} onChange={(e:any) => this.setState({date: e.target.value})}  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="itemCount">Item Count</Label>
                            <Input type="number" name="itemCount" id="itemCount" onChange={(e:any) => this.setState({itemCount: e.target.value})}  defaultValue={this.props.order.itemCount}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="desc">Order Description</Label>
                            <Input id="desc" type='textarea' name="desc" onChange={(e:any) => this.setState({desc: e.target.value})}  defaultValue={this.props.order.desc}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="isevent">Is there an event this week?</Label>
                        <Input id="isevent" type='select' name="isevent" onChange={(e:any) => this.setState({isEvent: e.target.value})} defaultValue={this.props.order.isEvent}> 
                        <option value='true' > Yes </option>
                        <option value='false' > No </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                            <Label for="eventName">Event Name</Label>
                            <Input id="eventName" type='textarea' name="eventName" onChange={(e:any) => this.setState({eventName: e.target.value})}  defaultValue={this.props.order.eventName}/>
                    </FormGroup>
                    <FormGroup>
                            <Label for="cost">Cost</Label>
                            <Input id="cost" type='textarea' name="cost" onChange={(e:any) => this.setState({cost: e.target.value})}  defaultValue={this.props.order.cost}/>
                    </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                    </Form>
                </ModalBody>

            </Modal> 

        </div>
         );
    }
}
 
export default OrderEdit;