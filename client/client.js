Meteor.subscribe( "cards" );
Template.board.helpers( {
  cards: function () {
    return Cards.find( {}, {
      limit: 12
    } );
  },
  svgColor: function () {
    return card.color;
  },
  svgShape: function () {
    return card.shape;
  },
  selectedCard: function () {
    var card = Cards.findOne( Session.get( "selectedCard" ) );
    return card && card.name;
  }
} );
Template.board.events( {
  'click .inc': function () {
    Cards.update( Session.get( "selectedCard" ), {
      $inc: {
        score: 1
      }
    } );
  }
} );
Template.card.helpers( {
  selected: function () {
    return Session.equals( "selectedCards", this._id ) ? "selected" : '';
  }
} );
Template.card.events( {
  'click': function () {
    Session.set( "selectedCard", this._id );
  }
} );
// Template.svgIcon.helpers( {
//
// } );