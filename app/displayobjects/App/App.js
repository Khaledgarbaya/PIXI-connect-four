import ScaledContainer from '../ScaledContainer/ScaledContainer.js';
import BoardContainer from '../Board/BoardContainer.js';
import Board from '../../model/Board.js';
import RendererStore from '../../stores/RendererStore.js';
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
  }

  addBoard(){
  	const boardModel = new Board();
  	const boardContainer = new BoardContainer(boardModel);
  	this.addChild(boardContainer);
  }

}
