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
  },
  cardShape: function () {
    var shape = Cards.find( Session.get( "cardShape" ) );
    return card && card.shape;
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
    // svgShape: function () {
    //   return Session.equals( "svgShape", this.shape );
    // var card = Cards.find( {} );
    // return card && card.shape;
} );

Template.card.events( {
  'click': function () {
    Session.set( "selectedCard", this._id );
  },
  'rendered': function () {
    Session.set( "cardShape", this.shape );
  }

} );