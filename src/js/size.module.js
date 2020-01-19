import { Canvas } from './canvas.module';
import { page } from './index';
import { getByClassName, getById, getFromLocalStorage } from './helper.module';
import { maxSize } from './letConst.module';

export class SizeBox {
  constructor(selector) {
    // eslint-disable-next-line prefer-destructuring
    this.element = getByClassName(selector)[0];
    this.button4 = getById('button4');
    this.button32 = getById('button32');
    this.button128 = getById('button128');
    this.button512 = getById('button512');
  }

  init() {
    this.element.addEventListener('click', function() {
      const targetEl = event.target;

      if (targetEl.className === 'size') {
        const { size } = targetEl.dataset;
        const canvas = new Canvas(`can${size}`, maxSize / size);

        page.chooseActiveCanvas(canvas, `li${size}`);
        page.markSizeButtonAsActive(`button${size}`);
        page.activeCanvas.init(getFromLocalStorage('linkToImage'));
      }
    });
  }
}
