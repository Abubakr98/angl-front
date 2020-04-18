import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { postData } from "../../auth/fetchData";
import URL from "../../../urls";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
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
  const { handleSubmit, errors, control } = methods;
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

  const getGroups = () => {
    return props.groups.map((el) => el._id)
  };

  const onSubmit = (data) => {
    console.log(data);
    const createWord = `${URL.base + URL.api + URL.words}`;
    postData(createWord, "POST", data).then((data) => {
      setOpen({ ...state, open: true });
      props.setselectedWords([]);
    });
  };
  const { vertical, horizontal, open } = state;
  const groups = getGroups();
  
  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Controller
          as={TextField}
          name="en"
          label="Слово аглійською"
          control={control}
          required
        />
        <Controller
          as={TextField}
          name="ua"
          label="Слово українською"
          required
          control={control}
        />
        <Controller
          as={TextField}
          name="des"
          label="Опис слова"
          required
          control={control}
          multiline
          rows={2}
        />

        <FormControl
          style={{ minWidth: "90%" }}
          error={Boolean(errors.wordlevel)}
        >
          <InputLabel id="demo-simple-select-label">група</InputLabel>
          <Controller
            as={
              <Select>
                <MenuItem value="">оберить групу</MenuItem>
                {groups.map((el,i) => {
                  return (
                    <MenuItem key={i} value={el}>
                      {el}
                    </MenuItem>
                  );
                })}
              </Select>
            }
            name="group"
            rules={{ required: "оберить групу!" }}
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.wordlevel && errors.wordlevel.message}
          </FormHelperText>
        </FormControl>
       
      </div>
      <Button variant="contained" type="submit" color="primary">
        створити
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
    groups: state.groups,
  };
};
const mapDispatch = ({
  learningWords: { setLearningWords },
  selectedWords: { setselectedWords },
}) => ({
  setLearningWords: (data) => setLearningWords(data),
  setselectedWords: (data) => setselectedWords(data),
});
export default connect(mapState, mapDispatch)(WordCRUD);
