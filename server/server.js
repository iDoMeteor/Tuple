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
      this.colors = [ 'r', 'g', 'b';
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
            name: [ card.color, card.shape, card.quant, card.fill ],
            score: card.score
          } );
        } );
      } );
    // Meteor.startup(function () {
    //   Cards.remove({});
    //   if (Cards.find().count() === 0) {
    //     var names = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5", "Card 6", "Card 7", "Card 8", "Card 9", "Card 10", "Card 11", "Card 12", "Card 13"];
    //     _.each(names, function (name) {
    //       Cards.insert({
    //         name: name,
    //         attr: (this.color + this.score + this.shape + this.quant + this.fill),
    //         score: 0,
    //         color: 'x' | 'y' | 'z',
    //         shape: 'x' | 'y' | 'z',
    //         quant: 'x' | 'y' | 'z',
    //         fill: 'x' | 'y' | 'z'
    //       });
    //     });
    //   };
    // });
    //
    // deck = function deck() {
    //   var cards = [];
    //   for (var c = 0; c < this.color.length; c++) {
    //     for (var s = 0; s < this.shape.length; s++) {
    //       for (var q = 0; q < this.quant.length; q++) {
    //         for (var f = 0; f < this.fill.length; f++) {
    //           cards.push(new card(f + 1, this.color[c], this.suits[s], this.suits[q], this.suits[f]));
    //         }
    //       }
    //     }
    //   }
    //   _.each(cards, function (name) {
    //     Cards.insert({
    //       name: (this.color, this.shape, this.quant, this.fill)
    //     });
    //   });
    //
    // };
    //cards.push(new card(f + 1, this.color[c], this.shape[s], this.quant[q], this.fill[f]))
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