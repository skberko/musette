var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var RouteDetailForm = React.createClass({
  getInitialState: function () {
    return {
      desiredStopCount: '',
      offRouteTolerance: ''
    };
  },



  render: function () {
    return(
      <div>
        <h4>Stops Preferences:</h4>
        <form>
        </form>
      </div>
    );
  }
})

module.exports = RouteDetailForm;
