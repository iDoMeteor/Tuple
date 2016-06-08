Template.board.helpers({

  cards: function () {

    if (_.isEmpty(Session.get('deck'))) {
      Tuple.deal();
    }
    return Session.get('deck');

  },

});


Template.cheatButton.helpers({

  cheat: () => {
    return Session.get('cheater');
  },

});


Template.cheatButtonShow.events({

  'click .show-card-name': () => {
    Session.set('cheater', true);
  },

});


Template.cheatButtonHide.events({

  'click .hide-card-name': () => {
    Session.set('cheater', false);
  },

});


Template.controls.events({

  'click .control-new-game': (event) => {
    event.preventDefault();
    Tuple.deal();
  },

  'click .control-check-tuple': (event) => {
    event.preventDefault();
    let playerId = 0;
    let tuple = Tuple.isTuple(Session.get('selectionSet'));
    if (tuple) {
      console.log('Tuple!');
      let deck = Session.get('deck') || [];
      let length = deck.length || 0;
      Meteor.call('tupleIncrementGlobalLifetimeTuples');
      //Meteor.call('tupleIncrementPlayerGameTuples', playerId);
      //Meteor.call('tupleIncrementPlayerLifetimeTuples', playerId);
      //Tuple.storeGameSelectionSet(true);
      //Tuple.storeGlobalSelectionSet(true);
      //Tuple.storePlayerSelectionSet(true);
      $('.card-holder').removeClass('card-holder-active');
      _.each(Session.get('selectionSet'), (id) => {
        let card = Cards.findOne({_id: id});
        let num = card.num || 0;
        _.each(deck, (c, k) => {
          if (id == c._id) {
            deck.splice(k, 1);
          }
        });
        $('#svg-' + num).parent().remove();
      });
      Session.set('deck', deck);
      Tuple.drawThree();
      Session.set('selectedCard', null);
      Session.set('selectionSet', null);
    } else {
      console.log('Failure >:O');
      Meteor.call('tupleIncrementGlobalLifetimeFails');
      //Meteor.call('tupleIncrementPlayerGameFails', playerId);
      //Meteor.call('tupleIncrementPlayerLifetimeFails', playerId);
      //Tuple.storeGameSelectionSet();
      //Tuple.storeGlobalSelectionSet();
      //Tuple.storePlayerSelectionSet();
    }
    //Tuple.calculatePlayerPoints();
    //Tuple.updateGameState();
  },

});


Template.board.onCreated(function () {

  this.autorun (() => {
    let handle = this.subscribe('deck');
    let ready = handle.ready();
    if (ready && !Session.get('deck')) {
      Tuple.deal();
    }
  });

});

Template.card.helpers({

  active: function () {
    return (Tuple.isSelected(this._id)) ?
      'card-holder-active' : null;
  },

  color: function () {
    return this.color;
  },

  num: function () {
    return this.num;
  },

  paths: function () {
    let path  = null;
    let qty = this.quant.toString();
    let shape = this.shape;
    paths = Tuple.getPath(qty, shape);
    return paths;
  },

  selected: function () {
    var card = Session.get( "selectedCards" );
    return (card._id == this._id) ? "selected" : '';
  },

});


Template.card.onRendered(function () {

  let color = this.data.color;
  let fill = this.data.fill;
  let id = this.data._id;
  let num = this.data.num;
  this.$('#svg-' + num).attr(
    'style',
    'fill:' + color +
      '; stroke:' + fill +
      '; stroke-width: 10px;');

});


Template.cardHolder.events({

  'click .card-holder': function (event) {
    event.preventDefault();
    var context = this;
    var svg = Tuple.getSVGfromEvent(event);
    Tuple.selectionCheck(context, svg);
  },

});


Template.cardHolder.onRendered(function () {

  let id = this.data._id;
  let num = this.data.num;
  if (-1 != _.indexOf(Session.get('selectionSet'), id)) {
    $('#ch-' + num).addClass('card-holder-active');
  }

});


Template.cheatButtonHide.helpers({

  selectedCard: function () {
    var card = Session.get( "selectedCard" );
    return ('string' == typeof(card.name)) ?
      card.name :
      null;
  },

});


Template.helpButton.events({

  'click .control-show-rules': () => {
    Session.set('showRules', true);
  },

});


Template.statsGame.helpers({

  available: () => {
    return '0';
  },

  cheat: () => {
    return Session.get('cheater');
  },

  deck: () => {
    let deck =  Session.get('master') || [];
    return deck.length;
  },

  fails: () => {
    return '0';
  },

  points: () => {
    return '0';
  },

  timer: () => {
    return '0';
  },

  tuples: () => {
    return '0';
  },

});


Template.statsLifetime.helpers({

  fails: function () {
    let count = Tuple.getGlobalLifetimeFails();
    return count;
  },

  points: () => {
    return '0';
  },

  tuples: function () {
    let count = Tuple.getGlobalLifetimeTuples();
    return count;
  },

});


Template.statsLifetime.onCreated(function () {

  this.subscribe('Lifetime');

});

Template.statsPlayer.helpers({

  fails: () => {
    return '0';
  },

  points: () => {
    return '0';
  },

  tuples: () => {
    return '0';
  },

});
