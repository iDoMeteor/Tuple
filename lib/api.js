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
    Session.set("selectionSet", selections);
  },

  selectionCheck: (context, svg) => {
    Session.set('selectedCard', context);
    let id = context._id;
    let selected = Session.get('selectionSet') || [];
    if (-1 == _.indexOf(selected, id)) {
      Tuple.selectionAdd(id);
      Tuple.svgChangeAttribute(svg, 'fill', 'cyan');
    } else {
      Tuple.selectionRemove(id);
      Tuple.svgChangeAttribute(svg, 'fill', 'black');
    }
  },

  selectionClear: () => {
    Session.set("selectionSet", '');
  },

  selectionRemove: (id) => {
    let selections = Session.get("selectionSet") || [];
    if (-1 != _.indexOf(selections, id)) {
      selections = _.without(selections, id);
    }
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


}
