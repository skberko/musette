var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Dispatcher = require('./dispatcher/dispatcher')
var RoutesIndex = require('./components/routes/routesIndex.jsx');

var Musette = React.createClass({
  render: function () {
    return(
      <div>
        ¡This is the musette.jsx entry point!
        <RoutesIndex />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Musette />, document.getElementById('root'));
});
