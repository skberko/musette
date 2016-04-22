var Dispatcher = require('../dispatcher/dispatcher.js');
var RouteConstants = require('../constants/placeConstants.js');

var PlaceActions = {
  // receiveAllRoutes: function (routes) {
  //   Dispatcher.dispatch({
  //     actionType: RouteConstants.ROUTES_RECEIVED,
  //     routes: routes
  //   });
  // },
  //
  // receiveRouteDetail: function (routeDetail) {
  //   Dispatcher.dispatch({
  //     actionType: RouteConstants.ROUTE_DETAIL_RECEIVED,
  //     routeDetail: routeDetail
  //   });
  // }
}

module.exports = PlaceActions;
window.RouteActions = PlaceActions;
