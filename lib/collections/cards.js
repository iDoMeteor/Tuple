Cards = new Mongo.Collection( "cards" );

function card( color, shape, quant, fill, name ) {
  this.color = color;
  this.shape = shape;
  this.quant = quant;
  this.fill = fill;
  // this.url = url;
  // this.score = score;
}
this.colors = [ '#c0f5e9', '#e2c7f3', '#e2c7f3' ];
this.shapes = [ 'shape1', 'shape2', 'shape3' ];
this.quants = [ 1, 2, 3 ];
this.fills = [ 'fill1', 'fill2', 'fill3' ];
this.url = [];
this.name = [];
this.score = 0;
var cards = [];
for ( var c = 0; c < this.colors.length; c++ ) {
  for ( var s = 0; s < this.shapes.length; s++ ) {
    for ( var q = 0; q < this.quants.length; q++ ) {
      for ( var f = 0; f < this.fills.length; f++ ) {
        cards.push( new card( this.colors[ c ], this.shapes[ s ], this.quants[ q ], this.fills[ f ] ) );
      }
    }
  }
}
_.each( cards, function ( card ) {
  Cards.insert( {
    color: card.color,
    shape: card.shape,
    quant: card.quant,
    fill: card.fill,
    url: card.shape + '.svg',
    score: card.score,
    name: [ card.color + card.shape + card.quant + card.fill ]
  } );
} );