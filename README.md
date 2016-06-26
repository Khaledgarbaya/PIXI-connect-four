```
 _____                             _       ___   _____                       
/  __ \                           | |     /   | |  __ \                      
| /  \/ ___  _ __  _ __   ___  ___| |_   / /| | | |  \/ __ _ _ __ ___   ___  
| |    / _ \| '_ \| '_ \ / _ \/ __| __| / /_| | | | __ / _` | '_ ` _ \ / _ \ 
| \__/\ (_) | | | | | | |  __/ (__| |_  \___  | | |_\ \ (_| | | | | | |  __/ 
 \____/\___/|_| |_|_| |_|\___|\___|\__|     |_/  \____/\__,_|_| |_| |_|\___| 
```
## Intorduction

A connect four game using PIXI js.
This project started with PIXI js bilerplate https://github.com/edwinwebb/pixi-seed for easy setup

Some assets are used downloaded from this link http://graphicburger.com/mobile-game-gui/
Use for business may require a license.

## How does it work

To understand how the game works let's get back first to how PIXI js is working. It similar to the Flash display list system. So you add a child to be displayed and rendered and you remove it when you no longer needs it to be displayed, the difference however is the rendering in PIXI js needs to be done manually, so you loop through all your display object and call the their render method. I solved this ,thanks to the PIXI-seed, byr having a central renderer that you can add and remove renderable item to it and the renderer will take care of renderind the display objects each frame.
For Exchanging data between different components inside the game I used a simple Store implementation, so whenever you change the data the store will emit a change event and every component subscribed to that Store will get notified. An example of that would be `AnimationStore.addChangeListener(() => TWEEN.update());` that way we can update TWEEN every frame. Also a good use for Store is for tracking the game state and infom the board about which move was done by the user.
The last point here would be speration of concerns to better control the game state for example in the game board data is completely seperate from the rendering the board, this make your game better tesable and beeing able to change one component without affecting the other one, for example animation.

## Getting started

You can configure some app settings in package.json

```json
"config": {
  "buildDir": "./build",
  "stageWidth": 1024,
  "stageHeight": 768
}
```
## npm scripts

* `npm start` - Build and start the app in development mode at http://localhost:8080
* `npm run build` - Run a production build, outputs to ./build/
* `npm run test` - run the unit test
* `npm run lint` - Lint your code
