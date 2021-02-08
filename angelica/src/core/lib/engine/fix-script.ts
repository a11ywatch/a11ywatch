/**
 *  Copyright (c) A11yWatch, LLC. and its affiliates.
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 **/

import {
  needsLongTextAlt,
  missingAltText,
  emptyIframeTitle,
  imgAltMissing,
} from "@app/core/strings";
import {
  EMPTY_HEAD_TITLE_TYPE,
  INVALID_HTML_PROPS,
  NO_SKIP_CONTENT,
  INVALID_HTML_NESTING,
} from "./models/issue-type";
import { fixInvalid, skipNavigationMethod } from "./fix/js";
import { getSelectorType } from "./get-selector-type";

type ExtraConfig = {
  alt?: string;
  lang?: string;
};

function getIssueFixScript(
  issue: any,
  index: number,
  extraConfig: ExtraConfig = {
    alt: "",
    lang: "en",
  }
): string {
  const message = String(issue?.message).replace(/\s\s+/g, " ");
  if (!message) {
    return "";
  }

  const fix = () =>
    fixInvalid(
      {
        domSelector: getSelectorType(issue),
        selector: issue?.selector,
        index,
        message,
      },
      extraConfig
    );

  let reasonMessage = "";

  if (message.includes(EMPTY_HEAD_TITLE_TYPE)) {
    reasonMessage = fix().head;
  } else if (message.includes(INVALID_HTML_PROPS.textarea)) {
    reasonMessage = fix().textarea;
  } else if (message.includes(NO_SKIP_CONTENT)) {
    reasonMessage = skipNavigationMethod;
  } else if (message.includes(INVALID_HTML_PROPS.button)) {
    reasonMessage = fix().button;
  } else if (message.includes(INVALID_HTML_PROPS.lang)) {
    reasonMessage = fix().lang;
  } else if (
    [
      imgAltMissing,
      needsLongTextAlt,
      missingAltText,
      INVALID_HTML_PROPS.ignored.img,
    ].includes(message)
  ) {
    reasonMessage = fix().alt;
  } else if (message.includes(INVALID_HTML_PROPS.textinput)) {
    reasonMessage = fix().textinput;
  } else if (message.includes(INVALID_HTML_PROPS.contrast)) {
    reasonMessage = fix().contrast;
  } else if (message.includes(INVALID_HTML_PROPS.anchor_needs_props)) {
    reasonMessage = fix().anchor_needs_props;
  } else if (message.includes(INVALID_HTML_PROPS.form_label)) {
    reasonMessage = fix().form_label;
  } else if (message.includes(emptyIframeTitle)) {
    reasonMessage = fix().iframe_title;
  } else if (message.includes(INVALID_HTML_PROPS.semantic_presentation_role)) {
    reasonMessage = fix().semantic_presentation_role;
  } else if (
    [
      `Anchor element found with no link content and no name and/or ID attribute.`,
      `Anchor element found with link content, but no href, ID or name attribute has been supplied.`,
    ].includes(message)
  ) {
    reasonMessage = fix().missing_link;
  } else if (message.includes(INVALID_HTML_PROPS.button_needs_props)) {
    reasonMessage = fix().button_needs_props;
  } else if (message.includes(INVALID_HTML_NESTING.h5_h2)) {
    reasonMessage = fix().nesting.h5_h2;
  }

  return reasonMessage;
}

export { getIssueFixScript };
