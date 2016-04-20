var Dispatcher = require('../dispatcher/dispatcher.js');
var RouteConstants = require('../constants/routeConstants.js');

var RouteActions = {
  receiveAllRoutes: function (routes) {
    Dispatcher.dispatch({
      actionType: RouteConstants.ROUTES_RECEIVED,
      routes: routes
    });
  },

  receiveSingleRoute: function (route) {
    Dispatcher.dispatch({
      actionType: RouteConstants.ROUTE_RECEIVED,
      route: route
    });
  }
}

module.exports = RouteActions;
window.RouteActions = RouteActions;
