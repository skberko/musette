var React = require('react');
var RouteDetailStore = require('../../stores/routeDetailStore.js');
var RouteDetailMap = require('./routeDetailMap.jsx');
var RouteDetailForm = require('./routeDetailForm.jsx');
var RouteDetailStopsList = require('./routeDetailStopsList.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var RouteDetail = React.createClass({
  getInitialState: function () {
    return { routeDetail: RouteDetailStore.grabRouteDetail() };
  },

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
        <h3 className="route-title">Route: {this.state.routeDetail.route.name}</h3>
        <div className = "route-detail-map-form-container">
          <RouteDetailMap routeDetail = {this.state.routeDetail}/>
          <RouteDetailForm routeDetail = {this.state.routeDetail}/>
        </div>
        <RouteDetailStopsList routeDetail = {this.state.routeDetail}/>
        <br/>
        <br/>
      </div>);
  }
})


module.exports = RouteDetail
