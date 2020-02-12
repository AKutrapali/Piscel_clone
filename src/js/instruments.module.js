import { getByClassName, getById } from './helper.module';

export class InstrumentBox {
  constructor(selector) {
    this.element = getById(selector);
    this.instruments = getByClassName('instrument_box');
    this.activeInstrument = "";
    this.lineWidth = "";
  }

  activateInstrument(instrumentName) {
    for (let counter = 0; counter < this.instruments.length; counter++) {
      if (this.instruments[counter].innerText === instrumentName) {
        this.activeInstrument = instrumentName;
        this.instruments[counter].classList.add('active');
      } else {
        this.instruments[counter].classList.remove('active');
      }
    }
  }

  init() {
    const that = this;

    this.element.addEventListener('click', (event) => {
      if (event.target.localName === 'div' || event.target.localName === 'img') {
        that.activateInstrument(event.target.innerText);
        if (event.target.innerText === 'Pencil') {
          that.lineWidth = prompt('Введите толщину линии, от 1 до 5', 3);
        }
      }
    });
  }
}
