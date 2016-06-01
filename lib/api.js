/**
 * Get shuffle
 */
import Shuffle from 'shuffle';

/**
 * Tuple API
 *
 * TODO: Client/server checks
 * */
Tuple = {

  cardsLeft: () => {
    let deck = Session.get('deck');
    return (
      deck
      && ('number' == typeof(deck.length))
    ) ? deck.length
      : false;
  },

  drawThree: () => {
    let deck = Session.get('deck');
    let cards = deck.draw(3);
    Session.set('deck', deck);
    return (
      deck
      && ('number' == typeof(deck.length))
    ) ? deck.length
      : false;
  },

  deal: () => {
    let deck = Shuffle.shuffle({deck: Tuple.getAllCards()});
    deck.shuffle();
    let cards = deck.draw(12);
    Session.set('deck', cards);
    Session.set('selectedCard', null);
    Session.set('selectionSet', null);
    // Should always return # cards - 12, ie; 69 ;>
    return (
      deck
      && ('number' == typeof(deck.length))
    ) ? deck.length
      : false;
  },

  hasMatch: (card) => {
    return;
  },

  getAllCards: () => {
    return Cards.find().fetch();
  },

  getCard: (id) => {
    return Cards.findOne({_id: id});
  },

  getPath: (qty, shape) => {
    let shapes = {
      '1': {
        'shape1': ['M511.9 184l-100 200 100 200 100-200'],
        'shape2': ['M587 234c-.1 0 0-.2 0-.2 0-41.4-33.6-75-75-75s-75 33.6-75 75c0 .9.1 1.7.1 2.6v294.9c0 .9-.1 1.7-.1 2.6 0 41.4 33.6 75 75 75 41.3 0 74.9-33.8 75-74.8h.1V234z'],
        'shape3': ['M627.7 234c-.1 0-.1-.2-.1-.2-5.5-41.4-75.2-75-116.7-75-41.4 0-38.8 33.6-33.3 75 .1.9.3 1.7.5 2.6 14.2 98.3-98.3 196.6-84.2 294.9.1.9.2 1.7.3 2.6 5.5 41.4 75.2 75 116.7 75 41.2 0 38.7-33.8 33.4-74.8h.1C527.5 434 644.2 334 627.7 234z'],
      },
      '2': {
        'shape1': [
          'm 375.36667,184 -100,200 100,200 100,-200',
          'm 648.43333,184 -100,200 100,200 100,-200',
        ],
        'shape2': [
          'm 450.46667,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 723.53333,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
        ],
        'shape3': [
          'm 491.16667,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
          'm 764.23333,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
        ],
      },
      '3': {
        'shape1': [
          'm 238.83334,184 -100,200 100,200 100,-200',
          'm 511.9,184 -100,200 100,200 100,-200',
          'm 784.96666,184 -100,200 100,200 100,-200',
        ],
        'shape2': [
          'm 313.93334,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 587,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 860.06665,234.00001 c -0.10001,0 0,-0.20002 0,-0.20002 0,-41.39998 -33.6,-74.99998 -75,-74.99998 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.69999 0.1,2.6 l 0,294.89999 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.29999,0 74.89999,-33.80001 75,-74.8 l 0.10001,0 0,-300.09999 z',
        ],
        'shape3': [
          'm 354.63334,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
          'm 627.7,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 C 527.5,434 644.2,334 627.7,234 Z',
          'm 900.76666,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
        ],
      },
    }
    return shapes[qty][shape];
  },

  getPlayers: (ids) => {
    _.each(ids, (value, key) => {
      players.push(
        Meteor.users.find(
          value,
          {
            // TODO: Select only required fields
          }
        )
      );
    });
  },

  getSVGfromEvent: (event) => {
    if (Meteor.isServer) return;
    let num = $(event.target).attr('id').substr(3);
    let svg = $('#svg-' + num);
    return svg;
  },

  getSVGattribute: (svg, attribute) => {
    if (Meteor.isServer) return;
    let value = $(svg).find('path').attr('style');
    // TODO: regex desired attribute out
    //        maybe split to array and then select property
    return value;
  },

  insertDeck: (cards) => {
    if (Meteor.isClient) return;
    _.each(cards, function (card) {
      Cards.insert(card);
    });
  },

  isSelected: (id) => {
    let selected = Session.get('selectionSet') || [];
    return (-1 != _.indexOf(selected, id));
  },

  isTuple: (ids) => {

    let card1 = Tuple.getCard(ids[0]);
    let card2 = Tuple.getCard(ids[1]);
    let card3 = Tuple.getCard(ids[2]);
    let keys = Tuple.keys();
    let matchBox = {};
    let x = 0;

    _.each(keys, (key) => {
      let test = card1[key];
      if (test == card2[key]) {
        if (test == card3[key]) {
          matchBox[key] = true;
        } else {
          matchBox[key] = false;
        }
      } else if (test == card3[key]) {
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
    let shapes = [ 'shape1', 'shape2', 'shape3' ];
    let quants = [ 1, 2, 3 ];
    let fills = [ 'red', 'blue', 'green' ];

    for ( let c = 0; c < colors.length; c++ ) {
      for ( let s = 0; s < shapes.length; s++ ) {
        for ( let q = 0; q < quants.length; q++ ) {
          for ( let f = 0; f < fills.length; f++ ) {

            card = new Card (
              colors[ c ],
              shapes[ s ],
              quants[ q ],
              fills[ f ],
              colors[c]+shapes[s]+quants[q]+fills[f],
              i
            );
            cards.push(card);

            i++;

          }
        }
      }
    }
    return cards;
  },

  newGame: ({
    numPlayers = 1,
    playerIDs : ids = [],
    mode = 'default',
    otherOptions = 'TBD',
  } = {}) => {
    let players = [];
    if (1 < numPlayers) {
      console.log ('w00t! you might not go blind after all!');
    }
    if (!ids || (0 == ids.length)) {
      let player = this.newPlayer();
      players.push(player);
    } else {
      players = this.getPlayers(ids);
    }
    // TODO ... carry on creating new game env
    return;
  },

  newPlayer: () => {
    // TODO
    return;
  },

  numMatches: (card) => {
    return;
  },

  selectionAdd: (id) => {
    if (Meteor.isServer) return;
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
    if (Meteor.isServer) return;
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
    if (Meteor.isServer) return;
    Session.set("selectionSet", '');
  },

  selectionRemove: (id) => {
    if (Meteor.isServer) return;
    let card = Cards.findOne({_id: id});
    let num = card.num;
    let selections = Session.get("selectionSet") || [];
    if (-1 != _.indexOf(selections, id)) {
      selections = _.without(selections, id);
    }
    $('#ch-' + num).removeClass('card-holder-active');
    Session.set("selectionSet", selections);
  },

  shuffleDeck: () => {
    let deck = Session.get('deck');
    return deck.shuffle();
  },

  svgChangeAttribute: (svg, attribute, value) => {
    if (Meteor.isServer) return;
    $(svg).find('path').attr('style', attribute + ':' + value);
    return;
  },

  tuplesOnBoard: () => {

    let cards = Session.get('deck');
    let keys = Tuple.keys();
    let tuples = 0;

    _.each(cards, (card) => {
      _.each(keys, (value) => {
        let test = {key: card[value]};
        let T = 0;
        _.each(cards, (c) => {
          if (Tuple.isMatch(c, test)) {
            T++; // Benny going up!
          }
        });
        if (3 <= T) {
          tuples++;
        }
      });
      cards.shift();
    });

    console.log(tuples);
    return tuples;

  },

}
