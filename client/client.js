Meteor.subscribe( "cards" );
Template.board.helpers( {
  cards: function () {
    return Cards.find( {}, {
      limit: 12
    } );
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

Template.svgShape.helpers( {
  shape: function () {
    return card.shape;
  }
} );
Template.svgColor.helpers( {
  color: function () {
    return card.color;
  }
} );