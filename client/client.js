Meteor.startup(() => {
  if (!Session.get('tuple')) {
    Tuple.reset();
    Session.set('tuple', 'v1.0.0');
  }
});

Template.alert.onRendered(function () {
  var duration = this.data.duration || 6000;
  var target = this.find('.alert');
  Meteor.setTimeout(function () {
    $(target).hide('fade', function () {
      $(target).alert('close');
    });
  }, duration);
});

Template.board.helpers({

  cards: function () {
    if (_.isEmpty(Session.get('deck'))) {
      Session.set('anonGames');
      Tuple.newGame();
    }
    return Session.get('deck');
  },

});


Template.cheatButton.helpers({

  cheat: () => {
    return Session.get('cheater');
  },

});


Template.cheatButtonShow.events({

  'click .show-card-name': (event) => {
    event.preventDefault();
    Session.set('cheater', true);
  },

});


Template.cheatButtonHide.events({

  'click .hide-card-name': (event) => {
    event.preventDefault();
    Session.set('cheater', false);
  },

});


Template.controls.events({

  'click .control-new-game': (event) => {
    event.preventDefault();
    if (!Meteor.userId()) {
      let games = Session.get('anonGames') || 0;
      if (4 < games) {
        Tuple.popAlert('You may only play 5 games anonymously!', 'danger');
        return;
      } else {
        Session.set('anonGames', ++games);
      }
    } else {
      Session.set('anonGames');
    }
    if (!Session.get('gameOver')) {
      Tuple.popAlert('Leaving game in progress to start new game', 'warning');
    }
    Tuple.newGame();
  },

  'click .control-view-scoreboard': (event) => {
    event.preventDefault();
    Session.set('rules');
    Template.modal.events({
      'click .control-scoreboard-fails': (event) => {
        event.preventDefault();
        Session.set('scoreboard', 'Fails');
        Tuple.switchScoreboard();
      },
      'click .control-scoreboard-finished': (event) => {
        event.preventDefault();
        Session.set('scoreboard', 'Finished');
        Tuple.switchScoreboard();
      },
      'click .control-scoreboard-ratio': (event) => {
        event.preventDefault();
        Session.set('scoreboard', 'Ratio');
        Tuple.switchScoreboard();
      },
      'click .control-scoreboard-started': (event) => {
        event.preventDefault();
        Session.set('scoreboard', 'Started');
        Tuple.switchScoreboard();
      },
      'click .control-scoreboard-time': (event) => {
        event.preventDefault();
        Session.set('scoreboard', 'Time');
        Tuple.switchScoreboard();
      },
      'click .control-scoreboard-tuples': (event) => {
        event.preventDefault();
        Session.set('scoreboard', 'Tuples');
        Tuple.switchScoreboard();
      },
    });
    Tuple.popModal({
      html: Blaze.toHTML(Template.scoreboard),
      title: Blaze.toHTML(Template.scoreboardMenu),
    });
  },

});


Template.board.onCreated(function () {

  this.autorun (() => {
    this.subscribe('config');
  });

  this.autorun (() => {
    const handle = this.subscribe('deck');
    const ready = handle.ready();
    if (ready && !Session.get('deck')) {
      const id = Tuple.newGame();
    }
    if (ready && Session.get('deck')) {
      const tuples = Tuple.numTuples(Session.get('deck'))[0];
      if (!tuples) {
        const remaining = Tuple.drawThree();
        if (!remaining) {
          Tuple.popAlert ('No cards left in deck!', 'info');
        }
      }
    }
  });

});


Template.card.helpers({

  active: function () {
    return (Tuple.isSelected(this._id)) ?
      'card-holder-active' : null;
  },

  color: function () {
    return this.color;
  },

  num: function () {
    return this.num;
  },

  paths: function () {
    let path  = null;
    let qty = this.quant.toString();
    const shape = this.shape;
    paths = Tuple.getPath(qty, shape);
    return paths;
  },

});


