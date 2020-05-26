import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useInputChange } from "./useInputChange";
import { postDataClear } from "./fetchData";
import { setUserData } from "./auth";
import Alert from "../components/Alert";
import URL from "../../urls";
import { connect } from "react-redux";

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link:{
    color: "#303F9F",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    },
  }
}));

function SignIn(props) {
  const classes = useStyles();
  const [input, handleInputChange] = useInputChange();
  const signIn = e => {   
    e.preventDefault();
    postDataClear(`${URL.base + URL.api + URL.signIn}`, "POST", input).then(data => {
      if (!data.accessToken) {
        props.handleOpen(data.message);
      } else {
        console.log(data);
        
        setUserData(data);
        props.setToStateUserData(data);
        window.location.pathname = "/";
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
          Увійти
        </Typography>
        <form className={classes.form} onSubmit={signIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Пошта"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Вхід
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/remind-password" className={classes.link}>
                Нагадати пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up" className={classes.link}>
              Немає облікового запису? Зареєструватися
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Alert />
      {/* {isRedirect ? <Redirect to="/" /> : null} */}
    </Container>
  );
}
const mapState = state => {
  return {
    modalSignIn: state.modalSignIn
  };
};

const mapDispatch = ({ modalSignIn: { handleClose, handleOpen }, userData:{setUserData} }) => ({
  handleClose: () => handleClose(),
  handleOpen: (data) => handleOpen(data),
  setToStateUserData: (data) => setUserData(data),
});
export default connect(mapState, mapDispatch)(SignIn);
