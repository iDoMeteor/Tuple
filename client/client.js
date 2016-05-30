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

  this.subscribe( "cards" );

});


Template.card.helpers({

  active: function () {
    return (Tuple.isSelected(this._id)) ?
      'card-holder-active' : null;
  },

  color: function () {
    return this.color;
  },

  num: function () {
    return this.num;
  },

  paths: function () {
    let path  = null;
    let qty = this.quant.toString();
    let shape = this.shape;
    let shapes = {
      '1': {
        'shape1': ['M511.9 184l-100 200 100 200 100-200'],
        'shape2': ['M587 234c-.1 0 0-.2 0-.2 0-41.4-33.6-75-75-75s-75 33.6-75 75c0 .9.1 1.7.1 2.6v294.9c0 .9-.1 1.7-.1 2.6 0 41.4 33.6 75 75 75 41.3 0 74.9-33.8 75-74.8h.1V234z'],
        'shape3': ['M627.7 234c-.1 0-.1-.2-.1-.2-5.5-41.4-75.2-75-116.7-75-41.4 0-38.8 33.6-33.3 75 .1.9.3 1.7.5 2.6 14.2 98.3-98.3 196.6-84.2 294.9.1.9.2 1.7.3 2.6 5.5 41.4 75.2 75 116.7 75 41.2 0 38.7-33.8 33.4-74.8h.1C527.5 434 644.2 334 627.7 234z'],
      },
      '2': {
        'shape1': [
          'm 375.36667,184 -100,200 100,200 100,-200',
          'm 648.43333,184 -100,200 100,200 100,-200',
        ],
        'shape2': [
          'm 450.46667,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 723.53333,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
        ],
        'shape3': [
          'm 491.16667,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
          'm 764.23333,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
        ],
      },
      '3': {
        'shape1': [
          'm 238.83334,184 -100,200 100,200 100,-200',
          'm 511.9,184 -100,200 100,200 100,-200',
          'm 784.96666,184 -100,200 100,200 100,-200',
        ],
        'shape2': [
          'm 313.93334,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 587,234 c -0.1,0 0,-0.2 0,-0.2 0,-41.4 -33.6,-75 -75,-75 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.7 0.1,2.6 l 0,294.9 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.3,0 74.9,-33.8 75,-74.8 l 0.1,0 0,-300.1 z',
          'm 860.06665,234.00001 c -0.10001,0 0,-0.20002 0,-0.20002 0,-41.39998 -33.6,-74.99998 -75,-74.99998 -41.4,0 -75,33.6 -75,75 0,0.9 0.1,1.69999 0.1,2.6 l 0,294.89999 c 0,0.9 -0.1,1.7 -0.1,2.6 0,41.4 33.6,75 75,75 41.29999,0 74.89999,-33.80001 75,-74.8 l 0.10001,0 0,-300.09999 z',
        ],
        'shape3': [
          'm 354.63334,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
          'm 627.7,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 C 527.5,434 644.2,334 627.7,234 Z',
          'm 900.76666,234 c -0.1,0 -0.1,-0.2 -0.1,-0.2 -5.5,-41.4 -75.2,-75 -116.7,-75 -41.4,0 -38.8,33.6 -33.3,75 0.1,0.9 0.3,1.7 0.5,2.6 14.2,98.3 -98.3,196.6 -84.2,294.9 0.1,0.9 0.2,1.7 0.3,2.6 5.5,41.4 75.2,75 116.7,75 41.2,0 38.7,-33.8 33.4,-74.8 l 0.1,0 c -16.9,-100.1 99.8,-200.1 83.3,-300.1 z',
        ],
      },
    }
    paths = shapes[qty][shape];
    return paths;
  },

  selected: function () {
    var card = Session.get( "selectedCards" );
    return (card._id == this._id) ? "selected" : '';
  },

});


Template.card.events({

  'click .card-holder': function (event) {
    // This is the context of the card template,
    // which should be a valid card object
    var context = this;
    var svg = Tuple.getSVGfromEvent(event);
    Tuple.selectionCheck(context, svg);
  },

  'rendered': function () {
    Session.set( "cardShape", this.shape );
  }

});


Template.card.onRendered(function () {

  let color = this.data.color;
  let id = this.data._id;
  let num = this.data.num;
  this.$('#svg-' + num).attr('style', 'fill:' + color);

});


Template.selectedCardBanner.helpers({

  availableTuples: function () {
    var card = Session.get( "selectedCard" );
    return card && card.name;
  },

  selectedCard: function () {
    var card = Session.get( "selectedCard" );
    return card && card.name;
  },

});
