import * as React from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css'


interface AuthProps {
  updateLocalStorage: (newToken: string, newRole: string) => void
  clearLocalStorage: () => void
  token: string
  
  
}
 
interface AuthState {
  isLogin: boolean
}
 
class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
     super(props);
      this.state = {
       isLogin: true
       };
       this.changeState = this.changeState.bind(this)
  }
  changeState = () => {
    this.setState({
      isLogin: !this.state.isLogin
   })
 }
    render() { 
      const {isLogin} = this.state;
        return ( 
          <div className='auth-div' >
           {!isLogin ? (
              <Login updateLocalStorage={this.props.updateLocalStorage} clearLocalStorage={this.props.clearLocalStorage} token={this.props.token}/>
           ):(
            <Signup updateLocalStorage={this.props.updateLocalStorage} clearLocalStorage={this.props.clearLocalStorage} token={this.props.token} />
           )
           }


        </div> 
        );
    }
}
 
export default Auth;