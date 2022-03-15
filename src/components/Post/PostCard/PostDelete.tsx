import React, { Component } from 'react'
import { Button } from 'reactstrap';

interface PostDeleteProps {
    token: string
    post: postData
    fetchPosts: Function
}

interface postData {
    id: string,
    date: string,
   title: string,
   content: string
   role: string
   model: boolean
}
 
interface PostDeleteState {
    id: string,
    date: string,
   title: string,
   content: string
   role: string
}
 
class PostDelete extends Component<PostDeleteProps, PostDeleteState> {
   
    constructor(props: PostDeleteProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            title: '',
            content: '',
            role: '',
         };
    }

    postDelete = (e:any) => {
        fetch(`http://localhost:2206/post/${this.props.post.id}`, {
          method: 'DELETE',
          body: JSON.stringify({    
            date: this.state.date,
            title: this.state.title,
            content: this.state.content,
            role: this.state.role }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => this.props.fetchPosts())
      }

    render() { 
        return ( 
            <div>
                <Button onClick={this.postDelete} className='edit-btn m-2' style={{backgroundColor:'#d3773a', float: 'right', color: 'black'}}>Delete</Button>
            </div>
         );
    }
}
 
export default PostDelete;