/**
 * Get shuffle
 */
import Shuffle from 'shuffle';

/**
 * Tuple API v1.0.0-Alpha
 *
 * */
Tuple = {

  calculatePlayerPoints: () => {
    return 0;
  },

  getAllCards: () => {
    return Cards.find().fetch();
  },

  getCard: (id) => {
    return Cards.findOne({_id: id});
  },

  getGameScore: (id) => {
    let game = Games.findOne({_id: id}, {fields: {score: 1}});
    let score = game.score || '0';
    return score;
  },

  getGameTupleCount: () => {
    let game = Games.findOne({_id: id}, {fields: {score: 1}});
    let tuples = game.tuples || '0';
    return score;
  },

  getGameFailCount: () => {
    let game = Games.findOne({_id: id}, {fields: {score: 1}});
    let fails = game.fails || '0';
    return score;
  },

  getGlobalLifetimeFails: () => {
    let fails = Lifetime.findOne(
      {item: 'fails'},
      {fields: {count: 1}}
    ) || {count: 0};
    return fails.count;
  },

  getGlobalLifetimeGames: () => {
    let games = Lifetime.findOne(
      {item: 'games'},
      {fields: {count: 1}}
    ) || {count: 0};
    return games.count;
  },

  getGlobalLifetimePoints: () => {
    let points = Lifetime.findOne(
      {item: 'points'},
      {fields: {count: 1}}
    ) || {count: 0};
    return points.count;
  },

  getGlobalLifetimeTuples: () => {
    let tuples = Lifetime.findOne(
      {item: 'tuples'},
      {fields: {count: 1}}
    ) || {count: 0};
    return tuples.count;
  },

  getPath: (qty, shape) => {
    let shapes = {
      '1': {
        'diamond': ['M511.9 184l-100 200 100 200 100-200'],
        'pill': ['M587 234c-.1 0 0-.2 0-.2 0-41.4-33.6-75-75-75s-75 33.6-75 75c0 .9.1 1.7.1 2.6v294.9c0 .9-.1 1.7-.1 2.6 0 41.4 33.6 75 75 75 41.3 0 74.9-33.8 75-74.8h.1V234z'],
        'wave': ['M627.7 234c-.1 0-.1-.2-.1-.2-5.5-41.4-75.2-75-116.7-75-41.4 0-38.8 33.6-33.3 75 .1.9.3 1.7.5 2.6 14.2 98.3-98.3 196.6-84.2 294.9.1.9.2 1.7.3 2.6 5.5 41.4 75.2 75 116.7 75 41.2 0 38.7-33.8 33.4-74.8h.1C527.5 434 644.2 334 627.7 234z'],
      },
      '2': {
        'diamond': [
          'm 375.36667,184 -100,200 100,200 100,-200',
          'm 648.43333,184 -100,200 100,200 100,-200',
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
          'm 238.83334,184 -100,200 100,200 100,-200',
          'm 511.9,184 -100,200 100,200 100,-200',
          'm 784.96666,184 -100,200 100,200 100,-200',
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
    let fails = Players.findOne(
      {uid: id},
      {fields: {'lifetime.fails': 1}}
    ) || {lifetime: {fails: 0}};
    return fails.lifetime.fails;
  },

  getPlayerGamesCompleted: (id) => {
    return 0;
  },

  getPlayerGamesPlayed: (id) => {
    id = id || Meteor.userId();
    let games = Players.findOne(
      {uid: id},
      {fields: {numGames: 1}}
    ) || {numGames: 0};
    return games.numGames;
  },

  getPlayerLifetimePoints: (id) => {
    id = id || Meteor.userId();
    let points = Players.findOne(
      {uid: id},
      {fields: {'lifetime.points': 1}}
    ) || {lifetime: {points: 0}};
    return points.lifetime.points;
  },

  getPlayerLifetimeTimePlayed: (id) => {
    id = id || Meteor.userId();
    let time = Players.findOne(
      {uid: id},
      {fields: {'lifetime.time': 1}}
    ) || {lifetime: {time: 0}};
    return time.lifetime.time;
  },

  getPlayerLifetimeTuples: (id) => {
    id = id || Meteor.userId();
    let tuples = Players.findOne(
      {uid: id},
      {fields: {'lifetime.tuples': 1}}
    ) || {lifetime: {tuples: 0}};
    return tuples.lifetime.tuples;
  },

  getPlayerName: (id) => {
    id = id || Meteor.userId();
    let name = Players.findOne(
      {uid: id},
      {fields: {name: 1}}
    ) || {name: 'Your'};
    return name.name;
  },

  getPlayerTimePlayed: (id) => {
    return 0;
  },

  getPlayers: (ids) => {
    let players = [];
    _.each(ids, (value, key) => {
      players.push(
        Players.findOne({uid: value})
      );
    });
    return players;
  },

  hasMatch: (card1, card2) => {
    let hasMatch = false;
    let keys = Tuple.keys();
    _.each(keys, (key) => {
      if (card1[key] == card2[key]) {
        hasMatch = true;
      }
    });
    return hasMatch;
  },

  numMatches: (card1, card2) => {
    let i = 0;
    let keys = Tuple.keys();
    _.each(keys, (key) => {
      if (card1[key] == card2[key]) {
        i++;
      }
    });
    return i;
  },

  isTuple: (ids) => {
    if (!ids || (3 != ids.length)) return;
    let card1 = Tuple.getCard(ids[0]);
    let card2 = Tuple.getCard(ids[1]);
    let card3 = Tuple.getCard(ids[2]);
    let keys = Tuple.keys();
    let matchBox = {};
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
    let card = {};
    let cards = [];
    let i = 1;
    let colors = [ '#c0f5e9', '#e2c7f3', '#ff0083' ];
    let shapes = [ 'diamond', 'pill', 'wave' ];
    let quants = [ 1, 2, 3 ];
    let fills = [ 'yellow', 'blue', 'green' ];
    for ( let c = 0; c < colors.length; c++ ) {
      for ( let s = 0; s < shapes.length; s++ ) {
        for ( let q = 0; q < quants.length; q++ ) {
          for ( let f = 0; f < fills.length; f++ ) {
            cards.push({
              color: colors[c],
              shape: shapes[s],
              quant: quants[q],
              fill: fills[f],
              name: colors[c]+shapes[s]+quants[q]+fills[f],
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

  newGame: ({playerIDs:ids = []} = {}) => {
    let pids = [];
    let players = [];
    let game = {};
    if (!ids || (0 == ids.length)) {
      pids.push(Meteor.userId());
    }
    _.each(pids, (uid) => {
      Tuple.incrementPlayerGameCount(uid);
      players.push(Players.findOne(
        {uid: uid},
        {fields: {admin: 0, email: 0, games: 0}}
      ));
    });
    game = {
      fails: 0,
      numPlayers: players.length,
      players: players,
      score: 0,
      stamps: {
        start: new Date(),
      },
      state: {},
      timeline: [],
      tuples: 0,
    }
    return Games.insert(game);
  },

  numTuples: (cards) => {
    let selections = []
    let tuples = 0;
    let combinations = 0;
    let zen = [cards, cards.slice(1), cards.slice(2)];
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

  storeGameSelectionSet: (id, set) => {
    Games.upsert({
      _id: id,
    }, {
      $addToSet: {selections: set},
    });
  },

  storeGlobalGameState: (id, state) => {
    Games.upsert({
      _id: id,
    }, {
      $addToSet: {states: state},
    });
  },

  storeGlobalSelectionSet: (id, set) => {
    Lifetime.upsert({
      sets: {$exists: true}
    }, {
      $addToSet: {'_id.sets': set}
    });
  },

  storePlayerSelectionSet: (id, gameID, set) => {
    Players.upsert({
      _id: id
    }, {
      $addToSet: {'games.gameID.sets': set},
    });
  },


}


/**
 * Client API
 **/
if (Meteor.isClient) {
  Object.assign(Tuple, {

    cardsLeft: () => {
      let deck = Session.get('deck');
      return (
        deck
        && ('number' == typeof(deck.length))
      ) ? deck.length
        : false;
    },

    drawThree: () => {
      if (!Session.get('master').length) {
        return;
      }
      let newCards = [];
      let master = Session.get('master');
      if (!master.length) return 0;
      let cardsOnTable = Session.get('deck');
      let deck = Shuffle.shuffle({deck: master});
      let length = 0;
      newCards = deck.draw(3);
      length = deck.length;
      cardsOnTable = cardsOnTable.concat(newCards);
      master = deck.cards;
      Session.set('master', master);
      Session.set('deck', cardsOnTable);
      return (
        length
        && ('number' == typeof(length))
      ) ? length
        : false;
    },

    deal: () => {
      let cards = [];
      let deck = Shuffle.shuffle({deck: Tuple.getAllCards()});
      deck.shuffle();
      cards = deck.draw(12);
      Session.set('master', deck.cards);
      Session.set('deck', cards);
      Session.set('selectedCard', null);
      Session.set('selectionSet', null);
      return (
        deck
        && ('number' == typeof(deck.length))
      ) ? deck.length
        : false;
    },

    gameOver: (id, state) => {
      Session.set('gameOver', true);
    },

    getGameState: () => {
      return {
        deck: Session.get('deck'),
        game: _.omit(
          Session.get('game'),
          'players',
          'stamps',
          'state',
          'timeline',
        ),
        master: Session.get('master'),
        selectedCard: Session.get('selectedCard'),
        selectionSet: Session.get('selectionSet'),
        stamp: new Date(),
      }
    },

    getSVGfromEvent: (event) => {
      let num = $(event.target).attr('id').substr(3);
      let svg = $('#svg-' + num);
      return svg;
    },

    getSVGattribute: (svg, attribute) => {
      let value = $(svg).find('path').attr('style');
      // TODO: regex desired attribute out
      //        maybe split to array and then select property
      return value;
    },

    initializeGameState: (id) => {
      return {
        deck: Session.get('deck'),
        game: Games.findOne(id),
        master: Session.get('master'),
        selectedCard: {},
        selectionSet: {},
        stamp: new Date(),
      }
    },

    isSelected: (id) => {
      let selected = Session.get('selectionSet') || [];
      return (-1 != _.indexOf(selected, id));
    },

    selectionAdd: (id) => {
      let card = Cards.findOne({_id: id});
      let num = card.num;
      let selections = Session.get("selectionSet") || [];
      if (2 < selections.length) {
        console.log ('You may only have three cards selected!');
        return;
      }
      if (
        _.isEmpty(selections)
          || (-1 == _.indexOf(selections, id))
      ) {
        selections.push(id);
      } else {
        console.log('Card not added to selection');
      }
      $('#ch-' + num).addClass('card-holder-active');
      Session.set("selectionSet", selections);
    },

    selectionCheck: (context, svg) => {
      Session.set('selectedCard', context);
      let id = context._id;
      let selected = Session.get('selectionSet') || [];
      if (-1 == _.indexOf(selected, id)) {
        Tuple.selectionAdd(id);
      } else {
        Tuple.selectionRemove(id);
      }
    },

    selectionClear: () => {
      Session.set("selectedCard", null);
      Session.set("selectionSet", null);
      _.each(Session.get('deck'), (card) => {
        Tuple.selectionRemove(card._id);
        $('#ch-' + card.num).removeClass('card-holder-active');
      });
    },

    selectionRemove: (id) => {
      let card = Cards.findOne({_id: id});
      let num = card.num;
      let selections = Session.get("selectionSet") || [];
      if (-1 != _.indexOf(selections, id)) {
        selections = _.without(selections, id);
      }
      $('#ch-' + num).removeClass('card-holder-active');
      Session.set("selectedCard", null);
      Session.set("selectionSet", selections);
    },

    shuffleDeck: () => {
      let deck = Session.get('deck');
      return deck.shuffle();
    },

    svgChangeAttribute: (svg, attribute, value) => {
      $(svg).find('path').attr('style', attribute + ':' + value);
      return;
    },

  });
}


/**
 * Server API
 **/
if (Meteor.isServer) {
  Object.assign(Tuple, {

    incrementGlobalGameCount: () => {
      Lifetime.upsert({
        item: 'games'
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

    incrementGlobalLifetimeTuples: () => {
      Lifetime.upsert({
        item: 'tuples'
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

    incrementPlayerGameCount: (id) => {
      id = id || Meteor.userId();
      id = Players.findOne({uid: id})._id;
      Players.upsert({
        _id: id
      }, {
        $inc: {numGames: 1}
      });
    },

    incrementPlayerGameFails: (gid, pid) => {
      Games.upsert(
        {_id: gid},
        {$inc: {fails: 1}}
      );
    },

    incrementPlayerGameTuples: (gid, pid) => {
      Games.upsert(
        {_id: gid},
        {$inc: {tuples: 1}}
      );
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

    insertDeck: (cards) => {
      _.each(cards, (card) => {
        Cards.insert(card);
      });
    },

    setGameState: (id, state) => {
      Games.update(
        {_id: id},
        {$set: {state: state}}
      );
      Games.update(
        {_id: id},
        {$push: {timeline: state}}
      );
    },

  });
}
