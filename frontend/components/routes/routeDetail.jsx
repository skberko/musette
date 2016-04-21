var React = require('react');
var RouteDetailStore = require('../../stores/routeDetailStore.js');
var RouteDetailMap = require('./routeDetailMap.jsx');
var RouteDetailForm = require('./routeDetailForm.jsx');
var RouteDetailStopsList = require('./routeDetailStopsList.jsx');
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
    if (this.state.routeDetail === undefined) { return <div/>; }

    return (
      <div>
        <h2>Route: {this.state.routeDetail.route.name}</h2>
        <RouteDetailMap className="route-detail-map" ref="map" routeDetail = {this.state.routeDetail}/>
        <RouteDetailForm routeDetail = {this.state.routeDetail}/>
        <RouteDetailStopsList routeDetail = {this.state.routeDetail}/>
      </div>);
  }
})


module.exports = RouteDetail
