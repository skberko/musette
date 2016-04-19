var Dispatcher = require('../dispatcher/dispatcher.js');
var PokemonConstants = require('../constants/pokemonConstants.js');

var activityActions = {
  receiveAllPokemons: function (activities) {
    Dispatcher.dispatch({
      actionType: ActivityConstants.POKEMONS_RECEIVED,
      activities: activities
    });
  },

  receiveSinglePokemon: function (pokemon) {
    Dispatcher.dispatch({
      actionType: PokemonConstants.POKEMON_RECEIVED,
      pokemon: pokemon
    });
  }
}

module.exports = ActivityAction
