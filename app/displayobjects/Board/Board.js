import PIXI from 'pixi.js';
import {BOARD_PADDING, DEFAULT_BOARD_SIZE, FINISH_SIZE, PIECE_SIZE} from "../constants/BoardConstant.js"


class Board extends extends PIXI.Container {
	constructor(col=DEFAULT_BOARD_SIZE, row=DEFAULT_BOARD_SIZE) {
		this.boardCol = col;
		this.boardRow = row;
	}

	
}