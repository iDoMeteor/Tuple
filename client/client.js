Template.board.helpers({

  cards: function () {
    return Cards.find({}) ;
  },

  cardShape: function () {
    var card = Session.get( "selectedCard" );
    return card.shape;
  },

  cardColor: function () {
  var card = Session.get( "cardColor" );
  return card.color;
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

  'onCreated .card-holder': function (event) {
    var num = $(event.target).attr('id').substr(3);
    var svg = $('#svg-' + num)[0].contentDocument;
    $(svg).find('path').attr('style', 'fill:red');
  }

  // 'rendered .card-holder': function (event) {
  //   var num = $(event.target).attr('id').substr(3);
  //   var svg = $('#svg-' + num)[0].contentDocument;
  //   $(svg).find('path').attr('style', 'fill:cyan');
  //   Session.set( "cardShape", this.shape );
  // }

  // 'rendered': function () {
  //   Session.set( "cardShape", this.shape );
  //   // Session.set( "cardColor", this.color );
  // }

});


Template.selectedCardBanner.helpers({

  selectedCard: function () {
    var card = Session.get( "selectedCard" );
    return card && card.name;
  },

});
