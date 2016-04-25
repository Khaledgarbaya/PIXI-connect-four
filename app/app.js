/**
 * App.js
 *
 * The main entry point, appends PIXI to the DOM
 * and starts a render and animation loop
 *
 */
/*jshint esversion: 6 */

import './index.html';
import {
	config
}
from '../package.json';
import Renderer from './Renderer/Renderer';
import App from './displayobjects/App/App';
import AnimationStore from './stores/AnimationStore';
import TWEEN from 'tween.js';

const renderer = new Renderer(config.stageWidth, config.stageHeight);
const app = new App(config);

document.body.appendChild(renderer.view);

AnimationStore.addChangeListener(() => TWEEN.update());
renderer.setClearColor(parseInt(config.BackgroundColor));
renderer.addRenderable(app);
renderer.start();