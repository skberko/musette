var Dispatcher = require('../dispatcher/dispatcher.js');
var RouteConstants = require('../constants/routeConstants.js');

var RouteActions = {
  receiveAllRoutes: function (routes) {
    Dispatcher.dispatch({
      actionType: RouteConstants.ROUTES_RECEIVED,
      routes: routes
    });
  },

  receiveRouteDetail: function (routeDetail) {
    Dispatcher.dispatch({
      actionType: RouteConstants.ROUTE_DETAIL_RECEIVED,
      routeDetail: routeDetail
    });
  }
}

module.exports = RouteActions;
window.RouteActions = RouteActions;
