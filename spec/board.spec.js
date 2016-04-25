/*jshint esversion: 6 */
import { expect } from 'chai';

import { RED_TURN, YELLOW_TURN } from '../app/constants/GameConstants';
import { BOARD_SIZE } from '../app/constants/BoardConstants';
import Board from '../app/model/Board.js';

describe('Board', () => {
  const board = new Board();

  describe('initiate', () => {
    it('should initiate board game', () => {
      board.initiate();
      expect(board).to.have.property('pieces');
      expect(board).to.have.property('result');
      expect(board).to.have.property('animatedPiece');
      expect(board).to.have.property('isAnimating');
      expect(Object.keys(board.pieces)).to.have.length(BOARD_SIZE * BOARD_SIZE)
      expect(board.result).to.be.equal(null);
      expect(board.animatedPiece).to.be.equal(null);
      expect(board.isAnimating).to.be.equal(false);
    })
  });

  describe('playAtColWithValue', () => {
    it(`should have ${RED_TURN} after playing at column 0`, () => {
      board.initiate();
      board.playAtColWithValue(0, RED_TURN);

      expect(board.getPieceAt(0, 0)).to.have.property('value');
      expect(board.getPieceAt(0 ,0).value).to.be.equal(RED_TURN);
    });
  });

  describe('animatedPiece', () => {
    it(`should have animatedPiece with row = 0, col = 0 and value = ${RED_TURN}`, () => {
      board.initiate();
      board.playAtColWithValue(0, RED_TURN);

      const { animatedPiece } = board;

      expect(animatedPiece).to.have.property('row');
      expect(animatedPiece).to.have.property('col');
      expect(animatedPiece).to.have.property('value');
      expect(animatedPiece.row).to.be.equal(0);
      expect(animatedPiece.col).to.be.equal(0);
      expect(animatedPiece.value).to.be.equal(RED_TURN);
    });

    it('should return true as animated piece for row = 0 and col = 0', () => {
      expect(board.isAnimatedPiece(0, 0)).to.be.equal(true);
    });

    it('should return false as animated piece for row = 0 and col = 1', () => {
      expect(board.isAnimatedPiece(0, 1)).to.be.equal(false);
    });
  });

  describe('canPlayAt', () => {
    it('should be able to play at col 0', () => {
      board.initiate();

      expect(board.canPlayAt(0)).to.be.equal(true);
    });

    it('should not be able to play at col 0', () => {
      board.initiate();
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(0, YELLOW_TURN);
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(0, YELLOW_TURN);
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(0, YELLOW_TURN);
      board.playAtColWithValue(0, RED_TURN);

      expect(board.canPlayAt(0)).to.be.equal(false);
    });
  });

  describe('gameHasFinished', () => {
    it('should have game finished', () => {
      board.initiate();
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(0, YELLOW_TURN);
      board.playAtColWithValue(1, RED_TURN);
      board.playAtColWithValue(1, YELLOW_TURN);
      board.playAtColWithValue(2, RED_TURN);
      board.playAtColWithValue(2, YELLOW_TURN);
      board.playAtColWithValue(3, RED_TURN);

      const expected = board.gameHasFinished(RED_TURN);
      const { result } = board;

      expect(expected).to.be.equal(true);
      expect(result).to.have.property('type');
      expect(result).to.have.property('game');
      expect(result.type).to.be.equal(RED_TURN);
      expect(result.game).to.have.length(4);
    });

    it('should finish game horizontally', () => {
      board.initiate();
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(0, YELLOW_TURN);
      board.playAtColWithValue(1, RED_TURN);
      board.playAtColWithValue(1, YELLOW_TURN);
      board.playAtColWithValue(2, RED_TURN);
      board.playAtColWithValue(2, YELLOW_TURN);
      board.playAtColWithValue(3, RED_TURN);

      expect(board.gameHasFinishedHorizontally(0, 0, RED_TURN)).to.not.be.equal(null);
    });

    it('should finish game vertically', () => {
      board.initiate();
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(1, YELLOW_TURN);
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(1, YELLOW_TURN);
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(1, YELLOW_TURN);
      board.playAtColWithValue(0, RED_TURN);

      expect(board.gameHasFinishedVertically(0, 0, RED_TURN)).to.not.be.equal(null);
    });

    it('should finish game gameHasFinishedDiagonallyAsc', () => {
      board.initiate();
      board.playAtColWithValue(0, RED_TURN);
      board.playAtColWithValue(1, YELLOW_TURN);
      board.playAtColWithValue(1, RED_TURN);
      board.playAtColWithValue(2, YELLOW_TURN);
      board.playAtColWithValue(2, RED_TURN);
      board.playAtColWithValue(3, YELLOW_TURN);
      board.playAtColWithValue(2, RED_TURN);
      board.playAtColWithValue(3, YELLOW_TURN);
      board.playAtColWithValue(3, RED_TURN);
      board.playAtColWithValue(4, YELLOW_TURN);
      board.playAtColWithValue(3, RED_TURN);

      expect(board.gameHasFinishedDiagonallyAsc(0, 0, RED_TURN)).to.not.be.equal(null);
    });

    it('should finish game gameHasFinishedDiagonallyDesc', () => {
      board.initiate();
      board.playAtColWithValue(6, RED_TURN);
      board.playAtColWithValue(5, YELLOW_TURN);
      board.playAtColWithValue(5, RED_TURN);
      board.playAtColWithValue(4, YELLOW_TURN);
      board.playAtColWithValue(4, RED_TURN);
      board.playAtColWithValue(3, YELLOW_TURN);
      board.playAtColWithValue(4, RED_TURN);
      board.playAtColWithValue(3, YELLOW_TURN);
      board.playAtColWithValue(3, RED_TURN);
      board.playAtColWithValue(2, YELLOW_TURN);
      board.playAtColWithValue(3, RED_TURN);

      expect(board.gameHasFinishedDiagonallyDesc(0, 6, RED_TURN)).to.not.be.equal(null);
    });
  });
});
