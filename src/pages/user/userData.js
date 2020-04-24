import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { postData } from "../auth/fetchData";
import URL from "../../urls";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { setUserData } from "../auth/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "28ch",
    },
    "& .MuiTextField-root": {
      margin: 0,
      width: "100%",
    },
    display:"flex",
    flexDirection: "column",
    alignItems:"center"
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function WordCRUD(props) {
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const [state, setOpen] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ ...state, open: false });
  };
  const user = props.userData;
  
  const onSubmit = (data) => {
    const updateUser = `${URL.base + URL.api + URL.users + user.id}`;
    postData(updateUser, "PUT", data).then((data) => {
      setOpen({ ...state, open: true });
      user.userEmail=data.email;
      user.firstName=data.firstName;
      user.lastName=data.lastName;
      props.setUserData(user);
      setUserData(user);
    });
  };
  const { vertical, horizontal, open } = state;

  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Controller
          as={TextField}
          name="firstName"
          label="Имя"
          control={control}
          defaultValue={user.firstName}
          required
        />
        <Controller
          as={TextField}
          name="lastName"
          label="Прізвище"
          defaultValue={user.lastName}
          required
          control={control}
        />
        <Controller
          as={TextField}
          name="email"
          label="Пошта"
          required
          defaultValue={user.userEmail}
          control={control}
        />
      </div>
      <Button variant="contained" type="submit" color="primary">
        зберегти
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Дані успішно зміненно!
        </Alert>
      </Snackbar>
    </form>
  );
}
const mapState = (state) => {
  return {
    userData: state.userData,
  };
};
const mapDispatch = ({ userData: { setUserData } }) => ({
  setUserData: (data) => setUserData(data),
});
export default connect(mapState, mapDispatch)(WordCRUD);
