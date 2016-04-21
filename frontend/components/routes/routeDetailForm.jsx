var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var RouteDetailForm = React.createClass({
  render: function () {
    return(
      <div>I am the RouteDetailForm react component for {this.props.routeDetail.route.name}.</div>
    );
  }
})

module.exports = RouteDetailForm;
