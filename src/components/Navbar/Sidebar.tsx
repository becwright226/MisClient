import React, {Component} from 'react';
import {
    Menu,
    MenuItem,
    ProSidebar,
  } from "react-pro-sidebar";
  import "react-pro-sidebar/dist/css/styles.css";
  import { Link } from "react-router-dom"
import './Main.css'
import {BiFoodMenu, BiLogOut} from 'react-icons/bi'
import { GiChefToque,GiMoneyStack} from 'react-icons/gi';
import {AiOutlineSchedule} from 'react-icons/ai';
import { MdOutlineFoodBank} from 'react-icons/md'


interface SiteBarProps {
    clearLocalStorage: () => void
    token:string
    updateLocalStorage: (newToken: string, newRole: string) => void
}
interface SiteBarState {
    collapsed: boolean
}
 

 
class SiteBar extends Component<SiteBarProps, SiteBarState> {
    constructor(props: SiteBarProps) {
        super(props);
        this.state = {
            collapsed: false
        }
    
    }




    collapse = () => {
        this.setState({collapsed: !this.state.collapsed})
    }

    


    render() { 

    return (




        <><ProSidebar collapsed collapsedWidth={'16%'}  breakPoint='md' style={{height:'100vh', fontFamily:'Faustina, serif', opacity: '95%', }}  >
          
            <Menu id='responsive-navbar-nav' style={{height:'100vh',backgroundColor:'rgb(41, 61, 41)' }}>
        
                
                
                
                    <MenuItem icon={<MdOutlineFoodBank style={{color:'#b2d33a'}}/>} ><Link to='/login' className="site-link" style={{color:'rgb(224, 231, 224)'}}>Restaurant Posts</Link></MenuItem>
            
                    <MenuItem icon={<BiFoodMenu style={{color:'#b2d33a'}}/>}> 
                <Link to="/diary" className="site-link" style={{color:'rgb(224, 231, 224)'}}> Shift Diary </Link> </MenuItem>
                
                    <MenuItem icon={<AiOutlineSchedule style={{color:'#b2d33a'}} />} ><Link to="/schedule" className="site-link" style={{color:'rgb(224, 231, 224)'}}> Schedules </Link></MenuItem>
                  
              
                    <MenuItem icon={<GiChefToque style={{color:'#b2d33a'}}/>} ><Link to="/recipe" className="site-link" style={{color:'rgb(224, 231, 224)'}}> Recipes Main </Link></MenuItem>
                    
               
                    <MenuItem icon={<GiMoneyStack style={{color:'#b2d33a'}} />} ><Link to='/order' className="site-link" style={{color:'rgb(224, 231, 224)'}}> Orders </Link> </MenuItem>

                    <MenuItem icon={<BiLogOut style={{color:'#b2d33a'}} />} ><Link to='/logout' onClick={this.props.clearLocalStorage} className="site-link" style={{color:'rgb(224, 231, 224)'}}> Logout </Link> </MenuItem>
            </Menu>
         
        </ProSidebar>
        </>
    
     );
}
}

export default SiteBar;