import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { uploadImage } from "../../auth/fetchData";
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
function GroupImage(props) {
  const classes = useStyles();
  const [state, setOpen] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const [selectedFile, setSlectedFile] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ ...state, open: false });
  };
  const { vertical, horizontal, open } = state;
  const wordFinder = (element) => {
    const finder = props.selectedGroup;
    return element.id === finder;
  };
  const group = props.groups.find(wordFinder);
  const fileChangedHandler = (event) => {
    setSlectedFile(event.target.files[0]);
  };

  const uploadHandler = (event) => {
    event.preventDefault();
    const updateWord = `${URL.base + URL.api + URL.groups}/${group._id}/images`;
    const formData = new FormData();
    formData.append("filedata", selectedFile, selectedFile.name);
    uploadImage(updateWord, formData).then((data) => {
      setOpen({ ...state, open: true });
      props.setSelectedGroups([]);
    });
  };
  return (
    <form className={classes.root} autoComplete="off" onSubmit={uploadHandler}>
      <Button variant="outlined" color="primary" component="label">
        {selectedFile ? selectedFile.name : "обрати файл"}
        <input
          type="file"
          name="filedata"
          onChange={fileChangedHandler}
          style={{ display: "none" }}
        />
      </Button>
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
    selectedGroup: state.selectedGroup,
  };
};
const mapDispatch = ({
  groups: { setGroups },
  selectedGroups: { setSelectedGroups },
}) => ({
  setGroups: (data) => setGroups(data),
  setSelectedGroups: (data) => setSelectedGroups(data),
});
export default connect(mapState, mapDispatch)(GroupImage);
