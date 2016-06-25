import Shuffle from 'shuffle';
Tuple = {

  getAllCards: () => {
    return Cards.find().fetch();
  },

  getCard: (id) => {
    return Cards.findOne({_id: id});
  },

  getGameFails: (id) => {
    if (!id) return;
    const fails = Games.findOne(id, {fields: {fails: 1}}) || {fails: 0};
    return fails.fails;
  },

  getGamePoints: (id) => {
    if (!id) return;
    const points = Games.findOne(id, {fields: {points: 1}}) || {points: 0};
    return points.points;
  },

  getGameTime: (id, isComplete) => {
    if (!id) return 0;
    const start = Games.findOne({
      _id: id,
      'stamps.start': {$exists: true}
    }, {
      fields: {'stamps.start': 1}
    }) || {stamps: {start: new Date()}};
    let end = {};
    if (isComplete) {
      end = Games.findOne({
        _id: id,
        'stamps.end': {$exists: true}
      }, {
        fields: {'stamps.end': 1}
      }) || {stamps: {end: new Date()}};
    } else {
      end = {stamps: {end: new Date()}};
    }
    return end.stamps.end - start.stamps.start;
  },

  getGameTuples: (id) => {
    if (!id) return;
    const tuples = Games.findOne(id, {fields: {tuples: 1}}) || {tuples: 0};
    return tuples.tuples;
  },

  getGlobalLifetimeFails: (id) => {
    const fails = Lifetime.findOne(
      {item: 'fails'},
      {fields: {count: 1}}
    ) || {count: 0};
    return fails.count;
  },

  getGlobalLifetimeGames: () => {
    const games = Lifetime.findOne(
      {item: 'games'},
      {fields: {count: 1}}
    ) || {count: 0};
    return games.count;
  },

  getGlobalLifetimeGamesFinished: () => {
    const games = Lifetime.findOne(
      {item: 'finished'},
      {fields: {count: 1}}
    ) || {count: 0};
    return games.count;
  },

  getGlobalLifetimePoints: () => {
    const points = Lifetime.findOne(
      {item: 'points'},
      {fields: {total: 1}}
    ) || {total: 0};
    return points.total;
  },

  getGlobalLifetimeTuples: () => {
    const tuples = Lifetime.findOne(
      {item: 'tuples'},
      {fields: {count: 1}}
    ) || {count: 0};
    return tuples.count;
  },

  getGlobalTimePlayed: () => {
    const time = Lifetime.findOne(
      {item: 'time'},
      {fields: {count: 1}}
    ) || {count: 0};
    return time.count;
  },

  getPath: (qty, shape) => {
    const shapes = {
      '1': {
        'diamond': ['M511.9 184l-100 200 100 200 100-200z'],
        'pill': ['M587 234c-.1 0 0-.2 0-.2 0-41.4-33.6-75-75-75s-75 33.6-75 75c0 .9.1 1.7.1 2.6v294.9c0 .9-.1 1.7-.1 2.6 0 41.4 33.6 75 75 75 41.3 0 74.9-33.8 75-74.8h.1V234z'],
        'wave': ['M627.7 234c-.1 0-.1-.2-.1-.2-5.5-41.4-75.2-75-116.7-75-41.4 0-38.8 33.6-33.3 75 .1.9.3 1.7.5 2.6 14.2 98.3-98.3 196.6-84.2 294.9.1.9.2 1.7.3 2.6 5.5 41.4 75.2 75 116.7 75 41.2 0 38.7-33.8 33.4-74.8h.1C527.5 434 644.2 334 627.7 234z'],
      },
      '2': {
        'diamond': [
          'm 375.36667,184 -100,200 100,200 100,-200z',
          'm 648.43333,184 -100,200 100,200 100,-200z',
        ],
        'pill': [
          'm 450.46667,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 723.53333,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
        ],
        'wave': [
          'm 491.16667,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
          'm 764.23333,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
        ],
      },
      '3': {
        'diamond': [
          'm 238.83334,184 -100,200 100,200 100,-200z',
          'm 511.9,184 -100,200 100,200 100,-200z',
          'm 784.96666,184 -100,200 100,200 100,-200z',
        ],
        'pill': [
          'm 313.93334,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 587,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 860.06665,234.00001 c -0.10001,0 0,-0.20002 0,-0.20002 0,-41.39998 -33.6,-74.99998 -75,-74.99998 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.69999 0.1,2.6 l 0,294.89999 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.29999,0 74.89999,-33.80001 75,-74.8 l 0.10001,0 0,-300.09999 z',
        ],
        'wave': [
          'm 354.63334,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
          'm 627.7,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 C 527.5,434 644.2,334 627.7,234 Z',
          'm 900.76666,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
        ],
      },
    }
    return shapes[qty][shape];
  },

  getPlayerLifetimeFails: (id) => {
    id = id || Meteor.userId();
    const fails = Players.findOne(
      {uid: id},
      {fields: {'lifetime.fails': 1}}
    ) || {lifetime: {fails: 0}};
    return fails.lifetime.fails;
  },

  getPlayerGamesFinished: (id) => {
    id = id || Meteor.userId() || 0;
    const games = Players.findOne(
      {uid: id, finished: {$exists: true}},
      {fields: {finished: 1}}
    ) || {finished: 0};
    return games.finished;
  },

  getPlayerGamesPlayed: (id) => {
    id = id || Meteor.userId() || 0;
    const games = Players.findOne(
      {uid: id},
      {fields: {numGames: 1}}
    ) || {numGames: 0};
    return games.numGames;
  },

  getPlayerLifetimePoints: (id) => {
    id = id || Meteor.userId();
    const points = Players.findOne(
      {uid: id},
      {fields: {'lifetime.points': 1}}
    ) || {lifetime: {points: 0}};
    return points.lifetime.points;
  },

  getPlayerLifetimeTimePlayed: (id) => {
    id = id || Meteor.userId();
    const time = Players.findOne(
      {uid: id},
      {fields: {'lifetime.time': 1}}
    ) || {lifetime: {time: 0}};
    return time.lifetime.time;
  },

  getPlayerLifetimeTuples: (id) => {
    id = id || Meteor.userId();
    const tuples = Players.findOne(
      {uid: id},
      {fields: {'lifetime.tuples': 1}}
    ) || {lifetime: {tuples: 0}};
    return tuples.lifetime.tuples;
  },

  getPlayerName: (id) => {
    id = id || Meteor.userId();
    const name = Players.findOne(
      {uid: id},
      {fields: {name: 1}}
    ) || {name: 'Your'};
    return name.name;
  },

  getPlayerTimePlayed: (id) => {
    return 0;
  },

  getPlayers: (ids) => {
    const players = [];
    _.each(ids, (value, key) => {
      players.push(
        Players.findOne({uid: value})
      );
    });
    return players;
  },

  hasMatch: (card1, card2) => {
    let hasMatch = false;
    const keys = Tuple.keys();
    _.each(keys, (key) => {
      if (card1[key] == card2[key]) {
        hasMatch = true;
      }
    });
    return hasMatch;
  },

  numMatches: (card1, card2) => {
    let i = 0;
    const keys = Tuple.keys();
    _.each(keys, (key) => {
      if (card1[key] == card2[key]) {
        i++;
      }
    });
    return i;
  },

  isTuple: (ids) => {
    if (!ids || (3 != ids.length)) return;
    const card1 = Tuple.getCard(ids[0]);
    const card2 = Tuple.getCard(ids[1]);
    const card3 = Tuple.getCard(ids[2]);
    const keys = Tuple.keys();
    const matchBox = {};
    let x = 0;
    _.each(keys, (key) => {
      if (card1[key] == card2[key]) {
        if (card1[key] == card3[key]) {
          matchBox[key] = true;
        } else {
          matchBox[key] = false;
        }
      } else if (card1[key] == card3[key]) {
        matchBox[key] = false;
      } else if (card2[key] == card3[key]) {
        matchBox[key] = false;
      } else {
        matchBox[key] = true
      }
    });
    _.each(keys, (key) => {
      if (matchBox[key]) x++;
    });
    return (4 == x);
  },

  keys: () => {
    return [
      'color',
      'fill',
      'quant',
      'shape',
    ];
  },

  newDeck: () => {
    const card = {};
    const cards = [];
    const colors = [ '#c0f5e9', '#e2c7f3', '#ffb6c1' ];
    const colorNames = [ 'cyan', 'green', 'salmon' ];
    const shapes = [ 'diamond', 'pill', 'wave' ];
    const quants = [ 1, 2, 3 ];
    const fills = [ 'red', 'blue', 'green' ];
    let i = 1;
    for (let c = 0; c < colors.length; c++) {
      for (let s = 0; s < shapes.length; s++) {
        for (let q = 0; q < quants.length; q++) {
          for (let f = 0; f < fills.length; f++) {
            cards.push({
              color: colors[c],
              shape: shapes[s],
              quant: quants[q],
              fill: fills[f],
              name: (1 == quants[q]) ?
                quants[q]+' '+colorNames[c]+' '+shapes[s]+' w/'+fills[f] :
                quants[q]+' '+colorNames[c]+' '+shapes[s]+'s w/'+fills[f] ,
              num: i,
              weight: 0,
            });
            i++;
          }
        }
      }
    }
    return cards;
  },

  instantiateGame: ({playerIDs:ids = []} = {}) => {
    const pid = Meteor.userId() || 0;
    const pids = [];
    const players = [];
    const game = {};
    if (!ids || (0 == ids.length)) {
      pids.push(Meteor.userId());
    }
    _.each(pids, (uid) => {
      Tuple.incrementPlayerGameCount(uid);
      players.push(Players.findOne(
        {uid: uid},
        {fields: {admin: 0, email: 0, games: 0, selections: 0}}
      ));
    });
    Object.assign(game, {
      fails: 0,
      numPlayers: players.length,
      players: players,
      points: 0,
      stamps: {
        start: new Date(),
      },
      state: {},
      selections: [],
      timeline: [],
      tuples: 0,
    });
    return Games.insert(game);
  },

  numTuples: (cards) => {
    const selections = []
    const zen = [cards, cards.slice(1), cards.slice(2)];
    let combinations = 0;
    let tuples = 0;
    _.each(cards, (a) => {
      selections[0] = a._id;
      _.each(zen[1], (b) => {
        selections[1] = b._id;
        _.each(zen[2], (c) => {
          selections[2] = c._id;
          combinations++;
          if (Tuple.isTuple(selections)) {
            tuples++;
          }
        });
        zen[2] = zen[2].slice(1);
      });
      zen[1] = zen[1].slice(1);
    });
    return [tuples, combinations];
  },

  msToTime: (duration) => {
    const seconds = parseInt((duration/1000)%60) || 0;
    const minutes = parseInt((duration/(1000*60))%60) || 0;
    const hours = parseInt((duration/(1000*60*60))%24) || 0;
    const h = (hours < 10) ? '0' + hours : hours;
    const m = (minutes < 10) ? '0' + minutes : minutes;
    const s = (seconds < 10) ? '0' + seconds : seconds;
    return h + ':' + m + ':' + s;
  },

  popModal: (options) => {
    UI.renderWithData(Template.modal, options, $('body')[0]);
  },

  saveGameSelectionSet: (id, set) => {
    Games.upsert({
      _id: id,
    }, {
      $addToSet: {selections: set},
    });
  },

  saveGlobalGameState: (id, state) => {
    Games.upsert({
      _id: id,
    }, {
      $addToSet: {states: state},
    });
  },

  saveGlobalSelectionSet: (id, set) => {
    Lifetime.upsert({
      sets: {$exists: true}
    }, {
      $addToSet: {'_id.sets': set}
    });
  },

  savePlayerSelectionSet: (id, gameID, set) => {
    Players.upsert({
      _id: id
    }, {
      $addToSet: {'games.gameID.sets': set},
    });
  },

}
