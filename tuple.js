Cards = new Mongo.Collection( "cards" );
Game = new Mongo.Collection( "game" ); //will hold players, deck, points, helpers for calculating if a set remains, if a set is valid, timer, etc.
svgTypes = [ 'svgColor', 'svgShape', 'svgQuant', 'svgFill' ];
if ( Meteor.isServer ) {
  Meteor.publish( "cards", function () {
    return Cards.find( {} );
  } );
}