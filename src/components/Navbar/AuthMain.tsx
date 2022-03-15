import * as React from 'react';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import { Component } from 'react';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Nav from './Navbar'
import '../Auth/Auth.css'
import Main from './Main';

interface AuthMainProps {
updateLocalStorage: (newToken: string, newRole: string) => void
clearLocalStorage: () => void
token: string


}
 

 
class AuthMain extends Component<AuthMainProps> {
    constructor(props: AuthMainProps) {
        super(props);
      //  this.state = { :  };
    }
    render() { 
        return (
        
        <React.Fragment>
           
              <Nav token={this.props.token} clearLocalStorage={this.props.clearLocalStorage} updateLocalStorage={this.props.updateLocalStorage} />
               
              <Routes>
                    <Route path="/" element={ <> {!this.props.token ? <><Login clearLocalStorage={this.props.clearLocalStorage} updateLocalStorage={this.props.updateLocalStorage} token={this.props.token}/> </> : <Main  token={this.props.token} clearLocalStorage={this.props.clearLocalStorage} updateLocalStorage={this.props.updateLocalStorage} />}</> } />

                    <Route path="/login" element={ <> {!this.props.token ? <><Login clearLocalStorage={this.props.clearLocalStorage} updateLocalStorage={this.props.updateLocalStorage} token={this.props.token}/> </> : <Main  token={this.props.token} clearLocalStorage={this.props.clearLocalStorage} updateLocalStorage={this.props.updateLocalStorage} />}</> } />

                    <Route path="/signup" element={ <> {!this.props.token ? <><Signup clearLocalStorage={this.props.clearLocalStorage} updateLocalStorage={this.props.updateLocalStorage} token={this.props.token}/> </> : 
                    <Main  token={this.props.token} clearLocalStorage={this.props.clearLocalStorage} updateLocalStorage={this.props.updateLocalStorage} />}</> } />





                    {/*   */}
                </Routes> 
               
           
        </React.Fragment>  
        );
    }
}
 
export default AuthMain;