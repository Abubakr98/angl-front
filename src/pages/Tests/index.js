import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getData, postData } from "../auth/fetchData";
import Question from "./question";
import URL from "../../urls";
import Button from "@material-ui/core/Button";
import { useParams, Redirect } from "react-router-dom";
import { useRedirect } from "../auth/redirect";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import styled from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";

const Test = styled.div`
  /* background-color: red; */
  margin: auto 0 0 0;
`;

const BlockA = styled.div`
  /* background-color: violet; */
`;
const MyGrid = styled(Grid)`
  background-color: #e8ebed;
  border-radius: 5px;
`;
const Btn = styled(Button)`
  /* background-color: red; */
  width: 100%;
  margin-bottom: 10px;
  text-transform: lowercase;
  font-size: 16px;
  /* &:active {
    background-color: red;
    color: #fff;
  } */
`;
const BtnR = styled(Button)`
  /* background-color: red; */
  width: 100%;
  margin-bottom: 10px;
  text-transform: lowercase;
  font-size: 16px;
  /* &:active {
    background-color: green;
    color: #fff;
  } */
`;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function SignIn(props) {
  const shuffle = (arr) => {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };
  let { group } = useParams();
  const [isRedirect, handleIsRedirect] = useRedirect();
  const [questions, setQ] = useState([]);
  const [answers, setA] = useState([]);
  const [disabled, setD] = useState(false);
  const [state, setOpen] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    severity: "success",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ ...state, open: false });
  };
  const path = `${
    URL.base + URL.api + URL.users + props.userData.id + "/" + URL.study + group
  }?limit=${5}`;
  useEffect(() => {
    getData(path, "GET").then((data) => {
      if ([...data].length === 0) {
        props.handleOpen("Ви вичили всі слова з цієї групи");
        setTimeout(() => {
          handleIsRedirect();
        }, 500);
      }
      props.setLearningWords([...data]);
      setQ([...data]);
      setA([...data]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]); // []
  // #F50057
  const setQHendler = (el) => {
    const userLerned = `${
      URL.base + URL.api + URL.users + props.userData.id + "/" + URL.study
    }`;
    if (questions.length !== 1) {
      setD(true);
      if (questions[0].en === el.en) {
        postData(userLerned, "POST", { id: el.id, time: Date.now() }).then(
          (data) => {
            console.log(data);
          }
        );
        setOpen({ ...state, open: false });
        setOpen({ ...state, severity: "success", open: true });
        setQ(questions.splice(1, questions.length));
      } else {
        setOpen({ ...state, open: false });
        setOpen({ ...state, severity: "error", open: true });
        setQ(questions.splice(1, questions.length));
      }
      setTimeout(() => {
        setA(shuffle(answers));
        setD(false);
      }, 600);
    } else {
      if (questions[0].en === el.en) {
        postData(userLerned, "POST", { id: el.id, time: Date.now() }).then(
          (data) => {
            console.log(data);
          }
        );
      }
      props.handleOpen("Так тримати, ви вже вивчили 5 слів!");
      setTimeout(() => {
        handleIsRedirect();
      }, 500);
    }
  };
  const { vertical, horizontal, severity, open } = state;
  return (
    <Test>
      <Container component="main" maxWidth="sm">
        <MyGrid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {questions.length !== 0 ? (
              <Question data={questions[0]} />
            ) : (
              <div>
                <Skeleton variant="text" width={100} />
                <Skeleton width="100%" height={118} variant="rect" />
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <BlockA>
              {answers.map((el, i) => {
                return el.en === questions[0].en ? (
                  <BtnR
                    size="large"
                    // onMouseDown={() => setQHendler(el, i)}
                    onClick={() => setQHendler(el, i)}
                    variant="outlined"
                    color="primary"
                    disabled={disabled}
                    key={el.id}
                  >
                    {el.en}
                  </BtnR>
                ) : (
                  <Btn
                    size="large"
                    // onMouseDown={() => setQHendler(el, i)}
                    onClick={() => setQHendler(el, i)}
                    variant="outlined"
                    color="primary"
                    disabled={disabled}
                    key={el.id}
                  >
                    {el.en}
                  </Btn>
                );
              })}
            </BlockA>
          </Grid>
          {isRedirect ? <Redirect to="/" /> : null}
          {questions.length !== 0 ? (
            <>
              <Grid item xs={12} sm={6}>
                <Btn
                  size="small"
                  onClick={() => setQHendler(false)}
                  variant="contained"
                  color="secondary"
                  disabled={disabled}
                >
                  не знаю
                </Btn>
              </Grid>
              <Grid item xs={12} sm={6}>
                <BtnR
                  size="small"
                  onClick={() => setQHendler(questions[0])}
                  variant="contained"
                  color="primary"
                  disabled={disabled}
                >
                  знаю це слово
                </BtnR>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" height={35} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" height={35} />
              </Grid>
            </>
          )}
        </MyGrid>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        // autoHideDuration={500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {severity === "success" ? "Вірно" : "Не вірно"}
        </Alert>
      </Snackbar>
    </Test>
  );
}
const mapState = (state) => {
  return {
    userData: state.userData,
    learningWords: state.learningWords,
    modalSignIn: state.modalSignIn,
  };
};

const mapDispatch = ({
  modalSignIn: { handleClose, handleOpen },
  learningWords: { setLearningWords },
}) => ({
  setLearningWords: (data) => setLearningWords(data),
  handleClose: () => handleClose(),
  handleOpen: (data) => handleOpen(data),
});
export default connect(mapState, mapDispatch)(SignIn);
