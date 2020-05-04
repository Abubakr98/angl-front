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
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import MenuItem from "@material-ui/core/MenuItem";

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
    console.log(data);
    const updateWord = `${URL.base + URL.api + URL.groups}/${group.id}`;
    console.log(updateWord);
    postData(updateWord, "PUT", data).then((data) => {
      setOpen({ ...state, open: true });
      props.setSelectedGroups([]);
    });
  };
  const { vertical, horizontal, open } = state;
  const groupFinder = (element) => {
    const finder = props.selectedGroup;
    return element.id === finder;
  };
  const group = props.groups.find(groupFinder);

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
          required
          control={control}
          defaultValue={group.name}
        />
        <Controller
          as={TextField}
          name="des"
          label="Опис групи"
          required
          control={control}
          defaultValue={group.des}
        />
        <Controller
          as={TextField}
          name="_id"
          label="Ідентифікатор групи"
          disabled
          control={control}
          defaultValue={group._id}
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
          Дані умпішно змінено!
        </Alert>
      </Snackbar>
    </form>
  );
}
const mapState = (state) => {
  return {
    groups: state.groups,
    selectedGroups: state.selectedGroups,
    selectedGroup: state.selectedGroup,
  };
};
const mapDispatch = ({ selectedGroups: { setSelectedGroups } }) => ({
  setSelectedGroups: (data) => setSelectedGroups(data),
});
export default connect(mapState, mapDispatch)(WordCRUD);
