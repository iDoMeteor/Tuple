Meteor.startup(() => {
  if (!Cards.find().count()) {
    console.log('Tuple: Generating initial deck');
    Tuple.insertDeck(Tuple.newDeck());
  }
  if (!Config.find({item: 'points'}).count()) {
    console.log('Tuple: Generating initial point values');
    Config.insert({item: 'points', points: {tuple: 5, fail: 2}});
  }
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
  player.selections = [];
  player.uid = user._id;
  Players.insert(player);
  return user;

});
