/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getIssueFixScript } from "@app/core/lib";
import { getHostAsString } from "@a11ywatch/website-source-builder";

import {
  needsLongTextAlt,
  missingAltText,
  emptyIframeTitle,
  imgAltMissing,
} from "@app/core/strings";
import { grabAlt } from "./grab-alt";

const ISSUE_TIMEOUT = 14000;

interface IssueInfo {
  errorCount: number;
  warningCount: number;
  noticeCount: number;
  adaScore: number;
  scriptChildren: string;
  possibleIssuesFixedByCdn: number;
}

export const loopIssues = ({ issues, page }): Promise<IssueInfo> => {
  let errorCount = 0;
  let warningCount = 0;
  let noticeCount = 0;
  let adaScore = 100;
  let scriptChildren = ``;
  let possibleIssuesFixedByCdn = 0;
  let includeDomainCheck = false;

  // TODO: add error occurance count
  return new Promise(async (resolve) => {
    // TODO ATOMIC BATCH PROCESS FOR NOW KILL LOOP
    if (!issues?.issues?.length) {
      resolve({
        errorCount,
        warningCount,
        noticeCount,
        adaScore,
        scriptChildren,
        possibleIssuesFixedByCdn,
      });
    }
    let generationStop = false;
    const destroyLoopIteration = setTimeout(() => {
      console.log(`Issue fix timoout ${ISSUE_TIMEOUT}`);
      generationStop = true;
      resolve({
        errorCount,
        warningCount,
        noticeCount,
        adaScore,
        scriptChildren,
        possibleIssuesFixedByCdn,
      });
    }, ISSUE_TIMEOUT);

    for (
      let issueIndex = 0;
      issueIndex < issues?.issues?.length;
      issueIndex++
    ) {
      if (generationStop) {
        console.log("GENERATION STOP");
        break;
      }
      let element = issues?.issues[issueIndex];
      const extraConfig = await grabAlt({
        element,
        page,
        pageUrl: issues?.pageUrl,
      });

      // console.log(
      //   `ISSUE INDEX`,
      //   issueIndex,
      //   `ISSUE LENGTH ${issues.issues.length}`,
      //   `URL: ${issues?.pageUrl}`
      // );

      // TODO move this to one method
      if (element.type === "error") {
        errorCount++;
        adaScore -= 2;
      }
      if (element.type === "warning") {
        warningCount++;
        adaScore -= 1;
      }
      if (element.type === "notice") {
        noticeCount++;
      }

      if (
        !extraConfig.alt &&
        [
          emptyIframeTitle,
          needsLongTextAlt,
          missingAltText,
          imgAltMissing,
          "Img element is marked so that it is ignored by Assistive Technology.",
        ].includes(element.message) &&
        !includeDomainCheck
      ) {
        includeDomainCheck = true;
      }

      const getFix = getIssueFixScript(element, issueIndex, extraConfig);

      if (getFix) {
        possibleIssuesFixedByCdn++;
        scriptChildren += getFix;
      }

      if (issueIndex === issues?.issues?.length - 1) {
        if (destroyLoopIteration) {
          clearTimeout(destroyLoopIteration);
        }
        resolve({
          errorCount,
          warningCount,
          noticeCount,
          adaScore,
          scriptChildren: `${
            includeDomainCheck ? `${getHostAsString}` : ""
          }${scriptChildren}`,
          possibleIssuesFixedByCdn,
        });
      }
    }
  });
};
