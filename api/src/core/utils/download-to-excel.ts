/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { Request, Response } from "express";
import type { Issue } from "@app/types";

const downloadToExcel = (
  req: Request,
  res: Response,
  next: any,
  data: Issue | any
) => {
  const excel = require("exceljs");
  let workbook = new excel.Workbook();
  const pageName = data?.url ?? "Website";
  let worksheet = workbook.addWorksheet(`${data?.domain} Accessibility Audit`, {
    headerFooter: {
      firstHeader: `Accessibility score - ${data?.website?.adaScore}`,
      firstFooter: `Test ran ${data?.website?.lastScanDate}`,
    },
  });

  worksheet.columns = [
    { header: "Code", key: "code", width: 14 },
    { header: "Type", key: "type", width: 5 },
    { header: "Message", key: "message", width: 30 },
    { header: "Context", key: "context", width: 40 },
    { header: "Selector", key: "selector", width: 30 },
    { header: "Audit", key: "checked", width: 5, outlineLevel: 1 },
  ].map((items) => ({
    ...items,
    checked: 0,
  }));

  worksheet.addRows(
    (data?.issue?.length ? data?.issue : data?.issues).map((items) => ({
      ...items,
      style: { font: { name: "Helvetica" } },
    }))
  );

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + `${pageName}-audit.xlsx`
  );

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
};

export { downloadToExcel };
