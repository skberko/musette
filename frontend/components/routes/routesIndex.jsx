var React = require('react');
var RouteStore = require('../../stores/routeStore.js');
var ApiUtil = require('../../util/apiUtil.js');
var RoutesIndexItem = require('./routesIndexItem.jsx');
var ReactRouter = require('react-router');


var RoutesIndex = React.createClass({
  getInitialState: function () {
    return { routes: RouteStore.all() };
  },

  _onChange: function () {
    this.setState({ routes: RouteStore.all() });
  },

  componentDidMount: function () {
    this.routeListener = RouteStore.addListener(this._onChange);
    ApiUtil.fetchAllRoutes();
  },

  compomentWillUnmount: function () {
    this.routeListener.remove();
  },

  render: function () {
    return(
      <div>
        RoutesIndex React Component:
        <ul>
          {this.state.routes.map(function (route) {
            return <RoutesIndexItem key={route.id} route={route} />;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = RoutesIndex;

// render: function () {
//   return(
//     <div>{this.state.routes.length}</div>
//   );
// }
