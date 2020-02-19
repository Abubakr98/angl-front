import React from "react";
import AvatarUI from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "../components/Alert";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getData } from "../auth/fetchData";
import URL from "../../urls";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Test = styled.div`
  /* background-color: red; */
  margin: auto 0 0 0;
`;
const Btn = styled(Button)`
  /* background-color: red; */
  width: 100%;
  margin-bottom: 10px;
`;
const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Avatar = styled(AvatarUI)`
  margin-bottom: 20px;
  background-color: #f50057;
`;

class SignIn extends React.Component {
  state = {
    questions: [],
    answers: []
  };
  shuffle = arr => {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };
  componentDidMount = () => {
    const url = window.location.pathname;
    const group = url.split("/")[url.split("/").length - 1];
    console.log(group);
    const path = `${URL.base +
      URL.api +
      URL.users +
      this.props.userData.id +
      "/" +
      URL.study +
      group}?limit=${5}`;
    console.log(path);
    getData(path, "GET").then(data => {
      this.props.setLearningWords([...data]);
      this.setState({ questions: [...data], answers: [...data] });
    });
    // const learningWords = shuffle(this.props.learningWords);
    // console.log(this.state.questions);
  };

  setQHendler = () => {
    setTimeout(()=>{
      if (this.state.questions.length !== 1) {
        this.setState({ questions: this.state.questions.splice(1, this.state.questions.length), answers: this.shuffle(this.state.answers)});
      }
      console.log(this.state.questions);
      console.log(this.state.answers);
    }, 400)
  };
  render() {
    return (
      <Test>
        <Container component="main" maxWidth="xs">
          <Grid container direction="row" justify="center" alignItems="center">
            <CssBaseline />
            <Paper>
              <Avatar>
                <AssignmentTurnedInRoundedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Оберить правільний варіант
              </Typography>
              <Typography component="h2" variant="h4">
                {this.state.questions.length!==0?(this.state.questions[0].en):(null)}
              </Typography>
              {this.state.answers.map((el, i) => {
                return (
                  <Btn
                    size="large"
                    onClick={this.setQHendler}
                    variant="outlined"
                    color="primary"
                    key={el.id}
                  >
                    {el.ua}
                  </Btn>
                );
              })}
            </Paper>
            <Alert />
          </Grid>
        </Container>
      </Test>
    );
  }
}
const mapState = state => {
  return {
    userData: state.userData,
    learningWords: state.learningWords
  };
};

const mapDispatch = ({ learningWords: { setLearningWords } }) => ({
  setLearningWords: data => setLearningWords(data)
});

export default connect(mapState, mapDispatch)(SignIn);
