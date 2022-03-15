import React from 'react'
import '../Navbar/Main.css'
import "react-pro-sidebar/dist/css/styles.css";
import { Link} from 'react-router-dom'
import { Navbar, NavLink, NavItem, Nav    } from 'react-bootstrap';
import { GiCook } from 'react-icons/gi';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';



interface UserNavProps {
  clearLocalStorage: () => void,
  token: string | null
  updateLocalStorage: (newToken: string, newRole: string) => void
}
 
interface UserNavState {
  
}
 
class UserNav extends React.Component<UserNavProps, UserNavState> {
  constructor(props: UserNavProps) {
    super(props);
    this.state = {  };
  }
  render() { 
    return ( 

  <Navbar  collapseOnSelect expand='lg' className='main-nav' variant='dark'>
  <Navbar.Brand href={'/login'}  >Mis En Plas <GiCook style={{color:'#a7719e'}}/> </Navbar.Brand>
  <NavbarToggle/>
  <NavbarCollapse aria-controls="responsive-navbar-nav"  >

    <Nav >

      {!this.props.token ? (
        <>
        <NavItem >
          <NavLink> <Link to='/signup' style={{color:'rgb(224, 231, 224)'}}> SignUp </Link> </NavLink>
        </NavItem>
        <NavItem >
          <NavLink> <Link to='/login' style={{color:'rgb(224, 231, 224)'}}> Login </Link> </NavLink>
        </NavItem>
        </>
      ) : (
        <>
        <NavItem>
          <NavLink> <Link to='/login' style={{color:'rgb(41, 61, 41)'}}> Resturant Posts </Link> </NavLink>
        </NavItem>

        <NavItem>
          <NavLink> <Link to='/order' style={{color:'rgb(41, 61, 41)'}}> Orders </Link> </NavLink>
        </NavItem>

        <NavItem>
          <NavLink> <Link to='/recipe' style={{color:'rgb(41, 61, 41)'}}> Recipes </Link> </NavLink>
        </NavItem>

        <NavItem>
          <NavLink> <Link to='/diary' style={{color:'rgb(41, 61, 41)'}}> Shift Diary </Link> </NavLink>
        </NavItem>

        <NavItem>
          <NavLink> <Link to='/schedule' style={{color:'rgb(41, 61, 41)'}}> Schedules </Link> </NavLink>
        </NavItem> 

        <NavItem> 
        <NavLink> <Link to='/logout' onClick={this.props.clearLocalStorage} style={{color:'rgb(41, 61, 41)'}}> Logout </Link> </NavLink>
        </NavItem>

</>

      )}
     
    </Nav>
  </NavbarCollapse>
    
  </Navbar>


   );
  }
}
 
export default UserNav;