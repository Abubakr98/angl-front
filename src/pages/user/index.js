import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getData } from "../auth/fetchData";
import Paper from "@material-ui/core/Paper";
import UserData from "./userData";
import Table from "./table";
import URL from "../../urls";
import styled from "styled-components";

const Test = styled.div`
  margin: auto 0 0 0;
  padding: 50px 50px;
`;
const MyPaper = styled(Paper)`
  display: "flex";
  flex-direction: "column";
  align-items: "center";
  transition: "1s";
  padding: 10px;
  &:last-child {
    margin-left: 10px;
  }
`;
function Words(props) {
  const user = props.userData;
  const path = `${URL.base + URL.api + URL.users + user.id}/${URL.words}`;
  useEffect(() => {
    getData(path, "GET").then((data) => {
      props.setUserWords(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  // #F50057
  return (
    <Test>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justify="center"
          item
          alignItems="center"
          xs={12}
        >
          <CssBaseline />
          <MyPaper elevation={3}>
            <UserData />
          </MyPaper>
          <MyPaper elevation={3}>
            <Table />
          </MyPaper>
        </Grid>
      </Container>
    </Test>
  );
}
const mapState = (state) => {
  return {
    groups: state.groups,
    userData: state.userData,
  };
};

const mapDispatch = ({ userWords: { setUserWords } }) => ({
  setUserWords: (data) => setUserWords(data),
});
export default connect(mapState, mapDispatch)(Words);
