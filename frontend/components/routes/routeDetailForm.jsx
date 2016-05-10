var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var PlacesUtil = require('../../util/placesUtil.js');
var PlaceActions = require ('../../actions/placeActions.js');
var FormGroup = require("react-bootstrap").FormGroup;
var ControlLabel = require("react-bootstrap").ControlLabel;
var FormControl = require("react-bootstrap").FormControl;
var Button = require("react-bootstrap").Button;

var RouteDetailForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      desiredStopCount: 3,
      radiusTolerance: 2
    };
  },

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
      <div className="route-detail-form-container">
        <form onSubmit={this.handleSubmit}>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>How many stops would you like to make?</ControlLabel>
            <FormControl componentClass="select" placeholder="select" valueLink={this.linkState("desiredStopCount")}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>How many miles are you willing to go off-route to make a stop?</ControlLabel>
            <FormControl componentClass="select" placeholder="select" valueLink={this.linkState("radiusTolerance")}>
              <option value="0.5">Half a mile</option>
              <option value="1">1 mile</option>
              <option value="2">2 miles</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
            </FormControl>
          </FormGroup>

          <Button type="submit">
            Find Stops
          </Button>

        </form>

      </div>
    );
  }
})

module.exports = RouteDetailForm;
