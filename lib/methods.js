Meteor.methods({

  tupleIncrementGlobalLifetimeFails: () => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalLifetimeFails();
  },

  tupleIncrementPlayerGameFails: (playerId) => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalLifetimeFails(playerId);
  },

  tupleIncrementPlayerLifetimeFails: (playerId) => {
    if (Meteor.isClient) return;
    Tuple.incrementGlobalLifetimeFails(playerId);
  },

  tupleIncrementGlobalLifetimeTuples: () => {
    Lifetime.upsert({
      item: 'tuples'
    }, {
      $inc: {count: 1}
    });
  },

  tupleIncrementPlayerGameTuples: (playerId) => {
    Tuple.incrementGlobalLifetimeTuples(playerId);
  },

  tupleIncrementPlayerLifetimeTuples: (playerId) => {
    Tuple.incrementGlobalLifetimeTuples(playerId);
  },


})
