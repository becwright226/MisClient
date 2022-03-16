import React, { Component } from 'react';
import { 
    Form,
    Button,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import APIURL from '../../helpers/environment'


interface PostCreateProps {
    token: string
    triggerMethod: Function
}
 
interface PostCreateState {
    //id?: string,
    date: string;
    title: string;
    content: string;
    role: string
    
}
 
class Post extends Component<PostCreateProps, PostCreateState> {
    constructor(props: PostCreateProps) {
        super(props);
        this.state = { 
            // id: '',
            date: '', 
            title: '',
            content: '',
            role: 'All Staff'
        };
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestObject = {
            date: this.state.date,
            title: this.state.title,
            content: this.state.content,
            role: this.state.role,
        } 
        try {
            const res = await fetch(`${APIURL}/post/`, {
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
                title: '',
                content: '',
                role: 'All Staff'
            })
           
        } catch (error) {
            console.log({error})
        }
    }

    render() { 
        return ( 
            <div className='postform m-4 p-3' style={{backgroundColor:' rgb(41, 61, 41)', color:'#bbabc2', opacity:'90%', fontFamily:'Faustina', borderRadius: '4px'}}>
            <Form onSubmit={this.handleSubmit} >
            <FormGroup>
                        <Label for="date">Date</Label>
                        <Input id="li_date" type="date" name="date" placeholder="enter the date" onChange={(e:any) => this.setState({date: e.target.value})} value={this.state.date} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input id="li_title" type="text" name="title" placeholder="enter a title for your post" onChange={(e:any) => this.setState({title: e.target.value})} value={this.state.title} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input id="li_content" type='textarea' name="content" placeholder="make your announcement" onChange={(e:any) => this.setState({content: e.target.value})} value={this.state.content} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="role">Role</Label>
                        <Input id="li_role" type='select' name="role" placeholder="enter role" onChange={(e:any) => this.setState({role: e.target.value})} value={this.state.role}> 
                        <option> BOH </option>
                        <option > FOH </option>
                        <option > All Staff </option>
                        </Input>
                    </FormGroup>
                    <Button type="submit" className="btn" style={{backgroundColor:'#a7719e', color: 'black'}} > Submit </Button>
            </Form>
          
            </div>
         );
    }
}
 
export default Post;