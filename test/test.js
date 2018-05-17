'use strict'

const assert = require('assert');

const Player = require('../src/player.js');
const Game = require('../src/game');

describe('Player', function() {
  describe('constructor', function() {
    it('initializes a player', function() {
      const player = new Player('newPlayer');
      assert.equal(player.id, 'newPlayer');
      assert.equal(player.x, 0);
      assert.equal(player.y, 0);
      assert.equal(player.z, 0);
      assert.equal(player.entity, null);
    });
  });

});

describe('Game', function() {
  describe('constructor', function() {
    it('initializes a game', function() {
      const game = new Game('newGame');
      assert.equal(game.name, 'newGame');
      assert.equal(game.state, 0);
      assert.equal(game.chairs, 0);
      assert.equal(game.players.length, 0);
    });
  });

  describe('join and start', function() {
    const socket = {on: () => {} };

    it('can join a game', function() {
      const game = new Game('newGame');
      assert.equal(game.players.length, 0);
      game.addPlayer(new Player('new Player'), socket);
      assert.equal(game.players.length, 1);
    });

    it('can start a game', function() {
      const game = new Game('newGame');

      for(let i = 0; i < 2; i++) {
        assert.equal(game.canStartGame(), false);
        game.addPlayer(new Player('new Player'), socket);
      }
      assert.equal(game.canStartGame(), true);
    });
  });

});

