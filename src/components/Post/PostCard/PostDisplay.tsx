import React, {Component } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  CardFooter,
  CardSubtitle,
} from "reactstrap";
import ComIndex from "./Comment/ComIndex";
import PostDelete from "./PostDelete";
import PostEdit from "./PostEdit";
import APIURL from '../../../helpers/environment'

interface PostDisplayProps {
  token: string;
  trigger: boolean;
  
}

interface PostDisplayState {
  posts: object[];
  updatePressed: boolean;
  postToUpdate: object;
}

class PostDisplay extends Component<PostDisplayProps, PostDisplayState> {
  constructor(props: PostDisplayProps) {
    super(props);
    this.state = {
      posts: [],
      updatePressed: false,
      postToUpdate: {},
    };
  }

  fetchPosts = async () => {
    try {
      const res = await fetch(`${APIURL}/post/allposts`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: String(localStorage.getItem("token")),
        }),
      });
      const data = await res.json();
      this.setState({ posts: data.allPosts });
      console.log(data);
      console.log(this.state.posts);
    } catch (error) {
      console.log({ error });
    }
  };

  setUpdatedPost = (e: any, post: any) => {
    this.setState({
      postToUpdate: post,
      updatePressed: true,
    });
    console.log(post);
  };

  componentDidUpdate(prevProps: PostDisplayProps, prevState: PostDisplayState) {
    if (this.props.trigger !== prevProps.trigger) {
      this.fetchPosts();
    }
  }

  componentDidMount = () => {
    this.fetchPosts();
    
  };

  render() {
    const postMapper = () => {
      return this.state.posts.map((post: any, index: any) => {
        return (
          <Card
            className="postcard m-5"
            style={{
              backgroundColor: " rgb(41, 61, 41)",
              color: "#bbabc2",
              opacity: "90%",
              fontFamily: "Faustina",
            }}
            key={index}
          >
           
            <CardTitle
              className="postcard-title p-2"
              scope="row"
              style={{ fontSize: "15pt" }}
            >
              {post.title}
            </CardTitle>
            <CardSubtitle className="postcard-sub ml-2">
              {post.role}-----{post.date}
            </CardSubtitle>
            <CardBody
              className="postcard-content text-center"
              style={{
                backgroundColor: " rgb(224, 231, 224)",
                color: "black",
                fillOpacity: "100%",
              }}
            >
              {" "}
              {post.content}
            </CardBody>
            <CardFooter className="postcard-footer text-center">
              <Row className="postcard-button">
                <Col md='12'>
                  <PostEdit
                    post={post}
                    token={this.props.token}
                    fetchPosts={this.fetchPosts}
                  />
                
                  <PostDelete
                    token={this.props.token}
                    fetchPosts={this.fetchPosts}
                    post={post}
                  />
                </Col>
                <br/>
              </Row>
            </CardFooter>
            <Col md='12' className="col-sm-12 col-md-12 col-sm-12" >
                  <ComIndex
                    token={this.props.token}
                    post={post}
                    trigger={this.props.trigger}
                  />
                </Col>
          </Card>
        );
      });
    };
    return (
      <>
        <Container>
          <Row>
            <Col>{postMapper()}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PostDisplay;