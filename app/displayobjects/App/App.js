import PIXI from 'pixi.js';
import InGameScene from '../Scenes/InGameScene.js';
import HomeScene from '../Scenes/HomeScene.js';
import Board from '../../model/Board.js';
import GameStore from '../../stores/GameStore';
import ScreenStore from '../../stores/ScreenStore';
import RendererStore from '../../stores/RendererStore';

import Assets from '../../model/Assets';

/**
 * Main App Display Object
 *
 *
 * @exports App
 * @extends PIXI.Container
 */

let assets = [];
export default class App extends PIXI.Container {

  constructor(config) {
    super(config.stageWidth, config.stageHeight);
    assets = config.assets;
    this.preloadAssets();
    GameStore.addChangeListener(this.newGameHandler.bind(this));
    ScreenStore.addChangeListener(this.ChangeScreenHandler.bind(this));
  }
  preloadAssets() {
    let loader = PIXI.loader;
    
    Assets.assetList.forEach(item => loader.add(item.name, item.fullPath));
    
    loader.once("complete", this.onAssetsLoaded.bind(this));
    loader.load();
  }
  onAssetsLoaded() {
    ScreenStore.set("nextScreen", new HomeScene());
    ScreenStore.emitChange();
  }
  ChangeScreenHandler() {
    if (this.currentScreen != null) {
      this.removeChild(this.currentScreen);
    }
    this.currentScreen = ScreenStore.get("nextScreen");
    this.addChild(this.currentScreen);
    this.centerElement(this.currentScreen);
  }
  newGameHandler() {
    ScreenStore.set("nextScreen", new HomeScene());
    ScreenStore.emitChange();
  }

  centerElement(displayObject) {
    displayObject.anchor.set(0.5, 0.5);
    const stageCenter = RendererStore.get("stageCenter");
    displayObject.x = stageCenter.x / 2;
    displayObject.y = stageCenter.y / 2;
  }

}