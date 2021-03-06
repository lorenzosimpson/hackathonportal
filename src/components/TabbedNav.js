import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
function TabbedNav(props) {
    return (
        <Nav tabs>
        <NavItem>
          <NavLink tag={RouterNavLink} exact to="/profile" >Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/profile/settings">Settings</NavLink>
        </NavItem>
      </Nav>
    );
}

export default TabbedNav;