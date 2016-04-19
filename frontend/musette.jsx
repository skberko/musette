var React = require('react');
var ReactDOM = require('react-dom');
var ApiUtil = require('./util/apiUtil') // can be removed once flux cycle is in place
var Dispatcher = require('./dispatcher/dispatcher')

var Musette = React.createClass({
  render: function () {
    return(
      <div>Hello, String!</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Musette />, document.getElementById('root'));
});
