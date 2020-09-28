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
import { skipNavigationMethod } from "./templates";
import {
  EMPTY_HEAD_TITLE_TYPE,
  INVALID_HTML_PROPS,
  NO_SKIP_CONTENT,
  INVALID_HTML_NESTING,
} from "./models/issue-type";
import { fixInvalid } from "./fix/js";

function getIssueFixScript(
  issue,
  index,
  extraConfig = {
    alt: "",
    lang: "en",
  }
) {
  const message = issue?.message;
  const selector =
    issue?.selector?.length &&
    issue?.selector[0] === "#" &&
    !(issue?.selector.indexOf(" ") >= 0)
      ? "getElementById"
      : "querySelector";
  const fixProps = {
    domSelector: selector,
    selector: issue?.selector,
    index,
  };

  const fix = () => fixInvalid(fixProps, extraConfig);

  if (message.includes(EMPTY_HEAD_TITLE_TYPE)) {
    return fix().head;
  } else if (message.includes(INVALID_HTML_PROPS.textarea)) {
    return fix().textarea;
  } else if (message.includes(NO_SKIP_CONTENT)) {
    return skipNavigationMethod;
  } else if (message.includes(INVALID_HTML_PROPS.button)) {
    return fix().button;
  } else if (message.includes(INVALID_HTML_PROPS.lang)) {
    return fix().lang;
  } else if (
    [
      imgAltMissing,
      needsLongTextAlt,
      missingAltText,
      INVALID_HTML_PROPS.ignored.img,
    ].includes(message)
  ) {
    return fix().alt;
  } else if (message.includes(INVALID_HTML_PROPS.textinput)) {
    return fix().textinput;
  } else if (
    message.includes(
      "This element has insufficient contrast at this conformance level"
    )
  ) {
    const reccommendedColor =
      message.match(/Recommendation:  change text colour to (.*)/) ||
      message.match(/Recommendation: change text colour to (.*)/);
    const reccommendedBackground =
      message.match(/Recommendation:  change background to (.*)/) ||
      message.match(/Recommendation: change background to (.*)/);

    if (reccommendedBackground) {
      return `
		var elementLowBackgroundContrast${index} = document.${selector}("${
        issue.selector
      }").parentElement;

      if (elementLowBackgroundContrast${index}) {
        elementLowBackgroundContrast${index}.style.backgroundColor = "${reccommendedBackground[1].slice(
        0,
        -1
      )}";
      }
	`;
    }
    if (reccommendedColor) {
      return `
		var elementLowContrast${index} = document.${selector}("${issue.selector}");
      if (elementLowContrast${index}) {
			elementLowContrast${index}.style.color = "${reccommendedColor[1].slice(0, -1)}";
      }
			`;
    }
  } else if (message.includes(INVALID_HTML_PROPS.anchor_needs_props)) {
    return fix().anchor_needs_props;
  } else if (
    message.includes(
      `This form field should be labelled in some way. Use the label element (either with a "for" attribute or wrapped around the form field), or "title", "aria-label" or "aria-labelledby" attributes as appropriate.`
    )
  ) {
    return `
            var emptySelectLabel${index} = document.${selector}("${issue.selector}");
            if (emptySelectLabel${index}) {
              emptySelectLabel${index}.setAttribute("aria-label", emptyFormLabel${index}.name);
            }
	`;
  } else if (
    message.includes(
      `This form field should be labelled in some way. Use the label element (either with a "for" attribute or wrapped around the form field), or "title", "aria-label" or "aria-labelledby" attributes as appropriate.`
    )
  ) {
    return `
            var emptyFormLabel${index} = document.${selector}("${issue.selector}");
            if (emptyFormLabel${index}) {
              emptyFormLabel${index}.setAttribute("aria-label", emptyFormLabel${index}.placeholder || emptyFormLabel${index}.name);
            }
	`;
  } else if (message.includes(emptyIframeTitle)) {
    // getHostName USED:
    return `
			var elementNonEmptyTitle${index} = document.${selector}("${issue.selector}");
      if (elementNonEmptyTitle${index}) {
			  elementNonEmptyTitle${index}.title = getHostName(elementNonEmptyTitle${index}.src) || "embedded content";
      }
			`;
  } else if (
    message.includes(
      `This element's role is "presentation" but contains child elements with semantic meaning.`
    )
  ) {
    return `
			var elementNoPresentation${index} = document.${selector}("${issue.selector}");
      if (elementNoPresentation${index}) {
			  elementNoPresentation${index}.role = "application";
      }
			`;
  } else if (
    [
      `Anchor element found with no link content and no name and/or ID attribute.`,
      `Anchor element found with link content, but no href, ID or name attribute has been supplied.`,
    ].includes(message)
  ) {
    return `
			var emptyAnchor${index} = document.${selector}("${issue.selector}");
      if (emptyAnchor${index}) {
			  emptyAnchor${index}.href = "JavaScript:void(0);";
      }
			`;
  } else if (message.includes(INVALID_HTML_PROPS.button_needs_props)) {
    return `
		var properButtonElement${index} = document.createElement("button");
		var improperButtonElement${index} = document.${selector}("${issue.selector}");

      if (properButtonElement${index}) {
			  properButtonElement${index}.innerHTML = improperButtonElement${index}.innerHTML;
      }
      if (improperButtonElement${index}) {
			  improperButtonElement${index}.parentNode.replaceChild(properButtonElement${index}, improperButtonElement${index});
      }
	`;
  } else if (message.includes(INVALID_HTML_NESTING.h5_h2)) {
    return `
			var properH2Element${index} = document.createElement("h2");
			var improperh5Element${index} = document.${selector}("${issue.selector}");

      if (properH2Element${index}) {
			  properH2Element${index}.innerHTML = improperh5Element${index}.innerHTML;
      }
      if (improperh5Element${index}) {
			  improperh5Element${index}.parentNode.replaceChild(properH2Element${index}, improperh5Element${index});
      }
			`;
  }
  // WARNINGS BELOW
  else {
    return "";
  }
}

export { getIssueFixScript };
