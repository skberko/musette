var React = require('react');
var PlaceStore = require('../../stores/placeStore.js');
var Tabs = require("react-bootstrap").Tabs;
var Tab = require("react-bootstrap").Tab;
var RouteDetailStopsListGroup = require('./routeDetailStopsListGroup.jsx');
var PlaceGroupIdxUtil = require('../../util/placeGroupIdxUtil.js');

var RouteDetailStopsList = React.createClass({
  getInitialState: function () {
    return {
      places: undefined,
      activeKey: undefined
    };
  },

  _onChange: function () {
    this.setState({ places: PlaceStore.all(), activeKey: 0 });
  },

  componentDidMount: function () {
    this.placeListener = PlaceStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.placeListener.remove();
  },

  handleTabClick: function (activeTabKey) {
    this.setState({ activeKey: activeTabKey });
    PlaceGroupIdxUtil.fetchPlaceGroupIdx(activeTabKey);
  },

  render: function () {

    if (this.state.places === undefined) { return <div/>; }

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
          onSelect={this.handleTabClick}
          activeKey={this.state.activeKey}>
          {tabs}
        </Tabs>
      </div>
    );

  }

})

module.exports = RouteDetailStopsList;
