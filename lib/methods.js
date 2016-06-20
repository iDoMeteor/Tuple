Meteor.methods({

  tupleIncrementGlobalLifetimeFails: () => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalLifetimeFails();
  },

  tupleIncrementGlobalLifetimeTuples: () => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalLifetimeTuples();
  },

  tupleIncrementGameFails: (id) => {
    if (Meteor.isClient) return;
    Tuple.incrementGameFails(id);
  },

  tupleIncrementGameTuples: (id) => {
    if (Meteor.isClient) return;
    Tuple.incrementGameTuples(id);
  },

  tupleIncrementGlobalGamesFinished: () => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalGamesFinished();
  },

  tupleIncrementGlobalTimePlayed: (ms) => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalTimePlayed(ms);
  },

  tupleIncrementPlayerGamesFinished: () => {
    if (Meteor.isClient) return;
    Tuple.incrementPlayerGamesFinished();
  },

  tupleIncrementPlayerLifetimeFails: (gid, pid) => {
    if (Meteor.isClient) return;
    Tuple.incrementPlayerLifetimeFails(gid, pid);
  },

  tupleIncrementPlayerLifetimeTuples: (gid, pid) => {
    if (Meteor.isClient) return;
    Tuple.incrementPlayerLifetimeTuples(gid, pid);
  },

  tupleIncrementPlayerTimePlayed: (pid, ms) => {
    if (Meteor.isClient) return;
    Tuple.incrementPlayerTimePlayed(pid, ms);
  },

  tupleInstantiateGame: () => {
    try {
      let id = Tuple.instantiateGame();
      if (!id) throw new Meteor.Error(
        'method-failure',
        'Attempting to create new game failed.'
      );
      Tuple.incrementGlobalGameCount();
      return id;
    }
    catch (e) {
      return e;
    }
  },

  tupleSaveGameEndTime: (gid, stamp) => {
    if (Meteor.isClient) return;
    Tuple.saveScore(gid, stamp);
  },

  tupleSaveGameState: (id, state) => {
    if (Meteor.isClient) return;
    Tuple.saveGameState(id, state);
  },

  tupleSaveScore: (data) => {
    if (Meteor.isClient) return;
    Tuple.saveScore(data);
  },

  tupleUpdatePoints: (gid, pid, isTuple) => {
    if (Meteor.isClient) return;
    Tuple.updatePoints(gid, pid, isTuple);
  },

  tupleSaveSelectionSets: (set) => {
    if (Meteor.isClient) return;
    Tuple.saveSelectionSets(set);
  },

});
