import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getData } from "../auth/fetchData";
import Paper from "@material-ui/core/Paper";
import UserData from "./userData";
import Table from "./table";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import URL from "../../urls";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Test = styled.div`
  /* margin: auto 0 0 0; */
  padding-top: 50px;
  padding-bottom: 50px;
  max-width:100%;
`;
const MyPaper = styled(Paper)`
  display: "flex";
  flex-direction: "column";
  align-items: "center";
  justify-content: center;
  transition: "1s";
  padding: 10px;
  /* &:last-child {
    margin-left: 10px;
  } */
`;
const TabsPaper = styled(Paper)`
  flex-grow: 1;
  /* width:100%; */
`;
function Words(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          direction="column"
          justify="center"
          item
          alignItems="center"
          xs={12}
        >
          <CssBaseline />
          <TabsPaper>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="fullWidth"
            >
              <Tab label="Обліковий запис" />
              <Tab label="Вивчені слова" />
              <Tab label="Налаштування" />
            </Tabs>
          </TabsPaper>
          <TabPanel value={value} index={0}>
            <MyPaper elevation={3}>
              <UserData />
            </MyPaper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyPaper elevation={3}>
              <Table />
            </MyPaper>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MyPaper elevation={3}>Налаштування</MyPaper>
          </TabPanel>
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
