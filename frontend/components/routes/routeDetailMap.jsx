var React = require('react');

var routeDetailMap = React.createClass({
  render: function () {
    return(
      <div>I am the RouteDetailMap react component for {this.props.routeDetail.route.name}.</div>
    );
  }
})

module.exports = routeDetailMap;