Template.card.onRendered(function () {

  const color = this.data.color;
  const fill = this.data.fill;
  const id = this.data._id;
  const num = this.data.num;
  this.$('#svg-' + num).attr(
    'style',
    'fill:' + color +
      '; stroke:' + fill +
      '; stroke-width: 20px;');

});


Template.cardHolder.events({

  'click .card-holder': function (event) {
    event.preventDefault();
    var context = this;
    var svg = Tuple.getSVGfromEvent(event);
    Tuple.selectionCheck(context, svg);
  },

});


Template.cardHolder.onRendered(function () {

  const id = this.data._id;
  const num = this.data.num;
  if (-1 != _.indexOf(Session.get('selectionSet'), id)) {
    $('#ch-' + num).addClass('card-holder-active');
  }

});


Template.cheatButtonHide.helpers({

  selectedCard: function () {
    var card = Session.get( "selectedCard" );
    return (card && ('string' == typeof(card.name))) ?
      card.name :
      null;
  },

});


Template.gameOver.helpers({

  gameOver: () => {
    return Session.get('gameOver');
  },

});


Template.helpButton.events({

  'click .control-rules-show': (event) => {
    event.preventDefault();
    Session.set('scoreboard');
    Session.set('rules', 1);
    Template.modal.events({
      'click .control-rules-next': (event) => {
        event.preventDefault();
        let current = Session.get('rules') || 1;
        Session.set('rules', ++current);
      },
      'click .control-rules-prev': (event) => {
        event.preventDefault();
        let current = Session.get('rules') || 1;
        Session.set('rules', --current);
      },
    });
    Tuple.popModal({
      html: () => {
        const rules = {
          'rules-1': Blaze.toHTML(Template['rules-1']),
          'rules-2': Blaze.toHTML(Template['rules-2']),
          'rules-3': Blaze.toHTML(Template['rules-3']),
          'rules-4': Blaze.toHTML(Template['rules-4']),
          'rules-5': Blaze.toHTML(Template['rules-5']),
          'rules-6': Blaze.toHTML(Template['rules-6']),
          'rules-7': Blaze.toHTML(Template['rules-7']),
          'rules-8': Blaze.toHTML(Template['rules-8']),
        }
        const key = Session.get('rules') || '1'
        return rules['rules-' + key];
      },
      nextClass: 'control-rules-next',
      prevClass: 'control-rules-prev',
      title: 'How to Tuple!',
      next: () => {
        let step = Session.get('rules') || 1;
        return (8 > step) ? true : false;
      },
      nextText: () => {
        const next = {
          'text-1': 'See examples',
          'text-2': 'Color examples',
          'text-3': 'Quantity examples',
          'text-4': 'Shape examples',
          'text-5': 'Non-tuple examples',
          'text-6': 'Scoring rules',
          'text-7': 'About Tuple',
          'text-8': 'About Tuple',
        }
        const key = Session.get('rules') || '1'
        return next['text-' + key];
      },
      prev: () => {
        let step = Session.get('rules') || 1;
        return (1 < step) ? true : false;
      },
    });
  },

});


Template.modal.onRendered(function () {
    const target = this.find('.modal');
    $(target).modal('show');
    $(target).on('hidden.bs.modal', function () {
        $(target).remove();
    });
});


Template.scoreboard.helpers({
  'template': () => {
    const suffix = Session.get('scoreboard') || 'Ratio';
    const board = 'scoreboard' + suffix;
    return board;
  },
});


