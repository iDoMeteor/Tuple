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

  dealGame: () => {
    let deck = Shuffle.shuffle({deck: this.getAllCards()});
    deck.shuffle();
    let cards = deck.draw(12);
    Session.set('deck', deck);
    // Should always return # cards - 12, ie; 69 ;>
    return (
      deck
      && ('number' == typeof(deck.length))
    ) ? deck.length
      : false;
  },

  getAllCards: () => {
    return Cards.find().fetch();
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

  newDeck: () => {

    let card = {};
    let cards = [];
    let i = 1;

    let colors = [ '#c0f5e9', '#e2c7f3', '#ff0083' ];
    let shapes = [ 'shape1', 'shape2', 'shape3' ];
    let quants = [ 1, 2, 3 ];
    let fills = [ 'fill1', 'fill2', 'fill3' ];

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


}
