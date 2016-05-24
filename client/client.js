Template.board.helpers({

  cards: function () {
    return Cards.find({}) ;
  },

  cardShape: function () {
    var card = Session.get( "selectedCard" );
    return card.shape;
  }

});


Template.board.events({

  'click .inc': function () {
    card = Session.get( "selectedCard" )
    Cards.update(card.id , {
      $inc: {
        score: 1
      }
    });
  }

});


Template.board.onCreated(function () {

  Meteor.subscribe( "cards" );

});


Template.card.helpers({

  color: function () {
    var card = Session.get( "selectedCard" );
    return card.color;
  },

  num: function () {
    var card = Session.get( "selectedCard" );
    return card.num;
  },

  shape: function () {
    var card = Session.get( "selectedCard" );
    return card.shape;
  },

  selected: function () {
    var card = Session.get( "selectedCards" );
    return (card._id == this._id) ? "selected" : '';
  },

});


Template.card.events({

  'click .card-holder': function (event) {
    Session.set( "selectedCard", this );
  },

  'mouseover .card-holder': function (event) {
    var svg = Tuple.getSVGfromEvent(event);
    Tuple.svgChangeAttribute(svg, 'fill', 'red');
  },

  'mouseout .card-holder': function (event) {
    var svg = Tuple.getSVGfromEvent(event);
    Tuple.svgChangeAttribute(svg, 'fill', 'cyan');
  },

  'rendered': function () {
    Session.set( "cardShape", this.shape );
  }

});


Template.selectedCardBanner.helpers({

  selectedCard: function () {
    var card = Session.get( "selectedCard" );
    return card && card.name;
  },

});
