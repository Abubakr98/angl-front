import React from "react";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";

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
export const mainListItems = (
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
          <ShoppingCartIcon className="listItems__icon" />
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
    <MyLink to="/admin-panel/words">
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon className="listItems__icon" />
        </ListItemIcon>
        <ListItemText primary="Слова" />
      </ListItem>
    </MyLink>
    <MyLink to="/admin-panel/groups">
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon className="listItems__icon" />
        </ListItemIcon>
        <ListItemText primary="Групи" />
      </ListItem>
    </MyLink>
  </div>
);
