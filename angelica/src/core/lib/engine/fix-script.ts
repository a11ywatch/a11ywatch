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
import { fixInvalid } from "./fix/js";
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

  const {
    head,
    textarea,
    no_skip_content,
    button,
    lang,
    alt,
    textinput,
    contrast,
    anchor_needs_props,
    form_label,
    iframe_title,
    semantic_presentation_role,
    missing_link,
    button_needs_props,
    nesting,
  } = fixInvalid(
    {
      domSelector: getSelectorType(issue),
      selector: issue?.selector,
      index,
      message,
    },
    extraConfig
  );

  const { h5_h2 } = nesting;

  let reasonMessage = "";

  if (message.includes(EMPTY_HEAD_TITLE_TYPE)) {
    reasonMessage = head;
  } else if (message.includes(INVALID_HTML_PROPS.textarea)) {
    reasonMessage = textarea;
  } else if (message.includes(NO_SKIP_CONTENT)) {
    reasonMessage = no_skip_content;
  } else if (message.includes(INVALID_HTML_PROPS.button)) {
    reasonMessage = button;
  } else if (message.includes(INVALID_HTML_PROPS.lang)) {
    reasonMessage = lang;
  } else if (
    [
      imgAltMissing,
      needsLongTextAlt,
      missingAltText,
      INVALID_HTML_PROPS.ignored.img,
    ].includes(message)
  ) {
    reasonMessage = alt;
  } else if (message.includes(INVALID_HTML_PROPS.textinput)) {
    reasonMessage = textinput;
  } else if (message.includes(INVALID_HTML_PROPS.contrast)) {
    reasonMessage = contrast;
  } else if (message.includes(INVALID_HTML_PROPS.anchor_needs_props)) {
    reasonMessage = anchor_needs_props;
  } else if (message.includes(INVALID_HTML_PROPS.form_label)) {
    reasonMessage = form_label;
  } else if (message.includes(emptyIframeTitle)) {
    reasonMessage = iframe_title;
  } else if (message.includes(INVALID_HTML_PROPS.semantic_presentation_role)) {
    reasonMessage = semantic_presentation_role;
  } else if (
    [
      `Anchor element found with no link content and no name and/or ID attribute.`,
      `Anchor element found with link content, but no href, ID or name attribute has been supplied.`,
    ].includes(message)
  ) {
    reasonMessage = missing_link;
  } else if (message.includes(INVALID_HTML_PROPS.button_needs_props)) {
    reasonMessage = button_needs_props;
  } else if (message.includes(INVALID_HTML_NESTING.h5_h2)) {
    reasonMessage = h5_h2;
  }

  return reasonMessage;
}

export { getIssueFixScript };
