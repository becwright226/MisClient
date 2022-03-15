import React, { Component } from 'react'
import { Button } from 'reactstrap';

interface ComDeleteProps {
    token: string
    comment: commentData
    fetchComments: Function
}

interface commentData {
    id: string,
    date: string,
   content: string
   model: boolean
}
 
interface ComDeleteState {
    id: string,
    date: string,
   content: string
}
 
class ComDelete extends Component<ComDeleteProps, ComDeleteState> {
   
    constructor(props: ComDeleteProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            content: '',
          
         };
    }

    commentDelete = (e:any) => {
        fetch(`http://localhost:2206/comment/${this.props.comment.id}`, {
          method: 'DELETE',
          body: JSON.stringify({    
            date: this.state.date,
            content: this.state.content,
             }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => this.props.fetchComments())
      }

    render() { 
        return ( 
            <div>
                <Button onClick={this.commentDelete} className='edit-btn m-2' style={{backgroundColor:'#d3773a', float: 'right', color: 'black'}}>Delete</Button>
            </div>
         );
    }
}
 
export default ComDelete;