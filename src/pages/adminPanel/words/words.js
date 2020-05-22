import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from "./table";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getData } from "../../auth/fetchData";
import Paper from "@material-ui/core/Paper";
import URL from "../../../urls";
import styled from "styled-components";

const Test = styled.div`
  margin: auto 0 0 0;
  padding: 50px 50px;
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "1s",
    // width: "100%"
    padding: 10,
  },
  link: {
    color: "#303F9F",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
function Words(props) {
  const classes = useStyles();
  const path = `${URL.base + URL.api + URL.words}`;
  const pathGroups = ` ${URL.base + URL.api + URL.groups}`;

  useEffect(() => {
    getData(path, "GET").then((data) => {
      props.setLearningWords([...data]);
    });
    getData(pathGroups, "GET").then((data) => {
      props.setGroups([...data]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, props.selectedWords, props.selectedWord]);
  // #F50057
  return (
    <Test>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justify="space-around"
          item
          alignItems="center"
          xs={12}
        >
          <CssBaseline />
          <Paper className={classes.paper} elevation={3}>
            <Typography component="h1" variant="h5">
              Слова
            </Typography>
            <Table />
          </Paper>
        </Grid>
      </Container>
    </Test>
  );
}
const mapState = (state) => {
  return {
    learningWords: state.learningWords,
    selectedWords: state.selectedWords,
    selectedWord: state.selectedWord,
  };
};

const mapDispatch = ({
  learningWords: { setLearningWords },
  groups: { setGroups },
}) => ({
  setLearningWords: (data) => setLearningWords(data),
  setGroups: (data) => setGroups(data),
});
export default connect(mapState, mapDispatch)(Words);
