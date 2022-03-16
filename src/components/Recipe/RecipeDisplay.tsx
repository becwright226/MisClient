import React, { Component } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  CardFooter,
  CardSubtitle,
  CardHeader,
} from "reactstrap";
import RecipeDelete from "./RecipeDelete";
import RecipeEdit from "./RecipeEdit";
import APIURL from '../../helpers/environment'


interface RecipeDisplayProps {
  token: string;
  trigger: boolean;
}

interface RecipeDisplayState {
  recipes: object[];
  updatePressed: boolean;
  recipeToUpdate: object;
}

class RecipeDisplay extends Component<RecipeDisplayProps, RecipeDisplayState> {
  constructor(props: RecipeDisplayProps) {
    super(props);
    this.state = {
      recipes: [],
      updatePressed: false,
      recipeToUpdate: {},
    };
  }

  fetchRecipes = async () => {
    try {
      const res = await fetch(`${APIURL}/recipe/allrecipes`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: String(localStorage.getItem("token")),
        }),
      });
      const data = await res.json();
      this.setState({ recipes: data });
      console.log(data);
      console.log(this.state.recipes);
    } catch (error) {
      console.log({ error });
    }
  };

  setUpdatedRecipe = (e: any, recipe: any) => {
    this.setState({
      recipeToUpdate: recipe,
      updatePressed: true,
    });
    console.log(recipe);
  };
  componentDidUpdate(
    prevProps: RecipeDisplayProps,
    prevState: RecipeDisplayState
  ) {
    if (this.props.trigger !== prevProps.trigger) {
      this.fetchRecipes();
    }
  }
  componentDidMount = () => {
    this.fetchRecipes();
  };

  render() {
    const recipeMapper = () => {
      return this.state.recipes.length>0? this.state.recipes.map((recipe: any, index: any) => {
        return (
          <Card
            className="recicard m-5"
            style={{
              backgroundColor: " rgb(41, 61, 41)",
              color: "#bbabc2",
              opacity: "90%",
              fontFamily: "Faustina",
            }}
            key={index}
          >
            <CardHeader className="recicard-footer text-center">
              {recipe.course}-----{recipe.cuisine}
            </CardHeader>
            <CardTitle
              className="recicard-title m-3"
              scope="row"
              style={{ fontSize: "15pt" }}
            >
              {recipe.title}
            </CardTitle>
            <CardSubtitle
              className="recicard-sub m-3"
              scope="row"
              style={{ fontSize: "15pt" }}
            >
              {recipe.method}
            </CardSubtitle>
            <CardSubtitle
              className="recicard-sub m-3"
              scope="row"
              style={{ fontSize: "15pt" }}
            >
              {recipe.time}
            </CardSubtitle>
            <CardBody
              className="recicard-content text-center"
              style={{
                backgroundColor: " rgb(224, 231, 224)",
                color: "#453c49",
                fillOpacity: "100%",
              }}
            >
              {" "}
              {recipe.desc}
            </CardBody>
            <CardFooter className="recicard-footer text-center">
              <Row className="recicard-button">
                <Col>
                  <RecipeEdit
                    recipe={recipe}
                    token={this.props.token}
                    fetchRecipes={this.fetchRecipes}
                  />
                </Col>
                <Col>
                  <RecipeDelete
                    token={this.props.token}
                    fetchRecipes={this.fetchRecipes}
                    recipe={recipe}
                  />
                </Col>{" "}
              </Row>
            </CardFooter>
          </Card>
        );
      }): <h2>No recipes have benn recorded</h2>
    };
    return (
      <>
        <Container>
          <Row>
            <Col>{recipeMapper()}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default RecipeDisplay;
