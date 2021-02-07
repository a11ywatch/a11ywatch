/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const fixNesting = ({ index, domSelector, selector }: any) => {
  return {
    h5_h2: `
    var properH2Element${index} = document.createElement("h2");
    var improperh5Element${index} = document.${domSelector}("${selector}");

    if (properH2Element${index}) {
		  properH2Element${index}.innerHTML = improperh5Element${index}.innerHTML;
    }
    if (improperh5Element${index}) {
		  improperh5Element${index}.parentNode.replaceChild(properH2Element${index}, improperh5Element${index});
    }
`,
  };
};
