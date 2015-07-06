Meteor.startup(function () {
  Cards.remove({});
  if (Cards.find().count() === 0) {
    var names = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5", "Card 6", "Card 7", "Card 8", "Card 9", "Card 10", "Card 11", "Card 12", "Card 13"];
    _.each(names, function (name) {
      Cards.insert({
        name: name,
        score: 0,
        color: 'x' | 'y' | 'z',
        shape: 'x' | 'y' | 'z',
        quant: 'x' | 'y' | 'z',
        fill: 'x' | 'y' | 'z'
      });
    });
  }
});

// Meteor.startup(function deck(color, shape, quant, fill) {
//   this.color = ['r', 'b', 'g'];
//   this.shape = ['x', 'y', 'z'];
//   this.quant = ['1', '2', '3'];
//   this.fill = ['empty', 'shaded', 'solid'];
//   cards = []
//   _.each(cards, function (name) {
//     for (var c = 0; c < this.color.length; c++) {
//       for (var s = 0; s < this.shape.length; s++) {
//         for (var q = 0; q < this.quant.length; q++) {
//           for (var f = 0; f < this.fill.length; f++) {
//             cards.push(new card(n + 1, this.colors[c], this.shape[s], this.quant[q], this.fill[f]));
//           }
//         }
//       }
//     }
//     Cards.insert({
//       name: name,
//       score: 0,
//       color: color,
//       shape: shape,
//       quant: quant,
//       fill: fill
//
//     });
//   });
// });




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