/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const extractPageData = (
  dataSource: any = { script: null, issues: null, webPage: null }
) => {
  let errorCount
  let warningCount
  let noticeCount
  let adaScore
  let issuesInfo
  let pageHasCdn
  let { script, issues, webPage } = dataSource

  if (webPage) {
    issuesInfo = webPage.issuesInfo
    pageHasCdn = webPage.cdnConnected
    if (issuesInfo) {
      errorCount = issuesInfo.errorCount
      warningCount = issuesInfo.warningCount
      adaScore = issuesInfo.adaScore
      noticeCount = issuesInfo.noticeCount
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
    issuesInfo
  }
}
