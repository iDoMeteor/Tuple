Template.board.helpers({

  cards: function () {
    return Cards.find({}) ;
  },

  selectedCard: function () {
    var card = Cards.findOne( Session.get( "selectedCard" ) );
    return card && card.name;
  },

  cardShape: function () {
    var shape = Cards.find( Session.get( "cardShape" ) );
    return card && card.shape;
  }

});


Template.board.events({

  'click .inc': function () {
    Cards.update( Session.get( "selectedCard" ), {
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
    var card = Cards.findOne( Session.get( "selectedCard" ) );
    return card && card.color;
  },

  num: function () {
    var card = Cards.findOne( Session.get( "selectedCard" ) );
    return card && card.num;
  },

  shape: function () {
    var card = Cards.findOne( Session.get( "selectedCard" ) );
    return card && card.shape;
  },

  selected: function () {
    return Session.equals( "selectedCards", this._id ) ? "selected" : '';
  }

});


Template.card.events({

  'click .card-holder': function (event) {
    console.log('trying: ' + $(event.target).attr('id'));
    Session.set( "selectedCard", this._id );
  },

  'rendered': function () {
    Session.set( "cardShape", this.shape );
  }

});
