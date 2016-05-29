/**
 * Meteor Startup
 * */
Meteor.startup( function deck () {

  // Check for deck
  if (!Cards.find().count()) {
    console.log('Tuple: Generating initial deck');
    let deck = Tuple.newDeck();
    Tuple.insertDeck(deck);
  }

  Meteor.publish( "cards", function () {
    return Cards.find({}, {
      limit: 81
    });
  });

});
