var React = require('react');
var History = require('react-router').History;


var RoutesIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {};
  },

  render: function () {
    return(
      <li>
        {this.props.route.name}
      </li>
    )
  }

})

module.exports = RoutesIndexItem;
