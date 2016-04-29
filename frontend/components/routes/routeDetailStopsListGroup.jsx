var React = require('react');
var RouteDetailStopsListGroupItem = require('./routeDetailStopsListGroupItem.jsx')

var RouteDetailStopsListGroup = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  render: function () {
    if (this.props.places.length === 0) {
      return(
        <li>
          <h5>Stop #{this.props.stopGroupId + 1}:</h5>
          <div>Sorry, there do not appear to be any stopping points here.</div>
        </li>
      )
    }

    return(
      <li>
        <h5>Stop #{this.props.stopGroupId + 1}:</h5>
          <ul>{this.props.places.map(function (stopGroupPlace) {
              return(<RouteDetailStopsListGroupItem
                    key={stopGroupPlace.id}
                    name={stopGroupPlace.name}
                    location={stopGroupPlace.geometry.location}
                    lat={stopGroupPlace.geometry.location.lat()}
                    lng={stopGroupPlace.geometry.location.lng()}
                    types={stopGroupPlace.types}
                    vicinity={stopGroupPlace.stopGroupId}
                    rating={stopGroupPlace.rating}/>);
              })}
          </ul>
      </li>
    );
  }
})

module.exports = RouteDetailStopsListGroup;
