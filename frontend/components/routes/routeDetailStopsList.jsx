var React = require('react');
var PlaceStore = require('../../stores/placeStore.js');
var Tabs = require("react-bootstrap").Tabs;
var Tab = require("react-bootstrap").Tab;
var RouteDetailStopsListGroup = require('./routeDetailStopsListGroup.jsx');
var PlaceGroupIdxUtil = require('../../util/placeGroupIdxUtil.js');

var RouteDetailStopsList = React.createClass({
  getInitialState: function () {
    return {
      places: PlaceStore.all()
    };
  },

  _onChange: function () {
    this.setState({ places: PlaceStore.all() });
  },

  componentDidMount: function () {
    this.placeListener = PlaceStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.placeListener.remove();
  },

  handleTabClick: function (activeTabKey) {
    // console.log("tab key being sent to PlaceGroupIdxUtil: " + activeTabKey);
    PlaceGroupIdxUtil.fetchPlaceGroupIdx(activeTabKey);
  },

  render: function () {

    var tabs = this.state.places.map(function (stopGroup, index) {
      var titleNumber = index + 1

      return (<Tab
                key={index}
                title={'Stop #' + titleNumber}
                eventKey={index}>
                <RouteDetailStopsListGroup
                  stopGroup={stopGroup}/>
              </Tab>
      );
    });

    return (
      <div>
        <Tabs id="stop-group-tabs"
          onSelect={this.handleTabClick}>
          {tabs}
        </Tabs>
      </div>
    );

  }

})

module.exports = RouteDetailStopsList;
