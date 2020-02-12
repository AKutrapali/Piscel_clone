import { getById, getByClassName } from './helper.module';
import { SizeBox } from './size.module';
import { InstrumentBox} from './instruments.module';
import { ColorBox } from './colorbox.module';
import { AsideMenu } from './aside.menu';
import { AnimateMenu } from './animate.module';
import { PreviewPages } from './preview.module';
import { HotKeys } from './hotKeys.module';

export class Page {
  constructor(selector) {
    this.element = getById(selector);
    this.sizeBox = new SizeBox('size_piskels');
    this.instrumentBox = new InstrumentBox('instruments');
    this.colorBox = new ColorBox('color_palette');
    this.asideMenu = new AsideMenu('aside_menu');
    this.animateMenu = new AnimateMenu('addingCanvas');
    this.previewPages = new PreviewPages('previewWrapper');
    this.hotKeys = new HotKeys('hotKeys');
    this.activeCanvas = "";
    this.li4 =getById('li4');
    this.li32 =getById('li32');
    this.li128 =getById('li128');
    this.li512 =getById('li512');
    this.mainContainer = getById('main_container');
    this.carouselItems = getByClassName('carousel_item');
  }

  chooseActiveCanvas(canvas, parentLi) {
    this.activeCanvas = canvas;
    for (let counter = 0; counter < this.carouselItems.length; counter++) {
      this.carouselItems[counter].style.display = 'none';
    }
    this[parentLi].style.display = 'flex';
  }

  markSizeButtonAsActive(idButton) {
    const sizeBoxes = getByClassName('size');

    for (let counter = 0; counter < sizeBoxes.length; counter++) {
      sizeBoxes[counter].classList.remove('active');
    }
    this.sizeBox[idButton].classList.add('active');
  }

  init() {
    this.previewPages.init();
    this.sizeBox.init();
    this.instrumentBox.init();
    this.colorBox.init();
    this.asideMenu.init();
    this.animateMenu.init();
    this.hotKeys.init();
  }
}
