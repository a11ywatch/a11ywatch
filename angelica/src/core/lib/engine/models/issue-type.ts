/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const EMPTY_HEAD_TITLE_TYPE =
  "The title element in the head section should be non-empty.";

const INVALID_HTML_PROPS = {
  ignored: {
    img: "Img element is marked so that it is ignored by Assistive Technology.",
  },
  lang:
    "The html element should have a lang or xml:lang attribute which describes the language of the document.",
  anchor_needs_props:
    "Anchor element found with a valid href attribute, but no link content has been supplied.",
  button:
    "This button element does not have a name available to an accessibility API. Valid names are: title undefined, element content, aria-label undefined, aria-labelledby undefined.",
  button_needs_props: `This element has role of "button" but does not have a name available to an accessibility API. Valid names are: element content, aria-label undefined, aria-labelledby undefined.`,

  textinput: "This textinput element does not have a name available",
  textarea:
    "This textarea element does not have a name available to an accessibility API. Valid names are: label element, title undefined, aria-label undefined, aria-labelledby undefined.",
};

const INVALID_HTML_NESTING = {
  h5_h2:
    "The heading structure is not logically nested. This h5 element should be an h2 to be properly nested.",
};

const NO_SKIP_CONTENT =
  "Skip to content link not found. Use skip to content links to help shortcut to the main content.";

export {
  EMPTY_HEAD_TITLE_TYPE,
  INVALID_HTML_PROPS,
  INVALID_HTML_NESTING,
  NO_SKIP_CONTENT,
};
