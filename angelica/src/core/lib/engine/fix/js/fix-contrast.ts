/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const fixContrast = ({ message, index, selector, domSelector }: any) => {
  let reasonMessage = "";

  const reccommendedColor = message.match(
    /Recommendation: change text colour to (.*)/
  );
  const reccommendedBackground = message.match(
    /Recommendation: change background to (.*)/
  );

  if (reccommendedBackground) {
    reasonMessage = `
		var elementLowBackgroundContrast${index} = document.${domSelector}("${selector}").parentElement;

      if (elementLowBackgroundContrast${index}) {
        elementLowBackgroundContrast${index}.style.backgroundColor = "${reccommendedBackground[1].slice(
      0,
      -1
    )}";
      }
	`;
  }
  if (reccommendedColor) {
    reasonMessage = `
		var elementLowContrast${index} = document.${domSelector}("${selector}");
      if (elementLowContrast${index}) {
			elementLowContrast${index}.style.color = "${reccommendedColor[1].slice(0, -1)}";
      }
			`;
  }

  return reasonMessage;
};
