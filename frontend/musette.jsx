var React = require('react');
var ReactDOM = require('react-dom');

var MyComponent = React.createClass({
  render: function () {
    return(
      <div>Hello, Musette!</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('root'));
});
