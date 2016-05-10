var RouteActions = require('../actions/routeActions.js');


var ApiUtil = {

  fetchAllRoutes: function () {
    $.ajax({
      url: "api/routes",
      success: function (routes) {
        RouteActions.receiveAllRoutes(routes);
      }
    })
  },

  fetchRouteDetail: function (id) {
    $.ajax({
      url: "api/routes/" + id,
      success: function (routeDetail) {
        RouteActions.receiveRouteDetail(routeDetail)
      }
    })
  }
}

module.exports = ApiUtil;
