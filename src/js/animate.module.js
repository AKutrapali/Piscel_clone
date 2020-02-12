/* eslint-disable no-param-reassign, class-methods-use-this */

import {
  getById, setItemToLocalStorage, getFromLocalStorage, getByClassName,
} from './helper.module';
import { Canvas } from './canvas.module';
import { page } from './index';
import { arrayImgCanvasExample, maxSize} from './letConst.module';

export class AnimateMenu {
  constructor(selector) {
    this.element = getById(selector);
    this.counterCanvas = 0;
    this.arrayImgCanvas = [];
    this.img = "";
    this.arrayImgCanvasExample = arrayImgCanvasExample;
    this.loadSaveImage = getById('loadSaveImage');
    this.createNewImage = getById('createNewImage');
    this.createDuplicateImage = getById('createDuplicateImage');
    this.deleteImage = getById('deleteImage');
    this.saveImage = getById('saveImage');
    this.example = getById('example');
    this.runImage = getById('runImage');
    this.animateItemContainer = getById('animateItemContainer');
    this.buttonsCanvas = getByClassName('button_canvas');
    this.addingCanvas = getById('addingCanvas');
    this.runImage = getById('runImage');
    this.runI = "";
  }

  createImage() {
    const size = prompt('Введите размер канваса', 32);
    const canvas = new Canvas(`can${size}`, maxSize / size);
    page.animateMenu.createButtonCanvas();
    page.chooseActiveCanvas(canvas, `li${size}`);
    page.markSizeButtonAsActive(`button${size}`);
    page.activeCanvas.init();
    page.animateMenu.saveImageCan();
  }

  saveImageCan() {
    page.animateMenu.arrayImgCanvas[page.animateMenu.counterCanvas] = page.activeCanvas.element.toDataURL();
    setItemToLocalStorage('arrayImgCanvas', JSON.stringify(page.animateMenu.arrayImgCanvas));
  }

  createButtonCanvas() {
    const button = document.createElement('div');

    if (page.animateMenu.buttonsCanvas) {
      page.animateMenu.counterCanvas = page.animateMenu.buttonsCanvas.length + 1;
    } else {
      page.animateMenu.counterCanvas = 1;
    }
    button.className = 'button_canvas';
    button.id = `imgCanvas${page.animateMenu.counterCanvas}`;
    button.innerText = `${page.animateMenu.counterCanvas}`;
    this.animateItemContainer.append(button);
  }

  createPreviewImage() {
    this.img = document.createElement('img');
    this.element.append(this.img);
    this.animateItemContainer.append(this.img);
  }

  deleteButtonCanvas() {
    const deleteBlock = document.getElementById(`imgCanvas${page.animateMenu.counterCanvas}`);
    const that = this;

    deleteBlock.style.background = 'red';
    const delBlock = () => deleteBlock.remove();
    setTimeout(delBlock, 500);
    page.animateMenu.arrayImgCanvas.splice(page.animateMenu.counterCanvas, 1);
    page.animateMenu.counterCanvas -= 1;
    page.animateMenu.buttonsCanvas.forEacth((item) => {
      if (item.innerText > that.counterCanvas) {
        item.innerText -= 1;
        item.id = `imgCanvas${item.innerText}`;
      }
    });
  }

  addingCan() {
    if (event.target.innerText > 0) {
      page.animateMenu.counterCanvas = event.target.innerText;
      page.animateMenu.img.src = page.animateMenu.arrayImgCanvas[page.animateMenu.counterCanvas];
      page.activeCanvas.context.drawImage(page.animateMenu.img, 0, -0.05);
    }
  }

  runImageFunction(arrayImg) {
    const that = this;

    if (page.animateMenu.runImage.innerText === 'Run') {
      const speedImage = prompt('Введите скорость (от 1 до 20 кадр/сек.)', 3);
      let counter = 1;
      // eslint-disable-next-line no-inner-declarations
      function runImg() {
        page.animateMenu.img.src = arrayImg[counter];
        page.activeCanvas.context.drawImage(that.img, 0, -0.05);
        counter += 1;
        if (counter === arrayImg.length) counter = 1;
      }
      page.activeCanvas.runI = setInterval(runImg, 1000 / speedImage);
      page.animateMenu.runImage.innerText = 'Stop';
    } else {
      page.activeCanvas.runI = clearInterval(page.activeCanvas.runI);
      page.animateMenu.runImage.innerText = 'Run';
    }
  }

  colorButtonExample() {
    let counter = 0;

    function colorButtonExample2() {
      const colorExample = ['red', 'yellow', 'green', 'blue', 'purple'];
      this.example.style.color = colorExample[counter];
      counter += 1;
      if (counter === colorExample.length) counter = 0;
    }
    setInterval(colorButtonExample2, 200);
  }

  loadLocalStorageAnimation() {
    const loadClear = prompt('Загрузить или очистить предыдущий сеанс? L/C', 'L');
    
    if (loadClear === 'L') {
      page.animateMenu.arrayImgCanvas = [];
      page.animateMenu.arrayImgCanvas = JSON.parse(getFromLocalStorage('arrayImgCanvas'));
      const size = 32;
      const canvas = new Canvas(`can${size}`, maxSize / size);
      page.chooseActiveCanvas(canvas, `li${size}`);
      for (let counter = 1; counter < page.animateMenu.arrayImgCanvas.length; counter += 1) {
        page.animateMenu.createButtonCanvas();
      }
    } else if (loadClear === 'C') {
      setItemToLocalStorage('arrayImgCanvas', JSON.stringify([]));
      page.animateMenu.arrayImgCanvas = [];
    }
  }


  init() {
    const that = this;
    this.createPreviewImage();
    this.colorButtonExample();
    
    this.loadSaveImage.addEventListener('click', that.loadLocalStorageAnimation );

    this.createNewImage.addEventListener('click', that.createImage);

    this.createDuplicateImage.addEventListener('click', function () {
      const duplicateNumber = prompt('Введите номер дубликата', 3);
      that.createImage();
      that.img.src = that.arrayImgCanvas[duplicateNumber];
      that.arrayImgCanvas[that.counterCanvas] = that.arrayImgCanvas[duplicateNumber];
      page.activeCanvas.context.drawImage(that.img, 0, -0.05);
    });

    this.deleteImage.addEventListener('click', that.deleteButtonCanvas);

    this.saveImage.addEventListener('click', that.saveImageCan);

    this.addingCanvas.addEventListener('click', that.addingCan); 

    this.runImage.addEventListener('click', function() {
      that.runImageFunction(page.animateMenu.arrayImgCanvas)
    });

    this.example.addEventListener('click', function() {
      const size = 32;
      const canvas = new Canvas(`can${size}`, maxSize / size);
      page.chooseActiveCanvas(canvas, `li${size}`);
      that.runImageFunction(that.arrayImgCanvasExample);
    });
  }
}