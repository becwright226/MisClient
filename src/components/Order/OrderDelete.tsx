import React, { Component } from 'react'
import { Button } from 'reactstrap';
import APIURL from '../../helpers/environment'

interface OrderDeleteProps {
    token: string
    order: OrderData
    fetchOrders: Function
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
 
interface OrderDeleteState {
    id: string,
    date: string,
    itemCount: number,
    desc: string,
    isEvent: string,
    eventName?: string,
    cost: number  
  
}
 
class OrderDelete extends Component<OrderDeleteProps, OrderDeleteState> {
   
    constructor(props: OrderDeleteProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            itemCount: 0,
            desc: '',
            isEvent: "false",
            eventName: '',
            cost: 0, 
         };
    }

    orderDelete = (e:any) => {
        fetch(`${APIURL}/order/${this.props.order.id}`, {
          method: 'DELETE',
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
        .then((res) => this.props.fetchOrders())
      }

    render() { 
        return ( 
            <div>
                <Button onClick={this.orderDelete} className='edit-btn m-2' style={{backgroundColor:'#d3773a', float: 'right', color: 'black'}}>Delete</Button>
            </div>
         );
    }
}
 
export default OrderDelete;