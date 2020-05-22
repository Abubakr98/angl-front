import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { connect } from "react-redux";
import MainListItems from "./listItems";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function TemporaryDrawer(props) {
  const classes = useStyles();
  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.toggleDrawerse({ event, side, open });
  };

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <MainListItems />
      </List>
    </div>
  );

  const fullList = (side) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={props.sidePanel.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
      <Drawer
        anchor="bottom"
        open={props.sidePanel.bottom}
        onClose={toggleDrawer("bottom", false)}
      >
        {fullList("bottom")}
      </Drawer>
    </div>
  );
}
const mapState = (state) => {
  return {
    sidePanel: state.sidePanel,
  };
};

const mapDispatch = ({ sidePanel: { toggleDrawers } }) => ({
  toggleDrawerse: (data) => {
    toggleDrawers(data);
  },
});
export default connect(mapState, mapDispatch)(TemporaryDrawer);
