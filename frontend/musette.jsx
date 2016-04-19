var React = require('react');
var ReactDOM = require('react-dom');

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
