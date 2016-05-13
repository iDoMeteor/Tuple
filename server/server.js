/**
 * Object prototype
 * */
Card = function ( color, shape, quant, fill, name, num ) {
  this.color = color;
  this.shape = shape;
  this.quant = quant;
  this.fill = fill;
  this.name = name;
  this.num = num;
  this.score = 0;
}

/**
 * Deck generator
 * */
newDeck = function () {

  var card = {};
  var cards = [];
  var i = 1;

  var colors = [ 'red', 'blue', 'green' ];
  var shapes = [ 'shape1', 'shape2', 'shape3' ];
  var quants = [ 1, 2, 3 ];
  var fills = [ 'fill1', 'fill2', 'fill3' ];


  for ( var c = 0; c < colors.length; c++ ) {
    for ( var s = 0; s < shapes.length; s++ ) {
      for ( var q = 0; q < quants.length; q++ ) {
        for ( var f = 0; f < fills.length; f++ ) {

          card = new Card (
            colors[ c ],
            shapes[ s ],
            quants[ q ],
            fills[ f ],
            colors[c]+shapes[s]+quants[q]+fills[f],
            i
          );
          cards.push(card);

          i++;

        }
      }
    }
  }

  return cards;

}

/**
 * Insert card
 * */
insertDeck = function (cards) {

  _.each(cards, function (card) {
    Cards.insert(card);
  });

}

/**
 * Meteor Startup
 * */
Meteor.startup( function deck () {

  // Check for deck
  var deck = null;
  if (!Cards.find().count()) {
    console.log('Tuple: Generating initial deck');
    deck = newDeck();
    insertDeck(deck);
  }

  Meteor.publish( "cards", function () {
    return Cards.find({}, {
      limit: 81
    });
  });

});

