// var SessionActions = require('../actions/sessionActions.js');


var SessionUtil = {

  destroySession: function () {
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        window.location = "/session/new";
      }
    })
  }

}

module.exports = SessionUtil;

// For console testing purposes only;
// to be removed before app goes into production:
window.SessionUtil = SessionUtil;
