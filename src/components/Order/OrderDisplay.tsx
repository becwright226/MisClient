import React, {Component } from "react";
import {
 
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import OrderDelete from "./OrderDelete";
import OrderEdit from "./OrderEdit";
import APIURL from '../../helpers/environment'

interface OrderDisplayProps {
  token: string;
  trigger: boolean;
}

interface OrderDisplayState {
  orders: object[];
  updatePressed: boolean;
  orderToUpdate: object;
}

class OrderDisplay extends Component<OrderDisplayProps, OrderDisplayState> {
  constructor(props: OrderDisplayProps) {
    super(props);
    this.state = {
      orders: [],
      updatePressed: false,
      orderToUpdate: {},
    };
  }

  fetchOrders = async () => {
    try {
      const res = await fetch(`${APIURL}/order/orders`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: String(localStorage.getItem("token")),
        }),
      });
      const data = await res.json();
      this.setState({ orders: data });
      console.log(data);
      console.log(this.state.orders);
    } catch (error) {
      console.log({ error });
    }
  };

  setUpdatedOrder = (e: any, order: any) => {
    this.setState({
      orderToUpdate: order,
      updatePressed: true,
    });
    console.log(order);
  };
  componentDidUpdate(
    prevProps: OrderDisplayProps,
    prevState: OrderDisplayState
  ) {
    if (this.props.trigger != prevProps.trigger) {
      this.fetchOrders();
    }
  }
  componentDidMount = () => {
    this.fetchOrders();
  };

  render() {
    const orderMapper = () => {
      return this.state.orders.length>0? this.state.orders.map((order: any, index: any) => {
        return (
          <Table
            striped
            bordered
            hover
            className="ordertab mt-5"
            style={{
              backgroundColor: " rgb(41, 61, 41)",
              color: "#bbabc2",
              opacity: "90%",
              fontFamily: "Faustina",
            }}
            key={index}
          >
            <thead className="thead">
              <h3 style={{ padding: "10px" }}>Order Log---{order.date}</h3>
              <tr>
                <th className="ordertab-title m-3" scope="row" style={{}}>
                  {order.itemCount} items
                </th>

                <th className="ordertab-date text-center">
                  Cost----${order.cost}
                </th>
              </tr>
              <tr>
                <h5 className="ordertab" style={{ padding: "10px" }}>
                  {order.eventName}{" "}
                </h5>
              </tr>
            </thead>
            <tbody>
              <tr>
                <p style={{ padding: "10px" }}>{order.desc}</p>
              </tr>
            </tbody>
            <tfoot>
              <tr className="postcard-button">
                <th>
                  <OrderEdit
                    order={order}
                    token={this.props.token}
                    fetchOrders={this.fetchOrders}
                  />
                </th>
                <th>
                  <OrderDelete
                    token={this.props.token}
                    fetchOrders={this.fetchOrders}
                    order={order}
                  />
                </th>
              </tr>
            </tfoot>
          </Table>
        );
      }): <h2>No orders have been recorded</h2>
    };
    return (
      <>
        <Container>
          <Row>
            <Col>{orderMapper()}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default OrderDisplay;
