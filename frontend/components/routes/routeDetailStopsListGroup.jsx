var React = require('react');

// delete once tables complete
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
// delete once tables complete

var Table = require("react-bootstrap").Table;

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

      return (<tr key={stopGroupPlace.id}>
                <td>{stopGroupPlace.name}</td>
                <td>{stopGroupPlace.vicinity}</td>
                <td>{businessTypes}</td>
              </tr>
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
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Type of Business</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    )
  }
})

module.exports = RouteDetailStopsListGroup;
