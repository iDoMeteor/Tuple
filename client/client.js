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
  },
  svgShape: function () {
    svgShape = card.shape;
    return svgShape;
  },
  svgColor: function () {
    svgColor = card.color;
    return svgColor;
  }
} );

Template.card.events( {
  'click': function () {
    Session.set( "selectedCard", this._id );
  }

} );