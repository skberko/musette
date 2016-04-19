// var ApiActions = require('../actions/activityActions.js');

var ApiUtil = {
  fetchAllActivities: function () {
    $.ajax({
      url: "api/activities",
      success: function (activities) {
        ApiActions.receiveAllActivities(activities);
      }
    })
  }

  // fetchSinglePokemon: function (id) {
  //   $.ajax({
  //     url: "api/pokemon/" + id,
  //     success: function (pokemon) {
  //       ApiActions.receiveSinglePokemon(pokemon);
  //     }
  //   })
  // },
  //
  // createPokemon: function (pokemon, callback) {
  //   $.ajax({
  //     url: "api/pokemon",
  //     method: "POST",
  //     data: {pokemon: pokemon},
  //     success: function (pokemon) {
  //       ApiActions.receiveSinglePokemon(pokemon);
  //       callback && callback(pokemon.id);
  //     }
  //   })
  // }
}

module.exports = ApiUtil;

window.ApiUtil = ApiUtil;
