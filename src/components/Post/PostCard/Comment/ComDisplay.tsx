import React, {Component } from "react";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardFooter,
  CardHeader,

} from "reactstrap";

import ComEdit from "./ComEdit";
import ComDelete from "./ComDelete";
import APIURL from '../../../../helpers/environment'


interface ComDisplayProps {
  token: string;
  trigger: boolean;
  post: postData
}

interface postData {
    id: string,
    date: string,
   title: string,
   content: string
   role: string
   model: boolean
}

interface ComDisplayState {
  comments: object[];
  updatePressed: boolean;
  commentToUpdate: object;
}

class ComDisplay extends Component<ComDisplayProps, ComDisplayState> {
  constructor(props: ComDisplayProps) {
    super(props);
    this.state = {
      comments: [],
      updatePressed: false,
      commentToUpdate: {},
    };
  }

  fetchComments = async () => {
    try {
      const res = await fetch(`${APIURL}/comment/${this.props.post.id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: String(localStorage.getItem("token")),
        }),
      });
      const data = await res.json();
      this.setState({ comments: data });
      console.log(data);
      console.log(this.state.comments);
    } catch (error) {
      console.log({ error });
    }
  };

  setUpdatedComment = (e: any, comment: any) => {
    this.setState({
      commentToUpdate: comment,
      updatePressed: true,
    });
    console.log(comment);
  };

  componentDidUpdate(
    prevProps: ComDisplayProps,
    prevState: ComDisplayState
  ) {
    if (this.props.trigger !== prevProps.trigger) {
      this.fetchComments();
    }
  }

  componentDidMount = () => {
    this.fetchComments();
  };

  render() {
    const commentMapper = () => {
      return this.state.comments.length>0? this.state.comments.map((comment: any, index: any) => {
        return (

<div className="wrapper text-center mx-auto" style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>


 



<Card style={{
  backgroundColor: "rgb(99, 128, 99)",
  color: "black",
  opacity: "90%",
  fontFamily: "Faustina",
  border: "solid #a7719e 1px",
}}
lg
className="m-1"
key={index}>
<CardHeader>{comment.date}</CardHeader>

<CardBody
className="postcard-content text-center"
style={{
backgroundColor: " rgb(224, 231, 224)",
color: "black",
fillOpacity: "100%"}}
>

      {comment.content}

  </CardBody>
<CardFooter span>

<Col md='12'>

  <div style={{float:'left'}} >
<ComEdit
               comment={comment}
               token={this.props.token}
               fetchComments={this.fetchComments}
             />
</div>

<div style={{float:'right'}}  >

<ComDelete
               token={this.props.token}
               fetchComments={this.fetchComments}
              comment={comment}
             />
</div>
</Col>


</CardFooter>



</Card>




</div>


           
        );
      }): <h2> No comments recorded </h2>
    };
    return (
      <>
        <Container>
          <Row>
            {commentMapper()}
          </Row>
        </Container>
      </>
    );
  }
}

export default ComDisplay;