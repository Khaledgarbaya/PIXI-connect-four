import PIXI from 'pixi.js';

const greenIMG = 'green';
const redIMG = 'red';
const yellowIMG = 'yellow';
const emptyIMG = 'empty';
import {
	BOARD_PADDING, BOARD_SIZE, FINISH_SIZE, PIECE_SIZE
}
from "../../constants/BoardConstants";
import {
	NEW_GAME, PLAY_WITH_RED, PLAY_WITH_YELLOW, RED_TURN, YELLOW_TURN
}
from '../../constants/GameConstants';
import GameStateStore from '../../stores/GameStateStore';
import GameStore from '../../stores/GameStore';
import AnimationStore from '../../stores/AnimationStore';


const Sprite = PIXI.Sprite;
const Texture = PIXI.Texture;
const animOffset = 20;
let animPosition = 0;
export default class InGameScene extends Sprite {
	constructor(board) {
		super();
		this.board = board;
		this.renderPIXIBoard(board);
		GameStateStore.addChangeListener(this.onGameStateChangeHandler.bind(this));
		AnimationStore.addChangeListener(this.onAnimationChangeHandler.bind(this));
	}
	onAnimationChangeHandler() {
		this.animatePiece();
	}
	onGameStateChangeHandler() {
		this.board.playAtColWithValue(GameStateStore.get("col"), GameStateStore.get("type"));
	}
	onPieceMouseDown(e) {
		let playingNow = GameStateStore.get("type");
		const {
			target
		} = e;
		const {
			isAnimating, result
		} = this.board;
		if (result) {
			return;
		}
		if (playingNow !== RED_TURN || isAnimating) {
			return;
		}

		if (!this.board.canPlayAt(target.col)) {
			return;
		}
		GameStateStore.set("type", RED_TURN);
		GameStateStore.set("col", target.col);
		GameStateStore.emitChange();
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
		return new Texture.fromImage(PIXI.loader.resources[img].url);
	}

	playWithYellow(board) {
		setTimeout(() => {
			const col = Math.floor((Math.random() * BOARD_SIZE));
			if (!board.canPlayAt(col)) {
				this.playWithYellow(board);
				return;
			}

			GameStateStore.set("type", YELLOW_TURN);
			GameStateStore.set("col", col);
			GameStateStore.emitChange();
		}, 500);
	}

	animatePiece() {
		let playingNow = GameStateStore.get("type");

		const {
			animatedPiece, isAnimating
		} = this.board;

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
			this.board.isAnimating = false;
			// allow next player to play
			playingNow = playingNow === RED_TURN ? YELLOW_TURN : RED_TURN;
			GameStateStore.set("type", playingNow);

			if (this.board.gameHasFinished(animatedPiece.value)) {
				this.renderNewGame(this.board);
				return;
			}


			if (playingNow === YELLOW_TURN && !this.board.result) {
				this.playWithYellow(this.board);
			}
			return;
		}

		pieceSprite.visible = true;
		pieceSprite.y = animPosition;

		animPosition += animOffset;
	}
	renderNewGame(board) {
		this.reset();
	}
	reset() {
		// console.log(EventEmitter.listenerCount(AnimationStore, 'PLAY'));
		// AnimationStore.removeListener("PLAY", this.onAnimationChangeHandler.bind(this));
		// console.log(EventEmitter.listenerCount(AnimationStore, 'PLAY'));
		setTimeout(() => {
			//GameStateStore.set("type", RED_TURN);
			this.renderPIXIBoard();
			GameStore.emitChange();
		}, 500);
	}
	renderPIXIBoardBackground(board) {
		for (let row = 0; row < BOARD_SIZE; row++) {
			for (let col = 0; col < BOARD_SIZE; col++) {
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