import { page } from './index';
import { color, fill, line, pencil, frame, maxSize  } from './letConst.module';

export class Canvas {
  constructor(id, unit) {
    this.id = id;
    this.unit = unit;
    this.element = document.getElementById(this.id);
    this.context = this.element.getContext('2d');
  }

  paint() {
    for (let counter = 0; counter < (maxSize / this.unit); counter++) {
      for (let counterSecond = 0; counterSecond < (maxSize / this.unit); counterSecond++) {
        if ((counter + counterSecond) % 2 === 0) {
          this.context.fillStyle = '#528ad3';
        } else {
          this.context.fillStyle = '#742f70';
        }
        this.context.fillRect(counterSecond, counter, 1, 1);
      }
    }
  }

  drawImg(url) {
    this.context.fillStyle = page.colorBox.activeColor;
    this.context.fillRect(0, 0, maxSize / this.unit, maxSize / this.unit);
    this.context.fill();

    const image = new Image();

    image.crossOrigin = 'Anonymous';
    image.src = url;
    image.onload = () => {
      if (image.width > image.height) {
        this.context.drawImage(image, 0, (maxSize - ((maxSize * image.height) / image.width)) / (2 * this.unit), maxSize / this.unit, (((maxSize * image.height) / image.width) / this.unit));
      } else {
        this.context.drawImage(image, (maxSize - ((maxSize * image.width) / image.height)) / (2 * this.unit), 0, (((maxSize * image.width) / image.height) / this.unit), maxSize / this.unit);
      }
    };
  }

  addEventListeners() {
    const that = this;
    this.context.imageSmoothingEnabled = false;
    this.context.mozImageSmoothingEnabled = false;
    this.context.oImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;

    function paint(event) {
      const x = event.offsetX / that.unit;
      const y = event.offsetY / that.unit;
      let lWidth = (page.instrumentBox.lineWidth * maxSize) / (that.unit * 100);

      if (lWidth < 0.5) lWidth = 0.5;
      that.context.fillStyle = page.colorBox.activeColor;
      that.context.fillRect(x, y, lWidth, lWidth);
      that.context.fill();
    }

    function moveStart(event) {
      that.context.beginPath();

      const xStart = event.offsetX / that.unit;
      const yStart = event.offsetY / that.unit;

      that.context.moveTo(xStart, yStart);
      that.context.strokeStyle = page.colorBox.activeColor;
      that.context.lineWidth = '1';
    }

    function moveEnd(event) {
      const xFinish = event.offsetX / that.unit;
      const yFinish = event.offsetY / that.unit;

      that.context.lineTo(xFinish, yFinish);
      that.context.lineCap = 'butt';
      that.context.stroke();
    }

    function chooseColor(event) {
      const x = event.offsetX / that.unit;
      const y = event.offsetY / that.unit;
      const imgData = that.context.getImageData(x, y, 1, 1).data;
      const R = imgData[0];
      const G = imgData[1];
      const B = imgData[2];
      const rgb = `${R},${G},${B}`;

      page.colorBox.previousColor.style.background = page.colorBox.currentColor.style.background;
      page.colorBox.currentColor.style.background = `RGB(${rgb})`;
    }

    function addFrame() {
      const frameOffset = 0 * maxSize / (page.activeCanvas.unit * 100);
    
      that.context.beginPath();
      that.context.strokeStyle = page.colorBox.activeColor;
      that.context.lineWidth = 25 / page.activeCanvas.unit;
      that.context.rect(frameOffset, frameOffset, maxSize / page.activeCanvas.unit, maxSize / page.activeCanvas.unit);
      that.context.stroke();
      that.context.beginPath();
    }

    this.element.onmousedown = function (event) {
      switch (page.instrumentBox.activeInstrument) {
        case pencil:
          paint(event);
          // eslint-disable-next-line no-shadow
          that.element.onmousemove = function (event) {
            paint(event);
          };
          break;
        case line:
          moveStart(event);
          break;
        case color:
          chooseColor(event);
          break;
        case fill:
          that.context.fillStyle = page.colorBox.activeColor;
          that.context.fillRect(0, 0, maxSize / that.unit, maxSize / that.unit);
          that.context.fill();
          break;
        case frame:
          addFrame();
          break;
        default:
      }
    };

    this.element.onmouseup = function (event) {
      if (page.instrumentBox.activeInstrument === line) {
        moveEnd(event);
      }
      that.element.onmousemove = null;
    };

    
  }

  transformMonochrome() {
    for (let counter = 0; counter < (maxSize / this.unit); counter++) {
      for (let secondCounter = 0; secondCounter < (maxSize / this.unit); secondCounter++) {
        const imgData = this.context.getImageData(secondCounter, counter, 1, 1).data;
        const R = imgData[0] * 0.3;
        const G = imgData[1] * 0.59;
        const B = imgData[2] * 0.11;
        const avg = R + G + B;
        const rgb = `${avg},${avg},${avg}`;

        this.context.fillStyle = `rgb(${rgb})`;
        this.context.fillRect(secondCounter, counter, 1, 1);
      }
    }
  }

  init(imgUrl) {
    this.paint();

    if (imgUrl) {
      this.drawImg(imgUrl);
    }

    this.addEventListeners();
  }
}
