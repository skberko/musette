var React = require('react');
var Nouislider = require('react-nouislider');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var RouteDetailForm = React.createClass({
  getInitialState: function () {
    return {
      desiredStopCount: 5,
      offRouteTolerance: ''
    };
  },

  // eventually use slider for stop count, radius tolerance, details here:
  // http://refreshless.com/nouislider/slider-read-write/
  // https://github.com/therealzac/Crashmate/blob/master/Crashmate/frontend/components/filterBar.jsx
  //
  // or maybe this:
  // https://www.npmjs.com/package/react-slider

  render: function () {
    return(
      <div>
        <h4>Stops Preferences:</h4>
        <form>
          <label htmlFor="stop_count">Number of Stops:</label>
          <input type="range" name="stop_count" min="0" max="5"/>
          <label htmlFor="radius_tolerance">Radius Tolerance:</label>
          <input type="range" name="radius_tolerance" min="0.2" max="2" step="0.2"/>
        </form>
      </div>
    );
  }
})

module.exports = RouteDetailForm;
