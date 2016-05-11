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
    return { routes: 'initial' };
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

    if (this.state.routes === 'initial') {
      return(<div/>);
    }

    if (this.state.routes.length === 0) {
      return(
        <div>
          <p>
            You don&#39;t have any Strava routes! How about clicking <a href="https://www.strava.com/routes">here</a> to create one?
          </p>
          <br/>
          <p>
            Too much effort? Create a route from an existing Strava activity <a href="https://support.strava.com/hc/en-us/articles/216942367-Create-a-new-Route-from-an-existing-Route-Duplicate-">like this</a>!
          </p>
        </div>
      );
    }

    var rows = this.state.routes.map(function (route, index) {

      return (<tr
                className="route-index-row"
                key={route.id}
                onClick={this.showDetail.bind(this, route.id)}
              >
                <td>{route.name}</td>
                <td>{this.convertMetersToRoundedMiles(route.distance)}</td>
              </tr>
      );
    }.bind(this));

    return(
      <div >
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

module.exports = RoutesIndex;
