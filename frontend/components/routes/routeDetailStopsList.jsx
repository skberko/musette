var React = require('react');
var PlaceStore = require('../../stores/placeStore.js');
var Tabs = require("react-bootstrap").Tabs;
var Tab = require("react-bootstrap").Tab;
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

  render: function () {

    var tabs = this.state.places.map(function (stopGroup, index) {
      var titleNumber = index + 1

      return (<Tab
                key={index}
                title={'Stop #' + titleNumber}
                eventKey={index}
              >
                <RouteDetailStopsListGroup
                  stopGroup={stopGroup}
                  />
              </Tab>
      );
    });

    return (
      <div>
        <h4>Stops for {this.props.routeDetail.route.name}</h4>
        <Tabs id="stop-group-tabs">
          {this.props.children}
          {tabs}
        </Tabs>
      </div>
    );

  }

})

module.exports = RouteDetailStopsList;
