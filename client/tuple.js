Template.board.helpers({

  cards: function () {
    if (_.isEmpty(Session.get('deck'))) {
      Session.set('anonGames');
      Tuple.newGame();
    }
    return Session.get('deck');
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
    const path  = null;
    const qty = this.quant.toString();
    const shape = this.shape;
    return Tuple.getPath(qty, shape);
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


Template.cheatButton.helpers({

  cheat: () => {
    return Session.get('cheater');
  },

});


Template.cheatButtonHide.events({

  'click .hide-card-name': (event) => {
    event.preventDefault();
    Session.set('cheater', false);
  },

});


Template.cheatButtonHide.helpers({

  selectedCard: function () {
    var card = Session.get( "selectedCard" );
    return (card && ('string' == typeof(card.name))) ?
      card.name :
      null;
  },

});


Template.cheatButtonShow.events({

  'click .show-card-name': (event) => {
    event.preventDefault();
    Session.set('cheater', true);
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
        const step = Session.get('rules') || 1;
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
        const step = Session.get('rules') || 1;
        return (1 < step) ? true : false;
      },
    });
  },

});
