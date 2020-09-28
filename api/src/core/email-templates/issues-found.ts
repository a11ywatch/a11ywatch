/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export interface Issue {
  context: string;
  message: string;
  selector: string;
}

export interface Data {
  issues: [Issue] | [];
  pageUrl: string;
}

export interface IssuesFound {
  (data: Data): string;
}

const issuesFoundTemplate: IssuesFound = (
  data = { issues: [], pageUrl: "" }
) => {
  let listData = "";

  if (data.issues?.length) {
    data.issues.some((item: Issue, i: number) => {
      if (i === 4) {
        return;
      }
      listData = `${listData}<li><div><div>"${item?.context}"</div><div style="font-weight: 500;">"${item?.selector}"</div><div style="font-weight: 400; font-size: 1em;">${item?.message}</div></div></li>`;
      return false;
    });
  }

  return `<h1>${data?.issues?.length} issues found for ${data?.pageUrl}!</h1>
  ${listData}
  <a href="https://www.a11ywatch.com/dashboard" style="font-weight: 800; font-size: 1.2em; display: block; background: #5c6bc0; padding: 10px; border-radius: 4px; color: white; text-align: center; text-decoration: none;">View Details</a>
  <p style="margin-top:10; margin-bottom: 10px;">If you want to stop receiving emails toggle the alert setting to off on the dashboard</p>
`;
};

export { issuesFoundTemplate };
