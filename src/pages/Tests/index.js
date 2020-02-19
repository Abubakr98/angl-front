import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getData } from "../auth/fetchData";
import URL from "../../urls";
import Button from "@material-ui/core/Button";
import { useParams, Redirect } from "react-router-dom";
import { useRedirect } from "../auth/redirect";
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';

const Test = styled.div`
  /* background-color: red; */
  margin: auto 0 0 0;
`;
const Btn = styled(Button)`
  /* background-color: red; */
  width: 100%;
  margin-bottom: 10px;
  &:active{
    background-color:red;
    color:#fff;
  }
`;
const BtnR = styled(Button)`
  /* background-color: red; */
  width: 100%;
  margin-bottom: 10px;
  &:active{
    background-color:green;
    color:#fff;
  }
`;
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "1s"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  link: {
    color: "#303F9F",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

function SignIn(props) {
  const shuffle = arr => {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };
  const classes = useStyles();
  let { group } = useParams();
  const [isRedirect, handleIsRedirect] = useRedirect();
  const [questions, setQ] = useState([]);
  const [answers, setA] = useState([]);
  const [disabled, setD] = useState(false);
  const path = `${URL.base +
    URL.api +
    URL.users +
    props.userData.id +
    "/" +
    URL.study +
    group}?limit=${5}`;
  useEffect(() => {
    getData(path, "GET").then(data => {
      props.setLearningWords([...data]);
      setQ([...data]);
      setA([...data]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // #F50057
  const setQHendler = (el, index) => {
    if (questions.length !== 1) {
      setD(true);
      if (questions[0].en === el.en) {
        setQ(questions.splice(1, questions.length));
      }
      setTimeout(() => {
        setA(shuffle(answers));
        setD(false);
      }, 500);
    } else {
      props.handleOpen("Так тримати, ви вже вивчили 5 слів!");
      setTimeout(() => {
        handleIsRedirect();
      }, 500);
    }
  };
  return (
    <Test>
      <Container className={classes.con} component="main" maxWidth="xs">
        <Grid container direction="row" justify="center" alignItems="center">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AssignmentTurnedInRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Оберить правільний варіант
            </Typography>
            <Typography component="h2" variant="h4">
              {questions.length !== 0 ? questions[0].en : (<CircularProgress color="secondary" />)}
            </Typography>
            {answers.map((el, i) => {
              return (
                el.en === questions[0].en?(
                  <BtnR
                  size="large"
                  onClick={() => setQHendler(el, i)}
                  variant="outlined"
                  color="primary"
                  disabled={disabled}
                  key={el.id}
                >
                  {el.ua}
                </BtnR>
                ):(
                  <Btn
                  size="large"
                  onClick={() => setQHendler(el, i)}
                  variant="outlined"
                  color="primary"
                  disabled={disabled}
                  key={el.id}
                >
                  {el.ua}
                </Btn>
                )
              );
            })}
          </div>
          {isRedirect ? <Redirect to="/" /> : null}
        </Grid>
      </Container>
    </Test>
  );
}
const mapState = state => {
  return {
    userData: state.userData,
    learningWords: state.learningWords,
    modalSignIn: state.modalSignIn
  };
};

const mapDispatch = ({
  modalSignIn: { handleClose, handleOpen },
  learningWords: { setLearningWords }
}) => ({
  setLearningWords: data => setLearningWords(data),
  handleClose: () => handleClose(),
  handleOpen: data => handleOpen(data)
});
export default connect(mapState, mapDispatch)(SignIn);
