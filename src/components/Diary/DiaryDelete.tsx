import React, { Component } from 'react'
import { Button } from 'reactstrap';

interface DiaryDeleteProps {
    token: string
    diary: DiaryData
    fetchDiaries: Function
}

interface DiaryData {
    id: string,
    date: string,
   title: string,
   content: string
}
 
interface DiaryDeleteState {
    id: string,
    date: string,
   title: string,
   content: string
}
 
class DiaryDelete extends Component<DiaryDeleteProps, DiaryDeleteState> {
   
    constructor(props: DiaryDeleteProps) {
        super(props);
        this.state = { 
            id: '',
            date: '',
            title: '',
            content: ''
         };
    }

    diaryDelete = (e:any) => {
        fetch(`http://localhost:2206/diary/${this.props.diary.id}`, {
          method: 'DELETE',
          body: JSON.stringify({    
            date: this.state.date,
            title: this.state.title,
            content: this.state.content,
           }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => this.props.fetchDiaries())
      }

    render() { 
        return ( 
            <div>
                <Button onClick={this.diaryDelete} className='edit-btn m-2' style={{backgroundColor:'#d3773a', float: 'right', color: 'black'}}>Delete</Button>
            </div>
         );
    }
}
 
export default DiaryDelete;