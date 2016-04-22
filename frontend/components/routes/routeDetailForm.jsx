var React = require('react');
var Nouislider = require('react-nouislider');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var PlacesUtil = require('../../util/placesUtil.js');

var RouteDetailForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      desiredStopCount: 5,
      radiusTolerance: ''
    };
  },

  // Strava's API and Google Places API handle distance in meters, but our
  // user will be passing in radiusTolerance distance in miles, so need to
  // convert before hitting
  convertMilesToMeters: function (distanceInMiles) {
    return Number(distanceInMiles) * 1609.344
  },

  handleSubmit: function (event) {
    event.preventDefault();
    // the following line in case stop count comes in as a string:
    var desiredStopCount = Number(this.state.desiredStopCount);
    var radiusToleranceMeters = this.convertMilesToMeters(this.state.radiusTolerance);
    var googlePlacesSearchParameters = {
      desiredStopCount: desiredStopCount,
      radiusTolerance: radiusToleranceMeters,
      routeTotalDistance: this.props.routeDetail.route.distance,
      routeLatLngPairs: this.props.routeDetail.route_stream[0].data,
      routeDistances: this.props.routeDetail.route_stream[1].data
    };
    PlacesUtil.searchForGooglePlaces(googlePlacesSearchParameters)
  },

  render: function () {
    return(
      <div>
        <h4>Stops Preferences:</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="stop_count">Number of Stops:</label>
          <input type="text" name="stop_count" valueLink={this.linkState("desiredStopCount")}/>
          <label htmlFor="stop_count">Radius Tolerance:</label>
          <input type="text" name="radius_tolerance" valueLink={this.linkState("radiusTolerance")}/>
          <input type="submit" value="Submit Preferences"/>
        </form>
      </div>
    );
  }
})

module.exports = RouteDetailForm;

// eventually use slider for stop count, radius tolerance, details here:
// http://refreshless.com/nouislider/slider-read-write/
// https://github.com/therealzac/Crashmate/blob/master/Crashmate/frontend/components/filterBar.jsx
//
// or maybe this:
// https://www.npmjs.com/package/react-slider
//
// HTML5 slider option:
// https://css-tricks.com/value-bubbles-for-range-inputs/
// <input type="range" name="stop_count" min="0" max="5"/>
// <label htmlFor="radius_tolerance">Radius Tolerance:</label>
// <input type="range" name="radius_tolerance" min="0.2" max="2" step="0.2"/>
