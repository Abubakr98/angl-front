import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router";
import { useRedirect } from "./redirect";
import { postData } from "./fetchData";
import { connect } from "react-redux";
import URL from "../../urls";
import Alert from "../components/Alert";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

function SignUp(props) {
  const classes = useStyles();
  const [isRedirect, handleIsRedirect] = useRedirect();
  let { token } = useParams();
  const signUp = e => {
    e.preventDefault();
    postData(
      `${URL.base + URL.api + URL.emailVerify + token}`,
      "POST",
      {},
      token
    ).then(data => {
      if (!data._id) {
        props.handleOpen(data.message);
      } else {
        props.handleOpen(
          "Обліковий запис успішно активовано! Тепер ви можете авторизуватися."
        );
        handleIsRedirect();
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Скидання паролю
        </Typography>
        <form className={classes.form} onSubmit={signUp}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Активувати обліковий запис
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="sign-in" className={classes.link}>
                Маєете вже обліковий запис? Вхід
              </Link>
            </Grid>
          </Grid>
        </form>
        <Alert />
        {isRedirect ? <Redirect to="/sign-in" /> : null}
      </div>
    </Container>
  );
}
const mapState = state => {
  return {
    modalSignIn: state.modalSignIn
  };
};

const mapDispatch = ({ modalSignIn: { handleClose, handleOpen } }) => ({
  handleClose: () => handleClose(),
  handleOpen: data => handleOpen(data)
});
export default connect(mapState, mapDispatch)(SignUp);
