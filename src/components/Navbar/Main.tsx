import * as React from "react";
import Nav from "./Navbar";
import {
  BrowserRouter as Router,  Route,
  Routes,
} from "react-router-dom";
import Post from "../Post/PostIndex";
import Recipe from "../Recipe/RecipeIndex";
import Diary from "../Diary/DiaryIndex";
import Order from "../Order/OrderIndex";
import { Component } from "react";
import SchedIndex from '../Schedule/ScheduleIndex';
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import "./Main.css";


interface MainProps {
  clearLocalStorage: () => void;
  token: string;
  updateLocalStorage: (newToken: string, newRole: string) => void;
  //posts: object[]
}

class Main extends Component<MainProps> {
  constructor(props: MainProps) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Nav
          token={this.props.token}
          clearLocalStorage={this.props.clearLocalStorage}
          updateLocalStorage={this.props.updateLocalStorage}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                {this.props.token ? (
                  <>
                    {" "}
                    <Post
                     
                      clearLocalStorage={this.props.clearLocalStorage}
                      updateLocalStorage={this.props.updateLocalStorage}
                      token={this.props.token}
                    />{" "}
                  </>
                ) : (
                  <Login
                    updateLocalStorage={this.props.updateLocalStorage}
                    clearLocalStorage={this.props.clearLocalStorage}
                    token={this.props.token}
                  />
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {" "}
                {this.props.token ? (
                  <>
                    {" "}
                    <Post
                      
                      clearLocalStorage={this.props.clearLocalStorage}
                      updateLocalStorage={this.props.updateLocalStorage}
                      token={this.props.token}
                    />{" "}
                  </>
                ) : (
                  <Login
                    updateLocalStorage={this.props.updateLocalStorage}
                    clearLocalStorage={this.props.clearLocalStorage}
                    token={this.props.token}
                  />
                )}
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                {" "}
                {this.props.token ? (
                  <>
                    {" "}
                    <Post
                      
                      clearLocalStorage={this.props.clearLocalStorage}
                      updateLocalStorage={this.props.updateLocalStorage}
                      token={this.props.token}
                    />{" "}
                  </>
                ) : (
                  <Signup
                    updateLocalStorage={this.props.updateLocalStorage}
                    clearLocalStorage={this.props.clearLocalStorage}
                    token={this.props.token}
                  />
                )}
              </>
            }
          />

          <Route
            path="/order"
            element={
              <>
                {" "}
                {this.props.token ? (
                  <>
                    <Order
                      clearLocalStorage={this.props.clearLocalStorage}
                      token={this.props.token}
                    />{" "}
                  </>
                ) : (
                  <Login
                    updateLocalStorage={this.props.updateLocalStorage}
                    clearLocalStorage={this.props.clearLocalStorage}
                    token={this.props.token}
                  />
                )}
              </>
            }
          />

          <Route
            path="/recipe"
            element={
              <>
                {" "}
                {this.props.token ? (
                  <>
                    <Recipe
                      clearLocalStorage={this.props.clearLocalStorage}
                      token={this.props.token}
                    />{" "}
                  </>
                ) : (
                  <Login
                    updateLocalStorage={this.props.updateLocalStorage}
                    clearLocalStorage={this.props.clearLocalStorage}
                    token={this.props.token}
                  />
                )}
              </>
            }
          />

          <Route
            path="/diary"
            element={
              <>
                {" "}
                {this.props.token ? (
                  <>
                    <Diary
                      clearLocalStorage={this.props.clearLocalStorage}
                      token={this.props.token}
                    />{" "}
                  </>
                ) : (
                  <Login
                    updateLocalStorage={this.props.updateLocalStorage}
                    clearLocalStorage={this.props.clearLocalStorage}
                    token={this.props.token}
                  />
                )}
              </>
            }
          />

          <Route
            path="/schedule"
            element={
              <>
                {" "}
                {this.props.token ? (
                  <>
                    <SchedIndex
                      clearLocalStorage={this.props.clearLocalStorage}
                      token={this.props.token}
                    />{" "}
                  </>
                ) : (
                  <Login
                    updateLocalStorage={this.props.updateLocalStorage}
                    clearLocalStorage={this.props.clearLocalStorage}
                    token={this.props.token}
                  />
                )}
              </>
            }
          />

          <Route
            path="/logout"
            element={
              <Login
                updateLocalStorage={this.props.updateLocalStorage}
                clearLocalStorage={this.props.clearLocalStorage}
                token={this.props.token}
              />
            }
          />
        </Routes>
      </React.Fragment>
    );
  }
}

export default Main;
