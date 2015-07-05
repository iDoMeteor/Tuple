if (Meteor.isClient) {
  Template.board.helpers({
    cards: function() {
      return Cards.find({}, {
        sort: {
          name: 1
        }
      });
    },
    selectedName: function() {
      var card = Cards.findOne(Session.get("selectedPlayer"));
      return card && card.name;
    }
  });

  Template.board.events({
    'click .inc': function() {
      Cards.update(Session.get("selectedPlayer"), {
        $inc: {
          score: 5
        }
      });
    }
  });

  Template.card.helpers({
    selected: function() {
      return Session.equals("selectedPlayer", this._id) ? "selected" : '';
    }
  });

  Template.card.events({
    'click': function() {
      Session.set("selectedPlayer", this._id);
    }
  });
};
