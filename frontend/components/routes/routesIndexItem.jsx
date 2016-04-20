var React = require('react');

var RoutesIndexItem = React.createClass({

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
