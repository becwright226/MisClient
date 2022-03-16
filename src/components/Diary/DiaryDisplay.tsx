import React, {Component } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  CardFooter,
  CardSubtitle,
} from "reactstrap";
import APIURL from "../../helpers/environment";
import DiaryDelete from "./DiaryDelete";
import DiaryEdit from "./DiaryEdit";

interface DiaryDisplayProps {
  token: string;
  trigger: boolean;
}

interface DiaryDisplayState {
  diaries: object[];
  updatePressed: boolean;
  diaryToUpdate: object;
}

class DiaryDisplay extends Component<DiaryDisplayProps, DiaryDisplayState> {
  constructor(props: DiaryDisplayProps) {
    super(props);
    this.state = {
      diaries: [],
      updatePressed: false,
      diaryToUpdate: {},
    };
  }

  fetchDiaries = async () => {
    try {
      const res = await fetch(`${APIURL}/diary/mydiaries`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: String(localStorage.getItem("token")),
        }),
      });
      const data = await res.json();
      this.setState({ diaries: data });
      console.log(data);
      console.log(this.state.diaries);
    } catch (error) {
      console.log({ error });
    }
  };

  setUpdatedDiary = (e: any, diary: any) => {
    this.setState({
      diaryToUpdate: diary,
      updatePressed: true,
    });
    console.log(diary);
  };

  componentDidUpdate(
    prevProps: DiaryDisplayProps,
    prevState: DiaryDisplayState
  ) {
    if (this.props.trigger != prevProps.trigger) {
      this.fetchDiaries();
    }
  }

  componentDidMount = () => {
    this.fetchDiaries();
  };

  render() {
    const diaryMapper = () => {
      return this.state.diaries.map((diary: any, index: any) => {
        return (
          <Card
            className="diarycard m-5"
            style={{
              backgroundColor: " rgb(41, 61, 41)",
              color: "#bbabc2",
              opacity: "90%",
              fontFamily: "Faustina",
            }}
            key={index}
          >
            <CardTitle
              className="diarycard-title m-3"
              scope="row"
              style={{ fontSize: "15pt" }}
            >
              {diary.title}
            </CardTitle>
            <CardSubtitle className="diarycard-sub text-center">
              {diary.date}
            </CardSubtitle>
            <CardBody
              className="diarycard-content text-center"
              style={{
                backgroundColor: " rgb(224, 231, 224)",
                color: "black",
                fillOpacity: "100%",
              }}
            >
              {" "}
              {diary.content}
            </CardBody>
            <CardFooter className="diarycard-footer text-center">
              <Row className="diarycard-button">
                <Col>
                  <DiaryEdit
                    diary={diary}
                    token={this.props.token}
                    fetchDiaries={this.fetchDiaries}
                  />
                </Col>
                <Col>
                  <DiaryDelete
                    token={this.props.token}
                    fetchDiaries={this.fetchDiaries}
                    diary={diary}
                  />
                </Col>
              </Row>
            </CardFooter>
          </Card>
        );
      });
    };
    return (
      <>
        <Container>
          <Row>
            <Col>{diaryMapper()}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default DiaryDisplay;