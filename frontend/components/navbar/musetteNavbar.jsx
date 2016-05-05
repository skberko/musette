var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var SessionUtil = require('../../util/sessionUtil.js');
var Navbar = require("react-bootstrap").Navbar;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;


var MusetteNavbar = React.createClass({

  logout: function () {
    // debugger;
    SessionUtil.destroySession();
  },

  render: function () {
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Musette</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} onClick={this.logout}>Sign Out</NavItem>
        </Nav>
      </Navbar>
    )
  }

});

module.exports = MusetteNavbar;
