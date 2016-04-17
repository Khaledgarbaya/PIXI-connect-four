import greenIMG from '../img/green.png';
import emptyIMG from '../img/empty.png';
import panelIMG from '../img/panel.png';
import playBtnIMG from '../img/playBtn.png';
import redIMG from '../img/red.png';
import yellowIMG from '../img/yellow.png';

class Assets{
	constructor() {
		this.assetList = [];
		this.assetList.push({name: 'empty', fullPath: emptyIMG});
		this.assetList.push({name: 'green', fullPath: greenIMG});
		this.assetList.push({name: 'panel', fullPath: panelIMG});
		this.assetList.push({name: 'playBtn', fullPath: playBtnIMG});
		this.assetList.push({name: 'red', fullPath: redIMG});
		this.assetList.push({name: 'yellow', fullPath: yellowIMG});
	}

}

export default new Assets();

