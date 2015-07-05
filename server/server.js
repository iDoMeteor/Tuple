Meteor.startup(function () {
  Cards.remove({});
  if (Cards.find().count() === 0) {
    var names = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5", "Card 6", "Card 7", "Card 8", "Card 9", "Card 10", "Card 11", "Card 12"];
    _.each(names, function (name) {
      Cards.insert({
        name: name
      });
    });
  }
});