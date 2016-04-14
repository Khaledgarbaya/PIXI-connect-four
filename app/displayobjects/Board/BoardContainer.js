import PIXI from 'pixi.js';

import greenIMG from '../../img/green.png';
import redIMG from '../../img/red.png';
import yellowIMG from '../../img/yellow.png';
import emptyIMG from '../../img/empty.png';
import {BOARD_PADDING, BOARD_SIZE, FINISH_SIZE, PIECE_SIZE} from "../../constants/BoardConstants";


const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const Texture = PIXI.Texture;

export default class BoardContainer extends PIXI.Container {
	constructor(board) {
		super();
		console.log(BOARD_SIZE);
		this.renderPIXIBoard(board);
	}
	onPieceMouseDown(e) {
		const {
			connect4
		} = this.props;
		const {
			board
		} = connect4;
		const {
			target
		} = e;
		const {
			isAnimating, result
		} = board;
		const {
			playingNow
		} = connect4;

		if (result) {
			return;
		}

		if (playingNow !== RED_TURN || isAnimating) {
			return;
		}

		if (!board.canPlayAt(target.col)) {
			return;
		}

		this.props.dispatch(playWithRed(target.col));
	}

	getTextureByValue(type) {
		let img;

		switch (type) {
			default:
				case 0:
				img = emptyIMG;
			break;
			case 1:
					img = redIMG;
				break;
			case 2:
					img = yellowIMG;
				break;
			case 3:
					img = greenIMG;
				break;
		}

		/* eslint-disable new-cap  */
		return new Texture.fromImage(img);
	}

	playWithYellow(board) {
		setTimeout(() => {
			const col = Math.floor((Math.random() * BOARD_SIZE));
			if (!board.canPlayAt(col)) {
				this.playWithYellow(board);
				return;
			}

			this.props.dispatch(playWithYellow(col));
		}, 500);
	}

	animatePiece() {
		const {
			connect4
		} = this.props;
		const {
			board, playingNow
		} = connect4;
		const {
			animatedPiece, isAnimating
		} = board;

		if (!isAnimating || animatedPiece === null) {
			return;
		}

		let pieceSprite = this.getChildByName(animatedPiece.name);
		const texture = this.getTextureByValue(animatedPiece.value);

		if (pieceSprite === null) {
			pieceSprite = new Sprite(texture);
			this.addChild(pieceSprite);
		} else {
			pieceSprite.texture = texture;
		}

		if (!pieceSprite.movingDirection) {
			pieceSprite.movingDirection = {
				from: animatedPiece.from,
				to: animatedPiece.to,
			};

			animPosition = pieceSprite.movingDirection.from.y;
			pieceSprite.name = animatedPiece.name;
			pieceSprite.x = pieceSprite.movingDirection.from.x;
		}

		if (animPosition > pieceSprite.movingDirection.to.y) {
			delete pieceSprite.movingDirection;
			board.isAnimating = false;

			if (board.gameHasFinished(animatedPiece.value)) {
				this.renderNewGame(board);
				this.renderPIXIBoard(connect4);
				this.renderScore(connect4);
				return;
			}

			if (playingNow === YELLOW_TURN && !board.result) {
				this.playWithYellow(board);
			}
			return;
		}

		pieceSprite.visible = true;
		pieceSprite.y = animPosition;

		animPosition += animOffset;
	}
	renderPIXIBoardBackground(board) {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
      	console.log("rendering col -> ", col, " row -> ", row);
        const piece = board.getPieceAt(row, col);
        let texture = this.getTextureByValue(0);
        let pieceSprite = new Sprite(texture);
        pieceSprite.x = piece.x;
        pieceSprite.y = piece.y;
        pieceSprite.row = row;
        pieceSprite.col = col;
        pieceSprite.name = "empty" + col + "-" + row;
        pieceSprite.interactive = true;
        pieceSprite.visible = true;
        pieceSprite.mousedown = (e) => {
          this.onPieceMouseDown(e);
        };
        this.addChild(pieceSprite);
      }
    }
  }
renderPIXIBoard(board) {
	this.renderPIXIBoardBackground(board);
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const piece = board.getPieceAt(row, col);
        const pieceValue = piece.value;

        let texture = this.getTextureByValue(pieceValue);
        if (board.isAnimatedPiece(row, col)) {
          texture = this.getTextureByValue(0);
        }
        if (texture === emptyIMG) {
          continue;
        }
        let pieceSprite = this.getChildByName(piece.name);
        if (pieceSprite !== null) {
          this.removeChild(pieceSprite);
        }
        pieceSprite = new Sprite(texture);
        pieceSprite.x = piece.x;
        pieceSprite.y = piece.y;
        pieceSprite.row = row;
        pieceSprite.col = col;
        pieceSprite.name = piece.name;
        pieceSprite.interactive = true;
        pieceSprite.visible = true;
        pieceSprite.mousedown = (e) => {
          this.onPieceMouseDown(e);
        };
        this.addChild(pieceSprite);
      }
    }
  }
}