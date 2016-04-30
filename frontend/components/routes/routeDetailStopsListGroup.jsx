var React = require('react');
// var Tab = require("react-bootstrap").Tab;
var RouteDetailStopsListGroupItem = require('./routeDetailStopsListGroupItem.jsx')

var RouteDetailStopsListGroup = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  render: function () {
    // if (this.props.places.length === 0) {
    //   return(
    //     <li>
    //       <h5>Stop #{this.props.stopGroupId + 1}:</h5>
    //       <div>Sorry, there do not appear to be any stopping points here.</div>
    //     </li>
    //   )
    // }
    // debugger
    if (this.props.stopGroup.places.length === 0) {
      return(
        <div>
          Sorry, there do not appear to be any stopping points here.
        </div>
      )
    }

    return(
      <div>
        {this.props.stopGroup.places.map(function (stopGroupPlace, index) {
          return(<RouteDetailStopsListGroupItem
                key={index}
                stopGroupPlace={stopGroupPlace}/>);
        })}
      </div>
    )

    // <h5>Stop #{this.props.stopGroup.stopGroupId + 1}:</h5>
    // <ul>{this.props.stopGroup.places.map(function (stopGroupPlace) {
    //   return(<RouteDetailStopsListGroupItem
    //         key={stopGroupPlace.id}
    //         name={stopGroupPlace.name}
    //         location={stopGroupPlace.geometry.location}
    //         lat={stopGroupPlace.geometry.location.lat()}
    //         lng={stopGroupPlace.geometry.location.lng()}
    //         types={stopGroupPlace.types}
    //         vicinity={stopGroupPlace.stopGroupId}
    //         rating={stopGroupPlace.rating}/>);
    //   })}
    // </ul>

    // return(
    //   <Tab>
    //     <h5>Stop #{this.props.stopGroupId + 1}:</h5>
    //       <ul>{this.props.places.map(function (stopGroupPlace) {
    //           return(<RouteDetailStopsListGroupItem
    //                 key={stopGroupPlace.id}
    //                 name={stopGroupPlace.name}
    //                 location={stopGroupPlace.geometry.location}
    //                 lat={stopGroupPlace.geometry.location.lat()}
    //                 lng={stopGroupPlace.geometry.location.lng()}
    //                 types={stopGroupPlace.types}
    //                 vicinity={stopGroupPlace.stopGroupId}
    //                 rating={stopGroupPlace.rating}/>);
    //           })}
    //       </ul>
    //   </Tab>
    // );
  }
})

module.exports = RouteDetailStopsListGroup;
