var React = require('react');
var History = require('react-router').History;
var RouteStore = require('../../stores/routeStore.js');
var ApiUtil = require('../../util/apiUtil.js');
var RoutesIndexItem = require('./routesIndexItem.jsx');
var ReactRouter = require('react-router');
var Table = require("react-bootstrap").Table;

var RoutesIndex = React.createClass({
  mixins: [History],

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

  showDetail: function (routeId) {
    this.history.pushState(null, '/routes/' + routeId, {});
  },

  convertMetersToRoundedMiles: function (distanceInMeters) {
    return Math.round(Number(distanceInMeters) / 1609.344 * 10) / 10
  },

  render: function () {

    if (this.state.routes.length === 0) {
      return(<div/>);
    }

    var rows = this.state.routes.map(function (route, index) {

      return (<tr
                key={route.id}
                onClick={this.showDetail.bind(this, route.id)}
              >
                <td>{route.name}</td>
                <td>{this.convertMetersToRoundedMiles(route.distance)}</td>
              </tr>
      );
    }.bind(this));

    return(
      <div>
        <h3>Choose one of your Strava routes</h3>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Route</th>
              <th>Distance (miles)</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    );
  }
});

// <ul>
//   {this.state.routes.map(function (route) {
//     return <RoutesIndexItem key={route.id} route={route} />;
//   })}
// </ul>

module.exports = RoutesIndex;
