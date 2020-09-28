/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
export const skipContentTemplate = {
  code: "WCAG2A.Principle1.Guideline2.4",
  type: "warning",
  typeCode: 2,
  message:
    "Skip to content link not found. Use skip to content links to help shortcut to the main content.",
  context: '<a id="content">Skip Content</a>',
  selector: "a",
  runner: "a11yWatch",
  runnerExtras: {},
};
