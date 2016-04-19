var React = require('react');
var ActivityStore = require('../../stores/activityStore.js');
var ApiUtil = require('../../util/apiUtil.js');
// var ActivityIndexItem = require('./activityIndexItem.jsx');

var ActivitiesIndex = React.createClass({
  getInitialState: function () {
    return { activities: ActivityStore.all() };
  },

  _onChange: function () {
    this.setState({ activities: ActivityStore.all() });
  },

  componentDidMount: function () {
    this.activityListener = ActivityStore.addListener(this._onChange);
    ApiUtil.fetchAllActivities();
  },

  compomentWillUnmount: function () {
    this.activityListener.remove();
  },

  render: function () {
    return(
      <div>{this.state.activities.length}</div>
    );
  }
});

module.exports = ActivitiesIndex;


// render: function () {
//   return(
//     <ul>
//       {this.state.activities.map(function (activity) {
//         return <ActivityIndexItem key={activity.id} activity={activity} />;
//       })}
//     </ul>
//   );
// }
