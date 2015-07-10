Meteor.subscribe( "cards" );
Template.board.helpers( {
  cards: function () {
    return Cards.find( {}, {
      sort: {
        _id: -1,
      },
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
  cardColor: function () {
    if ( card.color === 'r' ) {
      Session.set( "cardColor", 'color1' );
    }
    else if ( card.color === 'g' ) {
      Session.set( "cardColor", 'color2' );
    }
    else if ( card.color === 'b' ) {
      Session.set( "cardColor", 'color3' );
    }
    return Session.set( "cardColor" ), {};
  }
} );
Template.card.events( {
  'click': function () {
    Session.set( "selectedCard", this._id );
  }
} );