Template.statsGame.helpers({

  available: () => {
    const deck = Session.get('deck');
    if (deck && Session.get('cheater')) {
      const result = Tuple.numTuples(deck);
      return result[0] + '/' + result[1];
    } else {
      return 'N/A';
    }
  },

  cheat: () => {
    return Session.get('cheater');
  },

  deck: () => {
    const table = Session.get('deck') || [];
    const deck = Session.get('master') || [];
    return table.length + '/' + deck.length;
  },

  fails: () => {
    if (!Session.get('game')) return 0;
    const id = Session.get('game')._id;
    return Tuple.getGameFails(id);
  },

  points: () => {
    if (!Session.get('game')) return 0;
    const id = Session.get('game')._id;
    return Tuple.getGamePoints(id);
  },

  time: () => {
    const game = Session.get('game');
    if (!game) return Tuple.msToTime(0);
    const id = game._id;
    let ms = Tuple.getGameTime(id);
    Session.set('gameTime', ms);
    Meteor.setInterval(() => {
      Session.set('gameTime', Session.get('gameTime') + 1000);
    }, 1000);
    return Tuple.msToTime(Session.get('gameTime'));
  },

  tuples: () => {
    if (!Session.get('game')) return 0;
    const id = Session.get('game')._id;
    return Tuple.getGameTuples(id);
  },

});


Template.statsGame.onCreated(function () {

  this.subscribe('game');

});


Template.statsLifetime.helpers({

  fails: function () {
    return Tuple.getGlobalLifetimeFails();
  },

  games: function () {
    return Tuple.getGlobalLifetimeGames();
  },

  finished: function () {
    return Tuple.getGlobalLifetimeGamesFinished();
  },

  points: () => {
    return Tuple.getGlobalLifetimePoints();
  },

  time: function () {
    return Tuple.msToTime(Tuple.getGlobalTimePlayed());
  },

  tuples: function () {
    return Tuple.getGlobalLifetimeTuples();
  },

});


Template.statsLifetime.onCreated(function () {

  this.subscribe('Lifetime');

});


Template.statsPlayer.helpers({

  fails: function () {
    return Tuple.getPlayerLifetimeFails();
  },

  finished: function () {
    return Tuple.getPlayerGamesFinished();
  },

  name: function () {
    return Tuple.getPlayerName();
  },

  played: function () {
    return Tuple.getPlayerGamesPlayed();
  },

  points: () => {
    return Tuple.getPlayerLifetimePoints();
  },

  time: function () {
    return Tuple.msToTime(Tuple.getPlayerLifetimeTimePlayed());
  },

  tuples: function () {
    return Tuple.getPlayerLifetimeTuples();
  },

});


Template.statsPlayer.onCreated(function () {

  this.subscribe('player');

});


