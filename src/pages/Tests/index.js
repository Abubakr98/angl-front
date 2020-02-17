import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "../components/Alert";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const Test = styled.div`
  /* background-color: red; */
  margin: auto 0 0 0;
`;
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "green"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
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
  const classes = useStyles();

  return (
    <Test>
      <Container className={classes.con} component="main" maxWidth="xs">
        <Grid container direction="row" justify="center" alignItems="center">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Оберить правільний варіант
            </Typography>
          </div>
          <Alert />
        </Grid>
      </Container>
    </Test>
  );
}
const mapState = state => {
  return {
    modalSignIn: state.modalSignIn
  };
};

const mapDispatch = ({
  modalSignIn: { handleClose, handleOpen },
  userData: { setUserData }
}) => ({
  handleClose: () => handleClose(),
  handleOpen: data => handleOpen(data),
  setToStateUserData: data => setUserData(data)
});
export default connect(mapState, mapDispatch)(SignIn);
