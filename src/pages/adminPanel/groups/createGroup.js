import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { postData } from "../../auth/fetchData";
import URL from "../../../urls";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
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

  const onSubmit = (data) => {
   
    const createGroup = `${URL.base + URL.api + URL.groups}`;
    postData(createGroup, "POST", data).then((data) => {
      setOpen({ ...state, open: true });
      props.setSelectedGroups([]);//
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
          name="name"
          label="Назва групи"
          control={control}
          required
        />
        <Controller
          as={TextField}
          name="des"
          label="Опис групи"
          required
          control={control}
          multiline
          rows={2}
        />
        <Controller
          as={TextField}
          name="_id"
          label="Ідентифікатор групи"
          required
          control={control}
          multiline
          rows={2}
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
          Слово умпішно додано!
        </Alert>
      </Snackbar>
    </form>
  );
}
const mapState = (state) => {
  return {
    userData: state.userData,
    selectedWords: state.selectedWords,
    selectedWord: state.selectedWord,
    learningWords: state.learningWords,
  };
};
const mapDispatch = ({

  selectedGroups: { setSelectedGroups },
}) => ({

  setSelectedGroups: (data) => setSelectedGroups(data),

});
export default connect(mapState, mapDispatch)(WordCRUD);
