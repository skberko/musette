var Dispatcher = require('flux').Dispatcher;
module.exports = new Dispatcher();

// For console testing purposes only;
// to be removed before app goes into production:
window.Dispatcher = new Dispatcher();
