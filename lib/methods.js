Meteor.methods({

  tupleIncrementGlobalLifetimeFails: () => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalLifetimeFails();
  },

  tupleIncrementGlobalLifetimeTuples: () => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalLifetimeTuples();
  },

  tupleIncrementPlayerGameFails: (pid) => {
    if (Meteor.isClient) return;
    Tuple.incrementPlayerGameFails(pid);
  },

  tupleIncrementPlayerGameTuples: (gid, pid) => {
    if (Meteor.isClient) return;
    Tuple.incrementPlayerGameTuples(gid, pid);
  },

  tupleIncrementPlayerLifetimeFails: (gid, pid) => {
    if (Meteor.isClient) return;
    Tuple.incrementPlayerLifetimeFails(gid, pid);
  },

  tupleIncrementPlayerLifetimeTuples: (gid, pid) => {
    if (Meteor.isClient) return;
    Tuple.incrementPlayerLifetimeTuples(gid, pid);
  },

  tupleNewGame: () => {
    try {
      let id = Tuple.newGame();
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

  tupleSetGameState: (id, state) => {
    if (Meteor.isClient) return;
    Tuple.setGameState(id, state);
  },

});
