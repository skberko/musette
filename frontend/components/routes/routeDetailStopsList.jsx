var React = require('react');
var PlaceStore = require('../../stores/placeStore.js');
var RouteDetailStopsListGroup = require('./routeDetailStopsListGroup.jsx');

var RouteDetailStopsList = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  _onChange: function () {
    this.setState({ places: PlaceStore.all() });
  },

  componentDidMount: function () {
    this.placeListener = PlaceStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.recipeListener.remove();
  },

  // not rendering the stopslistgroups: why not?
  render: function () {
    return(
      <div>
        <h4>Stops for {this.props.routeDetail.route.name}</h4>
        <ul>{this.state.places.map(function (stopGroup) {
            return(<RouteDetailStopsListGroup
                  key={stopGroup.stopGroupId}
                  stopGroupId={stopGroup.stopGroupId}
                  distance={stopGroup.distanceIntoRoute}
                  places={stopGroup.places}/>);
        })}</ul>
      </div>
    );
  }
})

module.exports = RouteDetailStopsList;
