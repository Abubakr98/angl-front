/* eslint-disable array-callback-return */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { connect } from "react-redux";
import { deleteData } from "../../auth/fetchData";
import URL from "../../../urls";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/icons/Create";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import EditWord from "./word";
import CreateWord from "./createWord";
import styled from "styled-components";
import CardMedia from "@material-ui/core/CardMedia";

const MyTable = styled(Table)`
  .MuiTableCell-sizeSmall {
    padding: 5px 10px;
  }
  .MuiTableCell-head {
    padding: 5px 5px;
  }
`;
const WordIcon = styled.div`
  position: relative;
  /* background-color: green; */
  display: flex;
  justify-content: center;
  align-items: center;
  & > :first-child {
    position: absolute;
    font-size: 23px;
    opacity: 0.7;
  }
  & > :last-child {
    font-size: 40px;
    opacity: 0.5;
  }
`;
const IMG = styled(CardMedia)`
  padding-top: 56.25%;
`;
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  { id: "number", numeric: true, disablePadding: true, label: "Номер" },
  { id: "en", numeric: false, disablePadding: false, label: "аглійською" },
  { id: "ua", numeric: false, disablePadding: false, label: "українською" },
  { id: "des", numeric: false, disablePadding: false, label: "опис" },
  { id: "group", numeric: false, disablePadding: false, label: "група" },
  { id: "image", numeric: false, disablePadding: false, label: "картинка" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "right"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Обрано
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Оберить слова
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => props.onClicked()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onClicked: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("number");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [dialog, setDialog] = React.useState(false);
  const [dialogC, setDialogC] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleCloseDialogC = () => {
    setDialogC(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ open: false });
  };

  let rows = [{ number: "Cupcake", en: 305, ua: 23, des: 312, group: 235, image:null }];
  if (props.learningWords.length !== 0) {
    rows = [];
    props.learningWords.map((el) => {
      const { id, en, ua, des, group, image } = el;
      rows.push({ number: id, en, ua, des, group,image });
    });
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.number);
      props.setSelectedWords(newSelecteds);
      setSelected(newSelecteds);

      return;
    }
    props.setSelectedWords([]);
    setSelected([]);
  };

  const handleClick = (event, number) => {
    const selectedIndex = selected.indexOf(number);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, number);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    props.setSelectedWords(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (number) => selected.indexOf(number) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const remove = (arr, ids) => {
    ids.map((els, index) => {
      arr.map((el, i) => {
        if (el.id === els) {
          arr.splice(i, 1);
        }
      });
    });
    return arr;
  };
  const hendleDelete = () => {
    const wordsUrl = `${URL.base + URL.api + URL.words}`;
    const lw = props.learningWords;
    deleteData(wordsUrl, "DELETE", { ids: props.selectedWords }).then(
      (data) => {
        props.setLearningWords(remove(lw, props.selectedWords));
        setSelected([]);
        props.setSelectedWords([]);
        setOpen({ open: true });
      }
    );
  };
  const setEditableWords = (wordId) => {
    props.setselectedWord(wordId);
    setDialogC(true);
  };
  const Of = ({ from, to, count }) => {
    return `${from}-${to === -1 ? count : to} з ${count !== -1 ? count : to}`;
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          onClicked={hendleDelete}
          numSelected={selected.length}
        />
        <TableContainer>
          <MyTable
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.number);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.number}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.number)}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.number}
                      </TableCell>
                      <TableCell align="right">{row.en}</TableCell>
                      <TableCell align="right">{row.ua}</TableCell>
                      <TableCell align="right">{row.des}</TableCell>
                      <TableCell align="right">{row.group}</TableCell>
                      <TableCell align="right">
                        {row.image !== null ? (
                          <IMG
                            image={`${URL.base + URL.api + row.image}`}
                            title="Image title"
                          />
                        ) : (
                          <WordIcon>
                            <PhotoCameraIcon />
                            <NotInterestedIcon />
                          </WordIcon>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => setEditableWords(row.number)}
                        >
                          <Icon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MyTable>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Рядків на сторінку:"
          backIconButtonText="Попередня сторінка"
          nextIconButtonText="Наступна сторінка"
          onChangePage={handleChangePage}
          labelDisplayedRows={Of}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Успішне видалення!
        </Alert>
      </Snackbar>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Щільний показ"
      />
      <Dialog
        fullScreen={fullScreen}
        open={dialogC}
        onClose={handleCloseDialogC}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <EditWord />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogC} color="primary" autoFocus>
            закрити
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleOpenDialog}
        endIcon={<Icon>Створити</Icon>}
      >
        Створити
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <CreateWord />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            закрити
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapState = (state) => {
  return {
    userData: state.userData,
    learningWords: state.learningWords,
    selectedWords: state.selectedWords,
    modalSignIn: state.modalSignIn,
  };
};

const mapDispatch = ({
  learningWords: { setLearningWords },
  selectedWords: { setSelectedWords },
  selectedWord: { setselectedWord },
}) => ({
  setLearningWords: (data) => setLearningWords(data),
  setSelectedWords: (data) => setSelectedWords(data),
  setselectedWord: (data) => setselectedWord(data),
});
export default connect(mapState, mapDispatch)(EnhancedTable);
