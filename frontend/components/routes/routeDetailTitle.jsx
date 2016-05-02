var React = require('react');

var RouteDetailTitle = React.createClass({

  render: function () {
    var distanceInMeters = this.props.route.distance;
    var distanceInMiles = Math.round(Number(distanceInMeters) / 1609.344 * 10) / 10;

    var elevationInMeters = this.props.route.elevation_gain;
    var elevationInFeet = Math.round(Number(elevationInMeters) * 3.28084);

    return(
      <div className="route-title">
        <h3>
          Route: {this.props.route.name}
        </h3>

        <p>
          <span className="route-title-stat-name">
            Distance:&nbsp;
          </span>
          {distanceInMiles} miles&nbsp;&nbsp;
          <span className="route-title-stat-name">
            Elevation Gain:&nbsp;
          </span>
          {elevationInFeet} feet
        </p>
      </div>
    );
  }
})

module.exports = RouteDetailTitle;

// this.props.route.distance
// this.props.route.elevation_gain
