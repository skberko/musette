var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Dispatcher = require('./dispatcher/dispatcher')
var RoutesIndex = require('./components/routes/routesIndex.jsx');
var RouteDetail = require('./components/routes/routeDetail.jsx');


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

var routes = (
  <Route path="/" component={Musette}>
    <IndexRoute component={RoutesIndex}/>
    <Route path="routes/:routeId" component={RouteDetail}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});
