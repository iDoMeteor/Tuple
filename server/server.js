Meteor.startup(function() {
  Cards.remove({});
  if (Cards.find().count() === 0) {
    var names = ["Card 01", "Card 02", "Card 03", "Card 04", "Card 05", "Card 06", "Card 07", "Card 08", "Card 09", "Card 10", "Card 11", "Card 12"];
    _.each(names, function(name) {
      Cards.insert({
        name: name
      });
    });
  }
});
