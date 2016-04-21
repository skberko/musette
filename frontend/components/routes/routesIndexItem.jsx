var React = require('react');
var History = require('react-router').History;


var RoutesIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {};
  },

  showDetail: function () {
    this.history.pushState(null, '/routes/' + this.props.route.id, {});
  },

  render: function () {
    return(
      <li onClick={this.showDetail}>
        {this.props.route.name}
      </li>
    )
  }

})

module.exports = RoutesIndexItem;
