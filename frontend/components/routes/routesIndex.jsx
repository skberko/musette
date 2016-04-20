var React = require('react');
var RouteStore = require('../../stores/routeStore.js');
var ApiUtil = require('../../util/apiUtil.js');
// var RouteIndexItem = require('./routeIndexItem.jsx');

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
      <div>{this.state.routes.length}</div>
    );
  }
});

module.exports = RoutesIndex;


// render: function () {
//   return(
//     <ul>
//       {this.state.activities.map(function (activity) {
//         return <ActivityIndexItem key={activity.id} activity={activity} />;
//       })}
//     </ul>
//   );
// }
