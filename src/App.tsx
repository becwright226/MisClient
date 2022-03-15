import React from "react";
import { useState, useEffect } from "react";
import Main from "./components/Navbar/Main";
import AuthMain from "./components/Navbar/AuthMain";
import SiteBar from "./components/Navbar/Sidebar";



const App = () => {
  const [token, setToken] = useState<string | null>("");
  const [role, setRole] = useState<string | null>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (localStorage.getItem("role")) {
      setRole(localStorage.getItem("role"));
    }
  }, []);

  const updateLocalStorage = (newToken: string, newRole: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setToken("");
  };

  const protectedViews = () => {
    return (token === localStorage.getItem('token') ? 
    <><Main  clearLocalStorage={clearLocalStorage} token={token as string} updateLocalStorage={updateLocalStorage} /><SiteBar clearLocalStorage={clearLocalStorage} token={token as string} updateLocalStorage={updateLocalStorage} /></>
    :  <AuthMain updateLocalStorage={updateLocalStorage}  clearLocalStorage={clearLocalStorage} token={token as string}/> 
    )
  }


  return (





  <div className="mainpage">  

  
  {protectedViews()}
    </ div>

  





    

        
  );
};

export default App;
