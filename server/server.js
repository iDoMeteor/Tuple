Accounts.onCreateUser(function (options, user) {

  let player = {};
  if (0 == Meteor.users.find().count()) {
    user.admin = true;
    player.admin = true;
  }
  if (user && user.emails && user.emails[0].address) {
    let x = user.emails[0].address.indexOf('@');
    player.email = user.emails[0].address;
    player.name = user.emails[0].address.substr(0,x);
  }
  if (user && user.username) {
    player.name = user.username;
    player.username = user.username;
  }
  player.games = [];
  player.lifetime = {};
  player.lifetime.fails = 0;
  player.lifetime.points = 0;
  player.lifetime.tuples = 0;
  player.numGames = 0;
  player.selections = [];
  player.uid = user._id;
  Players.insert(player);
  return user;

});

Meteor.startup(() => {
  if (!Cards.find().count()) {
    console.log('Tuple: Generating initial deck');
    Tuple.insertDeck(Tuple.newDeck());
  }
  if (!Config.find({item: 'points'}).count()) {
    console.log('Tuple: Generating initial point values');
    Config.insert({item: 'points', points: {tuple: 5, fail: 2}});
  }
});

Object.assign(Tuple, {

  incrementGameFails: (id) => {
    Games.upsert(id, {$inc: {fails: 1}});
  },

  incrementGameTuples: (id) => {
    Games.upsert(id, {$inc: {tuples: 1}});
  },

  incrementGlobalGameCount: () => {
    Lifetime.upsert({
      item: 'games'
    }, {
      $inc: {count: 1}
    });
  },

  incrementGlobalGamesFinished: () => {
    Lifetime.upsert({
      item: 'finished'
    }, {
      $inc: {count: 1}
    });
  },

  incrementGlobalLifetimeFails: () => {
    Lifetime.upsert({
      item: 'fails'
    }, {
      $inc: {count: 1}
    });
  },

  incrementGlobalLifetimePoints: (points) => {
    Lifetime.upsert({
      item: 'tuples'
    }, {
      $inc: {count: points}
    });
  },

  incrementGlobalTimePlayed: (ms) => {
    Lifetime.upsert({
      item: 'time'
    }, {
      $inc: {count: ms}
    });
  },

  incrementGlobalLifetimeTuples: () => {
    Lifetime.upsert({
      item: 'tuples'
    }, {
      $inc: {count: 1}
    });
  },

  incrementPlayerGameCount: (id) => {
    id = id || Meteor.userId();
    id = Players.findOne({uid: id})._id;
    Players.upsert({
      _id: id
    }, {
      $inc: {numGames: 1}
    });
  },

  incrementPlayerGamesFinished: (id) => {
    id = id || Meteor.userId();
    id = Players.findOne({uid: id})._id;
    Players.upsert({
      _id: id
    }, {
      $inc: {finished: 1}
    });
  },

  incrementPlayerLifetimeFails: (id) => {
    id = id || Meteor.userId();
    Players.upsert({
      uid: id
    }, {
      $inc: {'lifetime.fails': 1}
    });
  },

  incrementPlayerLifetimePoints: (id) => {
    id = id || Meteor.userId();
    Players.upsert({
      uid: id
    }, {
      $inc: {'lifetime.points': 1}
    });
  },

  incrementPlayerLifetimeTuples: (id) => {
    id = id || Meteor.userId();
    Players.upsert({
      uid: id
    }, {
      $inc: {'lifetime.tuples': 1}
    });
  },

  incrementPlayerTimePlayed: (id, ms) => {
    Players.update(
      {uid: id},
      {$inc: {'lifetime.time': ms}}
    );
  },

  insertDeck: (cards) => {
    _.each(cards, (card) => {
      Cards.insert(card);
    });
  },

  saveGameEndTime: (id, stamp) => {
    Games.update(id, {$set: {'stamps.end': stamp}});
  },

  saveGameState: (id, state) => {
    Games.update(
      {_id: id},
      {$set: {state: state}}
    );
    Games.update(
      {_id: id},
      {$push: {timeline: state}}
    );
  },

  saveScore: (data) => {
    data = _.pick(data,
    'fails',
    'gid',
    'pid',
    'points',
    'time',
    'tuples');
    Scores.insert(data);
  },

  saveSelectionSets: (set) => {
    Games.update(set.gid, {$addToSet: {selections: set}});
    Players.update({uid: set.uid}, {$addToSet: {selections: set}});
    Lifetime.upsert({item: 'selections'}, {$addToSet: {selections: set}});
    Lifetime.upsert({item: 'selectionCount'}, {$inc: {selectionCount: 1}});
  },

  updateGamePoints: (id, amt) => {
    Games.update(
      {_id: id},
      {$inc: {points: amt}}
    );
  },

  updateLifetimePoints: (amt) => {
    Lifetime.upsert({item: 'points'}, {$inc: {total: amt}});
  },

  updatePlayerPoints: (id, amt) => {
    Players.update(
      {uid: id},
      {$inc: {'lifetime.points': amt}}
    );
  },

  updatePoints: (gid, pid, isTuple) => {
    let amt = (isTuple) ?
      Config.findOne({item: 'points'}).points.tuple :
      Config.findOne({item: 'points'}).points.fail * -1;
    Tuple.updateGamePoints(gid, amt);
    Tuple.updateLifetimePoints(amt);
    Tuple.updatePlayerPoints(pid, amt);
  },

});
