Template.board.helpers({

  cards: function () {

    if (_.isEmpty(Session.get('deck'))) {
      Tuple.deal();
    }
    return Session.get('deck');

  },

});


Template.controls.events({

  'click .controls-new-game': (event) => {
    event.preventDefault();
    Tuple.deal();
  },

  'click .controls-check-tuple': (event) => {
    event.preventDefault();
    let tuple = Tuple.isTuple(Session.get('selectionSet'));
    _.each(Session.get('selectionSet'), (id) => {
      console.log(JSON.stringify(Cards.find({_id: id}).fetch(), null, 2));
    });
    if (tuple) {
      console.log('You won!');
      alert('Tupz!');
    } else {
      console.log('You lose!');
    }
    Session.set('selectedCard', null);
    Session.set('selectionSet', null);
    $('.card-holder').removeClass('card-holder-active');
  },

});


Template.board.onCreated(function () {

  let handle = this.subscribe('deck');
  Tracker.autorun (() => {
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


Template.selectedCardBanner.helpers({

  availableTuples: function () {
    var card = Session.get( "selectedCard" );
    return card && card.name;
  },

  selectedCard: function () {
    var card = Session.get( "selectedCard" );
    return card && card.name;
  },

});
