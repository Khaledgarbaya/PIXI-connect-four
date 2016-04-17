import PIXI from 'pixi.js';
import InGameScene from './InGameScene.js';
import Board from '../../model/Board.js';
import ScreenStore from '../../stores/ScreenStore';

const Sprite = PIXI.Sprite;

const panelIMG = 'panel';
const plyBtnIMG = 'playBtn';
import {
	config
}
from '../../../package.json';
export default class HomeScene extends Sprite {

	constructor() {
		super();
		this.renderUI();
	}

	renderUI() {
		this.panel = new Sprite.fromImage(PIXI.loader.resources[panelIMG].url);
		this.playButton = new Sprite.fromImage(PIXI.loader.resources[plyBtnIMG].url);

		this.addChild(this.panel);
		this.addChild(this.playButton);

		// play button 
		this.playButton.y = this.panel.height - 40;
		this.playButton.x = this.panel.width / 2 - this.playButton.width / 2;
		this.playButton.buttonMode = true;
		this.playButton.interactive = true;
		this.playButton.mouseup = this.playButtonClickHandler;
		const buttonText = new PIXI.Text(config.texts.playBtn, {
			font: 'bold 32px Arial',
			fill: 0xffffff,
			align: 'center',
			dropShadow: true,
			dropShadowDistance: 1
		});
		this.playButton.addChild(buttonText);
		buttonText.x = this.playButton.width / 2 - buttonText.width / 2;
		buttonText.y = this.playButton.height / 2 - buttonText.height / 2;

		//panel UI
		const panelTitleText = new PIXI.Text(config.texts.panel_title, {
			font: 'bold 40px Arial',
			fill: 0x3e3e3e,
			align: 'center',
			dropShadow: true,
			dropShadowDistance: 1
		});
		this.panel.addChild(panelTitleText);

		panelTitleText.x = this.panel.width / 2 - panelTitleText.width / 2;
		panelTitleText.y = panelTitleText.height;

		const panelText = new PIXI.Text(config.texts.panel_desc, {
			font: '20px Arial',
			fill: 0x3e3e3e,
			align: 'center',
			dropShadow: true,
			dropShadowDistance: 0
		});
		this.panel.addChild(panelText);

		panelText.x = this.panel.width / 2 - panelText.width / 2;
		panelText.y = this.panel.height / 2 - panelText.height / 2;
	}
	playButtonClickHandler(mouseData){
		const boardModel = new Board();
		const inGameScene = new InGameScene(boardModel);
		ScreenStore.set("nextScreen", inGameScene);
		ScreenStore.emitChange();
	}

}