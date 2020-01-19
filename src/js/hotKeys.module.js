import { getById } from './helper.module';
import { color, fill, paintColor, line, pencil } from './letConst.module';
import { page } from './index';

export class HotKeys {
  constructor(selector) {
    this.element = getById(selector);
    this.keyShoose = getById('kShoose');
    this.keyPaint = getById('kPaint');
    this.keyLine = getById('kLine');
    this.keyFill = getById('kFill');
    this.keyPencil = getById('kPencil');
  }

  init() {
    const that = this;

    document.addEventListener('keydown', (event) => {
      let instrument;
      const keyShoose = that.keyShoose.value;
      const keyPaint = that.keyPaint.value;
      const keyLine = that.keyLine.value;
      const keyFill = that.keyFill.value;
      const keyPencil = that.keyPencil.value;

      if(event.altKey) {
        switch (event.code) {
          case 'KeyX':
            if (page.hotKeys.element.style.display === 'block') {
              page.hotKeys.element.style.display = 'none';
            } else {
              page.hotKeys.element.style.display = 'block';
            }
            break;
          case `Key${keyShoose}`:
            instrument = color;
            break;
          case `Key${keyPaint}`:
            instrument = paintColor;
            break;
          case `Key${keyLine}`:
            instrument = line;
            break;
          case `Key${keyFill}`:
            instrument = fill;
            break;
          case `Key${keyPencil}`:
            instrument = pencil;
            break; 
          default:
        }
      }
      page.instrumentBox.activateInstrument(instrument);
    });
  }
}
