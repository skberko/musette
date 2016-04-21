var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var RouteConstants = require('../constants/routeConstants.js');
var RouteDetailStore = new Store(Dispatcher);

var routeDetail = {route: {name: ""}};

// var resetRoutes = function (routes) {
//   _routes = {};
//   routes.forEach(function (route) {
//     _routes[route.id] = route;
//   });
// };

var resetRouteDetail = function (newRouteDetail) {
  routeDetail = newRouteDetail;
};

RouteDetailStore.grabRouteDetail = function () {
  return routeDetail;
}

RouteDetailStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case RouteConstants.ROUTE_DETAIL_RECEIVED:
      console.log("routeDetailStore is being hit")
      resetRouteDetail(payload.routeDetail);
      RouteDetailStore.__emitChange();
      break;
  }
}

module.exports = RouteDetailStore;

// For console testing purposes only;
// to be removed before app goes into production:
window.RouteDetailStore = RouteDetailStore