import Shuffle from 'shuffle';
Object.assign(Tuple, {

  cardsLeft: () => {
    let deck = Session.get('deck');
    return (
      deck
      && ('number' == typeof(deck.length))
    ) ? deck.length
      : false;
  },

  checkTuple: () => {
    let gid = (Session.get('game')) ? Session.get('game')._id : 0;
    let isTuple = false;
    let lastCheck = Session.get('lastCheck');
    let now = new Date();
    let pid = Meteor.userId();
    let selection = Session.get('selectionSet');
    let set;
    let state = Tuple.getGameState() || {};
    let timeSinceLast = now - lastCheck;
    let tuple = Tuple.isTuple(selection);
    Meteor.call('tupleIncrementPlayerTimePlayed', pid, timeSinceLast);
    Meteor.call('tupleIncrementGlobalTimePlayed', timeSinceLast);
    Meteor.call('tupleSaveGameState', gid, state);
    Session.set('lastCheck', now);
    $('.card-holder').removeClass('card-holder-active');
    if (tuple) {
      Tuple.popAlert('Tuple!', 'success');
      let deck = Session.get('deck') || [];
      let length = 0;
      let mLength = Session.get('master').length;
      let tuples = 0;
      isTuple = true;
      Meteor.call('tupleIncrementGlobalLifetimeTuples');
      Meteor.call('tupleIncrementGameTuples', gid);
      Meteor.call('tupleIncrementPlayerLifetimeTuples', pid);
      $('body').addClass('tuple', 10, function() {
        $('body').removeClass('tuple', 350);
      });
      _.each(selection, (id) => {
        let card = Cards.findOne({_id: id});
        let num = card.num || 0;
        _.each(deck, (c, k) => {
          if (id == c._id) {
            deck.splice(k, 1);
          }
        });
        $('#svg-' + num).parent().remove();
      });
      Session.set('deck', deck);
      tuples = Tuple.numTuples(deck)[0];
      length = deck.length;
      if (mLength && (!tuples || (12 > length))) {
        remaining = Tuple.drawThree();
      } else if (!mLength && !tuples) {
        Tuple.gameOver(gid, state);
      }
    } else {
      Tuple.popAlert('Failure :(', 'danger');
      $('body').addClass('fail', 10, function() {
        $('body').removeClass('fail', 200);
      });
      Meteor.call('tupleIncrementGlobalLifetimeFails');
      Meteor.call('tupleIncrementGameFails', gid);
      Meteor.call('tupleIncrementPlayerLifetimeFails', pid);
    }
    set = {
      gid: gid,
      uid: pid,
      selection: selection,
      stamp: new Date(),
      tuple: isTuple,
    }
    Meteor.call('tupleUpdatePoints', gid, pid, isTuple);
    Meteor.call('tupleSaveSelectionSets', set);
    Session.set('selectedCard', null);
    Session.set('selectionSet', null);
  },

  drawThree: () => {
    if (!Session.get('master').length) {
      return;
    }
    let newCards = [];
    let master = Session.get('master');
    if (!master.length) return 0;
    let cardsOnTable = Session.get('deck');
    let deck = Shuffle.shuffle({deck: master});
    let length = 0;
    newCards = deck.draw(3);
    length = deck.length;
    cardsOnTable = cardsOnTable.concat(newCards);
    master = deck.cards;
    Session.set('master', master);
    Session.set('deck', cardsOnTable);
    return (
      length
      && ('number' == typeof(length))
    ) ? length
      : false;
  },

  deal: () => {
    let cards = [];
    let deck = Shuffle.shuffle({deck: Tuple.getAllCards()});
    deck.shuffle();
    cards = deck.draw(12);
    Session.set('master', deck.cards);
    Session.set('deck', cards);
    return (
      deck
      && ('number' == typeof(deck.length))
    ) ? deck.length
      : false;
  },

  gameOver: (id, state) => {
    Session.set('gameOver', true);
    let fails = state.game.fails;
    let gid = state.game._id;
    let lastCheck = Session.get('lastCheck');
    let now = new Date();
    let pid = Meteor.userId();
    let points = state.game.points;
    let timeSinceLast = now - lastCheck;
    let tuples = state.game.tuples;
    Meteor.call('tupleSaveGameState', gid, state);
    Meteor.call('tupleSaveScore', {
      fails: fails,
      gid: gid,
      pid: pid,
      points: points,
      time: time,
      tuples: tuples,
    });
    Meteor.call('tupleSaveGameEndTime', gid, now);
    Meteor.call('tupleIncrementPlayerTimePlayed', pid, timeSinceLast);
    Meteor.call('tupleIncrementGlobalTimePlayed', timeSinceLast);
    Meteor.call('tupleIncrementPlayerGamesFinished', pid);
    Meteor.call('tupleIncrementGlobalGamesFinished');
  },

  getGameState: () => {
    return {
      deck: Session.get('deck'),
      game: _.pick(
        Session.get('game'),
        '_id',
        'fails',
        'numPlayers',
        'points',
        'time',
        'tuples',
      ),
      master: Session.get('master'),
      selectedCard: Session.get('selectedCard'),
      selectionSet: Session.get('selectionSet'),
      stamp: new Date(),
    }
  },

  getSVGfromEvent: (event) => {
    let num = $(event.target).attr('id').substr(3);
    let svg = $('#svg-' + num);
    return svg;
  },

  getSVGattribute: (svg, attribute) => {
    let value = $(svg).find('path').attr('style');
    return value;
  },

  initializeGameState: (id) => {
    let game = _.omit(
      Games.findOne(id),
      'players',
      'stamps',
      'state',
      'selections',
      'timeline',
    );
    return Object.assign(game, {
      deck: Session.get('deck'),
      master: Session.get('master'),
      selectedCard: {},
      selectionSet: {},
    });
  },

  isSelected: (id) => {
    let selected = Session.get('selectionSet') || [];
    return (-1 != _.indexOf(selected, id));
  },

  newGame: () => {
    Meteor.call('tupleInstantiateGame', (error, id) => {
      Tuple.selectionClear();
      Session.set('deck');
      Session.set('game');
      Session.set('gameOver');
      Session.set('gameTime', 0);
      Session.set('lastCheck', new Date());
      Session.set('master');
      Tuple.deal();
      state = Tuple.initializeGameState(id);
      Session.set('game', state);
      Meteor.call('tupleSaveGameState', id, state);
    });
  },

  popAlert: (content, type = 'info', duration = 6000) => {
    const data = {
      content: content,
      duration: duration,
      type: type,
    }
    Blaze.renderWithData(Template.alert, data, $('body')[0]);
  },

  reset: () => {
    Session.set('anonGames');
    Session.set('deck');
    Session.set('game');
    Session.set('game');
    Session.set('gameOver');
    Session.set('gameTime');
    Session.set('lastCheck');
    Session.set('master');
    Session.set('rules');
    Session.set('scoreboard');
    Session.set('selectedCard');
    Session.set('selectionSet');
    Session.set('tuple');
  },

  selectionAdd: (id) => {
    let card = Cards.findOne({_id: id});
    let num = card.num;
    let selections = Session.get("selectionSet") || [];
    if (2 < selections.length) {
      Tuple.popAlert('You may only have three cards selected!', 'warning');
      return;
    }
    if (
      _.isEmpty(selections)
        || (-1 == _.indexOf(selections, id))
    ) {
      selections.push(id);
    } else {
      Tuple.popAlert('Card not added to selection');
    }
    $('#ch-' + num).addClass('card-holder-active');
    Session.set("selectionSet", selections);
    if (3 == selections.length) {
      Tuple.checkTuple();
    }
  },

  selectionCheck: (context, svg) => {
    Session.set('selectedCard', context);
    let id = context._id;
    let selected = Session.get('selectionSet') || [];
    if (-1 == _.indexOf(selected, id)) {
      Tuple.selectionAdd(id);
    } else {
      Tuple.selectionRemove(id);
    }
  },

  selectionClear: () => {
    Session.set("selectedCard", null);
    Session.set("selectionSet", null);
    _.each(Session.get('deck'), (card) => {
      Tuple.selectionRemove(card._id);
      $('#ch-' + card.num).removeClass('card-holder-active');
    });
  },

  selectionRemove: (id) => {
    let card = Cards.findOne({_id: id});
    let num = card.num;
    let selections = Session.get("selectionSet") || [];
    if (-1 != _.indexOf(selections, id)) {
      selections = _.without(selections, id);
    }
    $('#ch-' + num).removeClass('card-holder-active');
    Session.set("selectedCard", null);
    Session.set("selectionSet", selections);
  },

  shuffleDeck: () => {
    let deck = Session.get('deck');
    return deck.shuffle();
  },

  svgChangeAttribute: (svg, attribute, value) => {
    $(svg).find('path').attr('style', attribute + ':' + value);
    return;
  },

  switchScoreboard: () => {
    $('.modal').modal('hide');
    Tuple.popModal({
      html: Blaze.toHTML(Template.scoreboard),
      next: false,
      prev: false,
      title: Blaze.toHTML(Template.scoreboardMenu),
    });
  },

});
