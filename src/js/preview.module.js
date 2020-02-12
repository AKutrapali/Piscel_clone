import { getById } from './helper.module';

export class PreviewPages {
  constructor(selector) {
    this.element = getById(selector);
    this.startButton = getById('startButton');
    this.wrapper = getById('wrapper');
  }

  init() {
    const that = this;
    
    this.startButton.addEventListener('click', function() {
      that.element.style.display = 'none';
      that.wrapper.style.display = 'block';
    });
  }
}
