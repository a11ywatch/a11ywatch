/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

interface InvalidType {
  index: number;
  domSelector: string;
  selector?: string;
}

interface ExtraConfig {
  lang?: string;
  alt?: string;
}

type FixInvalidReturn = {
  anchor_needs_props: string;
  alt: string;
  head: string;
  textarea: string;
  textinput: string;
  button: string;
  lang: string;
  form_label: string;
};

export const fixInvalid = (
  { index, domSelector, selector }: InvalidType,
  extraConfig: ExtraConfig = { lang: "en", alt: "" }
): FixInvalidReturn => {
  return {
    anchor_needs_props: `
      var emptyLinkContent${index} = document.${domSelector}("${selector}");
      if (emptyLinkContent${index}) {
        emptyLinkContent${index}.setAttribute("title", emptyLinkContent${index}.hostname);
      }
`,
    alt: `
		  var imgElement${index} = document.${domSelector}("${selector}");
      if (imgElement${index}) {
        imgElement${index}.alt = ${
      extraConfig.alt
        ? `"${extraConfig.alt}"`
        : `getHostName(imgAltMissing${index}.src)`
    };      
      }
`,
    head: `
			var title${index} = document.${domSelector}("${selector}");
      var longDescription${index} = document.head.querySelector("[name~=description][content]").content;

      if (title${index}) {
        if(longDescription${index}.length >= 50) {
          longDescription${index} = longDescription${index}.replace(/^((?:[^ ]* ){3}[^ ]*) [\S\s]*/, "$1");
        }
			 	title${index}.innerHTML = longDescription${index};
      }
`,
    form_label: `
            var emptySelectLabel${index} = document.${domSelector}("${selector}");
            if (emptySelectLabel${index}) {
              emptySelectLabel${index}.setAttribute("aria-label", emptyFormLabel${index}.placeholder || emptyFormLabel${index}.name);
            }
`,
    textarea: `
	    var textarea${index} = document.${domSelector}("${selector}");
      if(textarea${index}) {
        textarea${index}.title = textarea${index}.placeholder || textarea${index}.name;
      }
	`,
    textinput: `
			var textinput${index} = document.${domSelector}("${selector}");
      if (textinput${index}) {
			  textinput${index}.name = "label";
      }
`,
    button: `
	    var buttonElement${index} = document.${domSelector}("${selector}");
      if (buttonElement${index}) {
        buttonElement${index}.role = "button";
        buttonElement${index}.setAttribute("aria-label",undefined);
      }
`,
    lang: `
	    var htmlElement${index} = document.${domSelector}("${selector}");
      if (htmlElement${index}) {
		    htmlElement${index}.lang = "${extraConfig.lang}";
      }
`,
  };
};
