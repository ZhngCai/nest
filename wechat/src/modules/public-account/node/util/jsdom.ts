/** @format */
import * as jsdom from 'jsdom';
const { JSDOM } = jsdom;

const jsWindow = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
</body>
</html>`).window;
const jsDocument = jsWindow.document;

function createDivElement() {
  const divDom = jsDocument.createElement('div');
  if (!divDom.__proto__.hasOwnProperty('innerText')) {
    Object.defineProperties(divDom.__proto__, {
      innerText: {
        enumerable: true,
        get: function () {
          return this.textContent;
        },
        set: function (arg) {
          this.textContent = arg;
          this.innerText = arg;
        },
      },
    });
  }
  const spanDom = jsDocument.createElement('span');
  if (!spanDom.__proto__.hasOwnProperty('innerText')) {
    Object.defineProperties(spanDom.__proto__, {
      innerText: {
        enumerable: true,
        get: function () {
          return this.textContent;
        },
        set: function (arg) {
          this.textContent = arg;
        },
      },
    });
  }
  return divDom;
}

function createSpanElement() {
  const spanDom = jsDocument.createElement('span');
  if (!spanDom.__proto__.hasOwnProperty('innerText')) {
    Object.defineProperties(spanDom.__proto__, {
      innerText: {
        enumerable: true,
        get: function () {
          return this.textContent;
        },
        set: function (arg) {
          this.textContent = arg;
        },
      },
    });
  }
  return spanDom;
}

export { jsWindow, jsDocument, createDivElement, createSpanElement };
