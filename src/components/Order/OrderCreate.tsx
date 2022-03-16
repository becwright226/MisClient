import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../helpers/environment'

interface OrderCreateProps {
   token: string 
   triggerMethod: Function
}
 
interface OrderCreateState {
  date: string,
  itemCount: number,
  desc: string,
  isEvent: string,
  eventName?: string,
  cost: number  
}
 
class OrderCreate extends Component<OrderCreateProps, OrderCreateState> {
    constructor(props: OrderCreateProps) {
        super(props);
        this.state = { 
            date: '',
            itemCount: 0,
            desc: '',
            isEvent: "false",
            eventName: '',
            cost: 0 
        };
    }

    handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestObject = {
            date: this.state.date,
            itemCount: this.state.itemCount,
            desc: this.state.desc,
            isEvent: Boolean(this.state.isEvent),
            eventName: this.state.eventName,
            cost: this.state.cost
        }
        try {
            const res = await fetch(`${APIURL}/order/`, {
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

            this.setState({
                date: '',
            itemCount: 0,
            desc: '',
            isEvent: "false",
            eventName: '',
            cost: 0   
            })
        } catch (error) {
            console.log({error})
        }
    }
    render() { 
        return ( 
            <>
            <Form onSubmit={this.handleSubmit} className='orderForm m-4 p-3' style={{backgroundColor:' rgb(41, 61, 41)', color:'#bbabc2', opacity:'90%', fontFamily:'Faustina', borderRadius: '4px'}}>
            <FormGroup>
                        <Label for="date">Date</Label>
                        <Input id="li_date" type="date" name="date" placeholder="enter the date" onChange={(e:any) => this.setState({date: e.target.value})} value={this.state.date} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="itemCount">Item Count</Label>
                        <Input id="li_itemCount" type="text" name='itemCount' placeholder="How many items?" onChange={(e:any) => this.setState({itemCount: e.target.value})} value={this.state.itemCount} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Description</Label>
                        <Input id="li_desc" type='textarea' name="description" placeholder="ex. 3 cases bacon, 18 dz eggs, 10qt juice" onChange={(e:any) => this.setState({desc: e.target.value})} value={this.state.desc} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="isEvent">Is there an event this week?</Label>
                        <Input id="li_isEvent" type='select' name="isEvent"  onChange={(e:any) => this.setState({isEvent: e.target.value})} value={this.state.isEvent}> 
                        <option value='true'> Yes </option>
                        <option value='false' > No </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="eventName">Event Name</Label>
                        <Input id="li_eventName" type='text' name="eventName" placeholder="ex. Devour Downtown" onChange={(e:any) => this.setState({eventName: e.target.value})} value={this.state.eventName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cost">Cost</Label>
                        <Input id="li_cost" type='text' name="cost" placeholder="ex. $2,500.88" onChange={(e:any) => this.setState({cost: e.target.value})} value={this.state.cost} />
                    </FormGroup>
                    <Button type="submit" className="btn" style={{backgroundColor:'#a7719e', color: 'black'}}> Submit </Button>
            </Form>
          
            </>
         );
    }
}
 
export default OrderCreate;