Meteor.startup(() => {
  if (!Session.get('tuple')) {
    Tuple.reset();
    Session.set('tuple', 'v1.0.0');
  }
});

import Shuffle from 'shuffle';
Object.assign(Tuple, {

  cardsLeft: () => {
    const deck = Session.get('deck');
    return (
      deck
      && ('number' == typeof(deck.length))
    ) ? deck.length
      : false;
  },

  checkTuple: () => {
    const gid = (Session.get('game')) ? Session.get('game')._id : 0;
    const lastCheck = Session.get('lastCheck');
    const now = new Date();
    const pid = Meteor.userId();
    const selection = Session.get('selectionSet');
    const state = Tuple.getGameState() || {};
    const timeSinceLast = now - lastCheck;
    const tuple = Tuple.isTuple(selection);
    let isTuple = false;
    let set;
    Meteor.call('tupleIncrementPlayerTimePlayed', pid, timeSinceLast);
    Meteor.call('tupleIncrementGlobalTimePlayed', timeSinceLast);
    Meteor.call('tupleSaveGameState', gid, state);
    Session.set('lastCheck', now);
    $('.card-holder').removeClass('card-holder-active');
    if (tuple) {
      Tuple.popAlert('Tuple!', 'success');
      const deck = Session.get('deck') || [];
      const mLength = Session.get('master').length;
      let length = 0;
      let tuples = 0;
      isTuple = true;
      Meteor.call('tupleIncrementGlobalLifetimeTuples');
      Meteor.call('tupleIncrementGameTuples', gid);
      Meteor.call('tupleIncrementPlayerLifetimeTuples', pid);
      $('body').addClass('tuple', 10, function() {
        $('body').removeClass('tuple', 350);
      });
      _.each(selection, (id) => {
        const card = Cards.findOne({_id: id});
        const num = card.num || 0;
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
    const deck = Shuffle.shuffle({deck: master});
    let cardsOnTable = Session.get('deck');
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
    const deck = Shuffle.shuffle({deck: Tuple.getAllCards()});
    let cards = [];
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
    const fails = state.game.fails;
    const gid = state.game._id;
    const lastCheck = Session.get('lastCheck');
    const now = new Date();
    const pid = Meteor.userId();
    const points = state.game.points;
    const timeSinceLast = now - lastCheck;
    const tuples = state.game.tuples;
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
    const num = $(event.target).attr('id').substr(3);
    return $('#svg-' + num);
  },

  getSVGattribute: (svg, attribute) => {
    return $(svg).find('path').attr('style');
  },

  initializeGameState: (id) => {
    const game = _.omit(
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
    const selected = Session.get('selectionSet') || [];
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
    const card = Cards.findOne({_id: id});
    const num = card.num;
    const selections = Session.get("selectionSet") || [];
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
    const id = context._id;
    const selected = Session.get('selectionSet') || [];
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
    const card = Cards.findOne({_id: id});
    const num = card.num;
    let selections = Session.get("selectionSet") || [];
    if (-1 != _.indexOf(selections, id)) {
      selections = _.without(selections, id);
    }
    $('#ch-' + num).removeClass('card-holder-active');
    Session.set("selectedCard", null);
    Session.set("selectionSet", selections);
  },

  shuffleDeck: () => {
    const deck = Session.get('deck');
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
