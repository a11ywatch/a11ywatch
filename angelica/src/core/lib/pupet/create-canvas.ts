/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

// use this method in PAGE evaluations to get imgs from dom ONLY USE PLAIN JS HERE: NO LET, CONST
function createCanvasPupet(selector: any) {
  var img = document.querySelector(selector);
  if (img) {
    var canvas = document.createElement("canvas");

    var scaleDown = function (value) {
      if (value > 250) {
        var softScale = value > 1500 ? 1.5 : 1.3;
        var dive = value / softScale / 100;
        return value / dive || 0;
      }
      return value;
    };

    var width = scaleDown(img.width);
    var height = scaleDown(img.height);

    canvas.width = width;
    canvas.height = height;

    try {
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      return { imageToBase64: canvas.toDataURL("image/png"), width, height };
    } catch (e) {
      console.log(e);
      return { imageToBase64: "", width: 0, height: 0 };
    }
  }
  return { imageToBase64: "", width: 0, height: 0 };
}

export { createCanvasPupet };
