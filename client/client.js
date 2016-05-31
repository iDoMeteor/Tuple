Template.board.helpers({

  cards: function () {

    if (_.isEmpty(Session.get('deck'))) {
      Tuple.deal();
    }
    return Session.get('deck');

  },

});


Template.controls.events({

  'click .controls-new-game': () => {
    Tuple.deal();
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


Template.cardHolder.events({

  'click .card-holder': function (event) {
    var context = this;
    var svg = Tuple.getSVGfromEvent(event);
    Tuple.selectionCheck(context, svg);
  },

});


Template.card.onRendered(function () {

  let color = this.data.color;
  let id = this.data._id;
  let num = this.data.num;
  this.$('#svg-' + num).attr('style', 'fill:' + color);

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
