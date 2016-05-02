var React = require('react');

var RouteDetailTitle = React.createClass({

  render: function () {
    return(
      <h3 className="route-title">
        Route: {this.props.routeName}
      </h3>
    );
  }
})

module.exports = RouteDetailTitle;
