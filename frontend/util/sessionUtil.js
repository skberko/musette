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
