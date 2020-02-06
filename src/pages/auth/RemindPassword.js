import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useInputChange } from "./useInputChange";
import { postData } from "./fetchData";
import Alert from "../components/Alert";
import URL from "../../urls";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  }
}));

function SignIn(props) {
  const classes = useStyles();
  const [input, handleInputChange] = useInputChange();

  const signIn = e => {
    postData(`${URL.base + URL.api + URL.remindPassword}`, "POST", input).then(
      data => {
        if (data.status !== "Ok") {
          props.handleOpen(data.message);
        } else {
          props.handleOpen("Інструкція для скидання паролю надіслані на вашу ел-пошту");
        }
      }
    );
    e.preventDefault();
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Скинути
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Немає облікового запису? Зареєструватися"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Alert />
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
export default connect(mapState, mapDispatch)(SignIn);
