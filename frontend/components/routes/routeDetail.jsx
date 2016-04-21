var React = require('react');
var RouteDetailStore = require('../../stores/routeDetailStore.js');
var RouteMap = require('./routeMap.jsx');
var RouteForm = require('./routeForm.jsx');
var RouteStopsList = require('./routeStopsList.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var RouteDetail = React.createClass({
  getInitialState: function () {
    // RouteDetailStore.grabRouteDetail() is currently returning nothing, so
    // the RouteDetailStore must be empty
    return { routeDetail: RouteDetailStore.grabRouteDetail() };
  },

  // will this result in unnecessary additional api call upon minor changes
  // to the RouteDetail component? something to think about
  _onChange: function () {
    console.log("change is logged!")
    this.setState({ routeDetail: RouteDetailStore.grabRouteDetail() });
  },

  componentDidMount: function () {
    this.routeDetailListener = RouteDetailStore.addListener(this._onChange);
    var routeId = this.props.params.routeId
    ApiUtil.fetchRouteDetail(routeId);
  },

  compomentWillUnmount: function () {
    this.routeDetailListener.remove();
  },

  render: function () {
    console.log(this.state.routeDetail)
    return (
      <div>
        This route is named: {this.state.routeDetail.route.name}
      </div>);
  }
})


module.exports = RouteDetail
