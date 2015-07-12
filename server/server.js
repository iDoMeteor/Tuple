Meteor.startup( function deck() {
  Cards.remove( {} );

  function card( color, shape, quant, fill, name ) {
    this.color = color;
    this.shape = shape;
    this.quant = quant;
    this.fill = fill;
    this.image = image;
    this.score = score;
  }
  this.colors = [ 'red', 'blue', 'brown' ];
  this.shapes = [ 's', 'o', 'd' ];
  this.quants = [ '1', '2', '3' ];
  this.fills = [ 'e', 'h', 'f' ];
  this.image = [ 'url' ];
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
      image: card.image,
      score: card.score,
      name: [ card.color + card.shape + card.quant + card.fill ]
    } );
  } );
} );
// PUT IN CLIENT HELPERS?
// Game.prototype.verifySet = function ( c0, c1, c2 ) {
//   var s = c0.number + c1.number + c2.number;
//   if ( s != 0 && s != 3 && s != 6 ) return false;
//   s = c0.color + c1.color + c2.color;
//   if ( s != 0 && s != 3 && s != 6 ) return false;
//   s = c0.shape + c1.shape + c2.shape;
//   if ( s != 0 && s != 3 && s != 6 ) return false;
//   s = c0.shading + c1.shading + c2.shading;
//   if ( s != 0 && s != 3 && s != 6 ) return false;
//   return true;
// }
// NEED TO APPLY THIS IDX INDEX TO MY CARD LOGIC
// function Card( idx ) {
//   this.number = idx % 3;
//   idx = Math.floor( idx / 3 );
//   this.color = idx % 3;
//   idx = Math.floor( idx / 3 );
//   this.shape = idx % 3;
//   idx = Math.floor( idx / 3 );
//   this.shading = idx % 3;
// }
//
//
//
// reference code--> http://devdojo.com/post/create-a-deck-of-cards-in-javascript
// function card(value, name, suit) {
//   this.value = value;
//   this.name = name;
//   this.suit = suit;
// }
//
// function deck() {
//   this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
//   this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
//   var cards = [];
//
//   for (var s = 0; s < this.suits.length; s++) {
//     for (var n = 0; n < this.names.length; n++) {
//       cards.push(new card(n + 1, this.names[n], this.suits[s]));
//     }
//   }
//
//   return cards;
// }
// var myDeck = new deck();
// console.log(myDeck);
//
// window.onload = function() {
//
// 	for(var i=0; i < myDeck.length; i++){
// 		div = document.createElement('div');
// 		div.className = 'card';
//
// 		if(myDeck[i].suit == 'Diamonds'){
// 			var ascii_char = '♦';
// 		} else {
// 			var ascii_char = '&' + myDeck[i].suit.toLowerCase() + ';';
// 		}
//
// 		div.innerHTML = '' + myDeck[i].name + '' + ascii_char + '';
// 		document.body.appendChild(div);
// 	}
//
// }
//
// function shuffle(o) {
// 	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
// 	return o;
// };
//
// myDeck = shuffle(myDeck);