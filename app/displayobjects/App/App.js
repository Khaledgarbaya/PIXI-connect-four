import ScaledContainer from '../ScaledContainer/ScaledContainer.js';
import BoardContainer from '../Board/BoardContainer.js';
import Board from '../../model/Board.js';
import GameStore from '../../stores/GameStore';
/**
 * Main App Display Object
 *
 *
 * @exports App
 * @extends ScaledContainer
 */
export default class App extends ScaledContainer {

  constructor(...args) {
    super(...args);

    this.addBoard();
    GameStore.addChangeListener(this.newGameHandler.bind(this));
  }

  addBoard(){
  	const boardModel = new Board();
  	this.boardContainer = new BoardContainer(boardModel);
  	this.addChild(this.boardContainer);
  }

  newGameHandler(){
	this.boardContainer.reset();
  }

}
