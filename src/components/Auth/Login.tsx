import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Auth.css";
import APIURL from '../../helpers/environment'


interface LoginProps {
  updateLocalStorage: (newToken: string, newRole: string) => void
clearLocalStorage: () => void
token: string

}

interface LoginState {
  email: string;
  password: string;
  role: string;
  path: string;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: "",
      path: "",
    };
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestObject = {
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
    try {
    const res = await fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify(requestObject),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      const data = await res.json()

      if(res.status===401){
        alert("Incorrect Email or Password")
      } else if (res.status===444){
        alert('Failed to log user in, try again')
      } else if (res.status===400){
        alert("Incorrect Email or Password")
      } else {
        this.props.updateLocalStorage(data.token, data.user.role);
      }
  } catch (error) {
    console.error()
  }
}

  render() {
    return (
      <>
       
       
        <div className="auth-main p-4 text-center" style={{alignItems:'center'}}>
          <Form onSubmit={this.handleSubmit} className="auth-form p-5 flex">
            <h1>Login</h1>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                style={{ backgroundColor: "burlywood", width: "75%", marginLeft: '13%' }}
                className="input text-center"
                type="email"
                name="email"
                placeholder="enter email"
                onChange={(e: any) => this.setState({ email: e.target.value })}
                value={this.state.email}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label className="password">Password</Label>
              <Input
                style={{ backgroundColor: "burlywood", width: "75%", marginLeft: '13%' }}
                className="input text-center"
                type="password"
                name="password"
                placeholder="enter password"
                onChange={(e: any) =>
                  this.setState({ password: e.target.value })
                }
                value={this.state.password}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                style={{ backgroundColor: "burlywood", width: "75%", marginLeft: '13%' }}
                className="input text-center"
                type="select"
                name="role"
                onChange={(e: any) => this.setState({ role: e.target.value })}
                value={this.state.role}
                required
              >
                <option style={{ backgroundColor: "burlywood", width: "75%" }} className="text-center">
                  {" "}
                  BOH{" "}
                </option>
                <option style={{ backgroundColor: "burlywood", width: "75%" }}>
                  {" "}
                  FOH{" "}
                </option>
                <option style={{ backgroundColor: "burlywood", width: "75%" }}>
                  {" "}
                  Admin{" "}
                </option>
              </Input>
            </FormGroup>
            <Button type="submit" className="btn" style={{backgroundColor:'#886382'}}>
              {" "}
              Submit{" "}
            </Button>
            <br />
            <p>
              <a href="/signup" style={{color:'rgb(224, 231, 224)'}}>New user? Sign-up</a>
            </p>
          </Form>
        </div>
      </>
    );
  }
}

export default Login;