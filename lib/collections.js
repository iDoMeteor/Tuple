Cards = new Mongo.Collection('cards');
Config = new Mongo.Collection('config');
Games = new Mongo.Collection('games');
HighScores = new Mongo.Collection('highscores');
Lifetime = new Mongo.Collection('lifetime');
Players = new Mongo.Collection('players');

/**
 * Example objects
 *
 * Card = {
 *  _id: mongo id,
 *  color: string,
 *  fill: string,
 *  name: string,
 *  num: number,
 *  quant: number,
 *  score: number,
 *  shape: string,
 * }
 *
 * Config - Singletons database w/no firm structure
 *
 * Game = {
 *  _id: mongo id,
 *  complete: boolean,
 *  fails: number,
 *  numPlayers: number of players in game,
 *  players: array of player objects,
 *  score: current/final game score,
 *  stamps.end: date,
 *  stamps.start: date,
 *  state: current game state object if game in progress,
 *  timeline: chronological array of game states with time stamps,
 *  tuples: number,
 * }
 *
 * HighScore = {
 *  fails: fails,
 *  gid: mongo id,
 *  numPlayers: number,
 *  pid: mongo id,
 *  playerName: string,
 *  players: array of pids,
 *  score: number,
 *  time: number,
 *  tuples: tuples,
 * }
 *
 * Lifetime - Singletons database w/no firm structure
 *
 * Players = {
 *  email: string,
 *  games: array of played game ids,
 *  lifetime.fails: number,
 *  lifetime.points: number,
 *  lifetime.tuples: number,
 *  name: string,
 *  numGames: number,
 *  uid: meteor user id,
 *  username: string,
 * }
 *
 *
 * */

