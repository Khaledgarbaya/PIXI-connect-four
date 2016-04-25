/*jshint esversion: 6 */
import EventEmitter from 'events';
import {
  PLAY
}
from '../constants/GameConstants';

class GameStateStore extends EventEmitter {
  constructor (...args) {
    super(...args);
    this.data = {
      type: 1,
      col: 0
    };
  }
  get (key) {
    return this.data[key];
  }

  set (key, value) {
    return (this.data[key] = value);
  }

  emitChange () {
    this.emit(PLAY, this.data);
  }

  addChangeListener (callback) {
    this.on(PLAY, callback, this.data);
  }
}
export default new GameStateStore();