var React = require('react');
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;

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
      var businessTypes = stopGroupPlace.types.join([separator = ', '])

      return (<Row key={stopGroupPlace.id} className="show-grid">
                <Col xs={4} md={4}>{stopGroupPlace.name}</Col>
                <Col xs={4} md={4}>{stopGroupPlace.vicinity}</Col>
                <Col xs={4} md={4}>{businessTypes}</Col>
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
        <h5>This stop is at mile: {distanceInMiles}</h5>
        <Grid className="search-results-grid">
          <Row className="column-titles">
            <Col xs={4} md={4}>Name</Col>
            <Col xs={4} md={4}>Address</Col>
            <Col xs={4} md={4}>Type of Business</Col>
          </Row>
          {rows}
        </Grid>
      </div>
    )
  }
})

module.exports = RouteDetailStopsListGroup;
