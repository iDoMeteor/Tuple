Meteor.publish('deck', () => {
  return Cards.find({});
});

Meteor.publish('game', () => {
  return Games.find();
});

Meteor.publish('player', () => {
  return Players.find(
    {pid: this.userId},
    {fields: {admin: 0}},
  );
});

Meteor.publish('lifetime', () => {
  return Lifetime.find({});
});

Meteor.publish('config', () => {
  return Config.find({}, {$fields: {_id: 0}});
});
