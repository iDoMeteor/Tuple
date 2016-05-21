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

  let card = {};
  const cards = [];
  let i = 1;

  const colors = [ '#c0f5e9', '#e2c7f3', '#e2c7f3' ];
  const shapes = [ 'shape1', 'shape2', 'shape3' ];
  const quants = [ 1, 2, 3 ];
  const fills = [ 'fill1', 'fill2', 'fill3' ];


  for ( let c = 0; c < colors.length; c++ ) {
    for ( let s = 0; s < shapes.length; s++ ) {
      for ( let q = 0; q < quants.length; q++ ) {
        for ( let f = 0; f < fills.length; f++ ) {

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
