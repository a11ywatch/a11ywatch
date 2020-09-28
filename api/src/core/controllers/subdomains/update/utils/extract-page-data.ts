/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const extractPageData = (dataSource: any) => {
  // issue counters
  let errorCount;
  let warningCount;
  let noticeCount;
  // score roundup
  let adaScore;
  // issue meta info
  let issuesInfo;
  // page has custom cdn
  let pageHasCdn;

  let script = dataSource?.script;
  let issues = dataSource?.issues;
  let webPage = dataSource?.webPage;

  if (webPage) {
    issuesInfo = webPage.issuesInfo;
    pageHasCdn = webPage.cdnConnected;
    if (issuesInfo) {
      errorCount = issuesInfo.errorCount;
      warningCount = issuesInfo.warningCount;
      adaScore = issuesInfo.adaScore;
      noticeCount = issuesInfo.noticeCount;
    }
  }

  return {
    errorCount,
    warningCount,
    noticeCount,
    adaScore,
    pageHasCdn,
    script,
    issues,
    webPage,
    issuesInfo,
  };
};
