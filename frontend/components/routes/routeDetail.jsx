var React = require('react');
var RouteDetailStore = require('../../stores/routeDetailStore.js');
var ApiUtil = require('../../util/apiUtil.js');
var RouteDetailTitle = require('./routeDetailTitle.jsx');
var RouteDetailMap = require('./routeDetailMap.jsx');
var RouteDetailForm = require('./routeDetailForm.jsx');
var RouteDetailStopsList = require('./routeDetailStopsList.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;

var RouteDetail = React.createClass({
  // Hack-y solution: set initial this.state.routeDetail = undefined to avoid
  // picking up previous rendered RouteDetail component's map and info;
  // There are still the old RouteDetail's stops, however, so hack those away.
  getInitialState: function () {
    return { routeDetail: undefined };
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
      <Grid>
        <Row>
          <Col md={12}>
            <RouteDetailTitle route={this.state.routeDetail.route}/>
          </Col>
        </Row>

        <Row className="route-detail-mapform-row">
          <Col xs={3} md={3}>
            <RouteDetailForm routeDetail = {this.state.routeDetail}/>
          </Col>
          <Col xs={9} md={9}>
            <RouteDetailMap routeDetail = {this.state.routeDetail}/>
          </Col>

        </Row>

        <Row>
          <Col md={10} mdOffset={1}>
            <RouteDetailStopsList routeDetail = {this.state.routeDetail}/>
          </Col>
        </Row>
      </Grid>);
  }
})


module.exports = RouteDetail
