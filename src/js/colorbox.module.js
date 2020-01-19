import { getByClassName, getById } from './helper.module';

export class ColorBox {
  constructor(selector) {
    this.element = getById(selector);
    this.colors = getByClassName('color');
    this.activeColor = "";
    this.currentColor = getById('current');
    this.previousColor = getById('previous');
  }

  init() {
    const that = this;

    this.element.addEventListener('click', (event) => {
      if (event.target.id !== 'color_palette') {
        that.activeColor = getComputedStyle(event.target.firstChild.nextSibling).backgroundColor;
        for (let counter = 0; counter < that.colors.length; counter++) {
          that.colors[counter].classList.remove('active');
        }
        event.target.classList.add('active');
        that.previousColor.style.background = that.currentColor.style.background;
        that.currentColor.style.background = that.activeColor;
      }
    });
  }
}
