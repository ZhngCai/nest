/** @format */

import { createDivElement, createSpanElement, jsDocument } from "../util/jsdom";

export const nodeEnvSystem: CFEnvSystem = {
  newDiv(): HTMLElement {
    return createDivElement();
  },
  newSpan(): HTMLSpanElement {
    return createSpanElement();
  },
  newTextNode(text: string): Text {
    return jsDocument.createTextNode(text);
  },
  decodeBase64(text): string {
    return atob(text);
  },
};
