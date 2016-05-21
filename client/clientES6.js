Template.board.helpers({

  cards: function () {
    return Cards.find({}) ;
  },

  cardShape: function () {
    const card = Session.get( "selectedCard" );
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
    const card = Session.get( "selectedCard" );
    return card.color;
  },

  num: function () {
    const card = Session.get( "selectedCard" );
    return card.num;
  },

  shape: function () {
    const card = Session.get( "selectedCard" );
    return card.shape;
  },

  selected: function () {
    const card = Session.get( "selectedCards" );
    return (card._id == this._id) ? "selected" : '';
  },

});


Template.card.events({

  'click .card-holder': function (event) {
    Session.set( "selectedCard", this );
  },

  'mouseover .card-holder': function (event) {
    const num = $(event.target).attr('id').substr(3);
    const svg = $('#svg-' + num)[0].contentDocument;
    $(svg).find('path').attr('style', 'fill:red');
  },

  'mouseout .card-holder': function (event) {
    const num = $(event.target).attr('id').substr(3);
    const svg = $('#svg-' + num)[0].contentDocument;
    $(svg).find('path').attr('style', 'fill:cyan');
  },

  'rendered': function () {
    Session.set( "cardShape", this.shape );
  }

});


Template.selectedCardBanner.helpers({

  selectedCard: function () {
    const card = Session.get( "selectedCard" );
    return card && card.name;
  },

});
