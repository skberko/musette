var React = require('react');
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
// Col can be removed here?
var Col = require("react-bootstrap").Col;
var RouteDetailStopsListGroupItem = require('./routeDetailStopsListGroupItem.jsx')

var RouteDetailStopsListGroup = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  convertMetersToRoundedMiles: function (distanceInMeters) {
    return Math.round(Number(distanceInMeters) / 1609.344 * 10) / 10
  },

  render: function () {
    var distanceInMiles =
      this.convertMetersToRoundedMiles(this.props.stopGroup.distanceIntoRoute);

    var rows = this.props.stopGroup.places.map(function (stopGroupPlace) {
      return (<Row key={stopGroupPlace.id} className="show-grid">
                Details for place: {stopGroupPlace.name}
              </Row>
      );
    });


    if (this.props.stopGroup.places.length === 0) {
      return(
        <div>This stop is at mile: {distanceInMiles}<br/>
          Sorry, there do not appear to be any stopping points here.
        </div>
      )
    }

    return(
      <div>
        <h6>This stop is at mile: {distanceInMiles}</h6>
        <Grid>
          {rows}
        </Grid>
      </div>
    )
  }
})

module.exports = RouteDetailStopsListGroup;
