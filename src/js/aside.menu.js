import { clearLocalStorage, getById, getLinkToImage } from './helper.module';
import { page } from './index';

export class AsideMenu {
  constructor(selector) {
    this.element = getById(selector);
    this.full = getById('full');
    this.getImages = getById('getImages');
    this.monochromeImage = getById('monochromeImage');
    this.clearImages = getById('clearImages');
    this.searchTown = getById('​​searchTown').value;
  }

  init() {
    const that = this;

    this.full.addEventListener('click', function () {
      page.mainContainer.requestFullscreen();
    });

    this.getImages.addEventListener('click', function () {
      getLinkToImage(that.searchTown)
        .then((url) => page.activeCanvas && page.activeCanvas.drawImg(url));
    });
    
    this.clearImages.addEventListener('click', function () {
      clearLocalStorage();
      alert('Choose canvas: "4*4", "32*32", "128*128" или "512*512"');
    });

    this.monochromeImage.addEventListener('click', function () {
      page.activeCanvas.transformMonochrome();
    });
  }
}
