import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import { useInputChange } from "./useInputChange";
import { useRedirect } from "./redirect";
import { postDataClear } from "./fetchData";
import { connect } from "react-redux";
import URL from "../../urls";
import Alert from "../components/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [isRedirect, handleIsRedirect] = useRedirect();
  const [value, setValue] = React.useState("basic");
  const [input, handleInputChange] = useInputChange();
  const signUp = (e) => {
    e.preventDefault();
    if (input.password.length < 8) {
      props.handleOpen("Мінімальна довжина паролю 8 знаків");
      return;
    }
    if (input.password === input.password2) {
      input.role = value;

      postDataClear(`${URL.base + URL.api + URL.signUp}`, "POST", input).then(
        (data) => {
          if (!data._id) {
            props.handleOpen(data.message);
          } else {
            props.handleOpen(
              "Для того щоб активувати обліковий запис, вам відправленно повідомлення на ел-пошту з інструкціей як це зробити"
            );
            handleIsRedirect();
          }
        }
      );
    } else {
      props.handleOpen("Паралі мають співпадати");
    }
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Реєстрація
        </Typography>
        <form className={classes.form} onSubmit={signUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Имя"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Призвище"
                name="lastName"
                autoComplete="lname"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Пошта"
                name="email"
                autoComplete="email"
                type="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Повторить пароль"
                type="password"
                id="password2"
                onChange={handleInputChange}
              />
              {props.userData ? (
                props.userData.role === "admin" ? (
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="role"
                      name="role"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="basic"
                        control={<Radio />}
                        label="звичайний користувач"
                      />
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="адміністратор"
                      />
                    </RadioGroup>
                  </FormControl>
                ) : null
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Створити обліковий запис
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
const mapState = (state) => {
  return {
    modalSignIn: state.modalSignIn,
    userData: state.userData,
  };
};

const mapDispatch = ({ modalSignIn: { handleClose, handleOpen } }) => ({
  handleClose: () => handleClose(),
  handleOpen: (data) => handleOpen(data),
});
export default connect(mapState, mapDispatch)(SignUp);
