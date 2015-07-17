Meteor.subscribe( "cards" );
Template.board.helpers( {
  svgColor: function () {
    return card.color;
  },
  // loadSVG: function () {
  //   var mySVGsToInject = document.querySelectorAll( '.svg' );
  //   var injectorOptions = {
  //     evalScripts: 'once'
  //   };
  //   SVGInjector( mySVGsToInject, injectorOptions );
  //
  //   loadSVG();
  // },
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