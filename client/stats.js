Template.statsGame.helpers({

  available: () => {
    const deck = Session.get('deck');
    if (deck && Session.get('cheater')) {
      const result = Tuple.numTuples(deck);
      return result[0] + '/' + result[1];
    } else {
      return 'N/A';
    }
  },

  cheat: () => {
    return Session.get('cheater');
  },

  deck: () => {
    const table = Session.get('deck') || [];
    const deck = Session.get('master') || [];
    return table.length + '/' + deck.length;
  },

  fails: () => {
    if (!Session.get('game')) return 0;
    const id = Session.get('game')._id;
    return Tuple.getGameFails(id);
  },

  points: () => {
    if (!Session.get('game')) return 0;
    const id = Session.get('game')._id;
    return Tuple.getGamePoints(id);
  },

  time: () => {
    Session.set('gameTime', 0);
    const game = Session.get('game');
    if (!game) return Tuple.msToTime(0);
    const id = game._id;
    const ms = Tuple.getGameTime(id);
    Session.set('gameTime', ms);
    Meteor.setInterval(() => {
      Session.set('gameTime', Session.get('gameTime') + 1000);
    }, 1000);
    return Tuple.msToTime(Session.get('gameTime'));
  },

  tuples: () => {
    if (!Session.get('game')) return 0;
    const id = Session.get('game')._id;
    return Tuple.getGameTuples(id);
  },

});


Template.statsGame.onCreated(function () {

  this.subscribe('game');

});


Template.statsLifetime.helpers({

  fails: function () {
    return Tuple.getGlobalLifetimeFails();
  },

  games: function () {
    return Tuple.getGlobalLifetimeGames();
  },

  finished: function () {
    return Tuple.getGlobalLifetimeGamesFinished();
  },

  points: () => {
    return Tuple.getGlobalLifetimePoints();
  },

  time: function () {
    return Tuple.msToTime(Tuple.getGlobalTimePlayed());
  },

  tuples: function () {
    return Tuple.getGlobalLifetimeTuples();
  },

});


Template.statsLifetime.onCreated(function () {

  this.subscribe('lifetime');

});


Template.statsPlayer.helpers({

  fails: function () {
    return Tuple.getPlayerLifetimeFails();
  },

  finished: function () {
    return Tuple.getPlayerGamesFinished();
  },

  name: function () {
    return Tuple.getPlayerName();
  },

  played: function () {
    return Tuple.getPlayerGamesPlayed();
  },

  points: () => {
    return Tuple.getPlayerLifetimePoints();
  },

  time: function () {
    return Tuple.msToTime(Tuple.getPlayerLifetimeTimePlayed());
  },

  tuples: function () {
    return Tuple.getPlayerLifetimeTuples();
  },

});


Template.statsPlayer.onCreated(function () {

  this.subscribe('player');

});
