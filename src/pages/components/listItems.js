import React from "react";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Divider from "@material-ui/core/Divider";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Admin from "@material-ui/icons/VerifiedUser";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MainColor = "#303F9F";

const MyLink = styled(Link)`
  color: #000;
  &:hover {
    color: ${MainColor};
    .listItems__icon {
      color: ${MainColor};
    }
  }
`;
function mainListItems(props) {
  return (
    <div>
      <MyLink to="/">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon className="listItems__icon" />
          </ListItemIcon>
          <ListItemText primary="Головна" />
        </ListItem>
      </MyLink>
      <MyLink to="/sign-in">
        <ListItem button>
          <ListItemIcon>
            <ExitToApp className="listItems__icon" />
          </ListItemIcon>
          <ListItemText primary="Вхід" />
        </ListItem>
      </MyLink>
      <MyLink to="/sign-up">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon className="listItems__icon" />
          </ListItemIcon>
          <ListItemText primary="Реєстрація" />
        </ListItem>
      </MyLink>
      <Divider />
      {props.userData.role === "admin" ? (
        <>
          <MyLink to="/admin-panel/words">
            <ListItem button>
              <ListItemIcon>
                <Admin className="listItems__icon" />
              </ListItemIcon>
              <ListItemText primary="Слова" />
            </ListItem>
          </MyLink>
          <MyLink to="/admin-panel/groups">
            <ListItem button>
              <ListItemIcon>
                <Admin className="listItems__icon" />
              </ListItemIcon>
              <ListItemText primary="Групи" />
            </ListItem>
          </MyLink>
        </>
      ) : null}
    </div>
  );
}
const mapState = (state) => {
  return {
    userData: state.userData,
  };
};
export default connect(mapState)(mainListItems);
