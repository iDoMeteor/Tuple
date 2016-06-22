Template.scoreboard.helpers({
  'template': () => {
    const suffix = Session.get('scoreboard') || 'Ratio';
    const board = 'scoreboard' + suffix;
    return board;
  },
});

