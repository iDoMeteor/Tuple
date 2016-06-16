Meteor.publish('deck', () => {
  return Cards.find({});
});

Meteor.publish('game', (id) => {
  return Games.find();
});

Meteor.publish('player', () => {
  return Players.find(
    {pid: this.userId},
    {fields: {admin: 0}},
  );
});

Meteor.publish('Lifetime', () => {
  return Lifetime.find({});
});

Accounts.onCreateUser(function (options, user) {

  let player = {};
  if (0 == Meteor.users.find().count()) {
    user.admin = true;
    player.admin = true;
  }
  if (user && user.emails && user.emails[0].address) {
    let x = user.emails[0].address.indexOf('@');
    player.email = user.emails[0].address;
    player.name = user.emails[0].address.substr(0,x);
  }
  if (user && user.username) {
    player.name = user.username;
    player.username = user.username;
  }
  player.games = [];
  player.lifetime = {};
  player.lifetime.fails = 0;
  player.lifetime.points = 0;
  player.lifetime.tuples = 0;
  player.numGames = 0;
  player.uid = user._id;
  Players.insert(player);
  return user;

});

Meteor.startup( function deck () {

  // Check for deck
  if (!Cards.find().count()) {
    console.log('Tuple: Generating initial deck');
    let deck = Tuple.newDeck();
    Tuple.insertDeck(deck);
  }

});
