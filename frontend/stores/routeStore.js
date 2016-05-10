var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var RouteConstants = require('../constants/routeConstants.js');
var RouteStore = new Store(Dispatcher);

var _routes = {};

var resetRoutes = function (routes) {
  _routes = {};
  routes.forEach(function (route) {
    _routes[route.id] = route;
  });
};

var resetRoute = function (route) {
  _routes[route.id] = route;
};

RouteStore.all = function () {
  var routes = [];
  for (var id in _routes) {
    routes.push(_routes[id]);
  }
  return routes;
}

RouteStore.find = function (id) {
  return _routes[id];
}

RouteStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case RouteConstants.ROUTES_RECEIVED:
      resetRoutes(payload.routes);
      RouteStore.__emitChange();
      break;

  }
}

module.exports = RouteStore;
