/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { Request, Response } from "express";
import { getReport } from "@app/core/controllers/reports";
import { downloadToExcel } from "@app/core/utils";

const getWebsite = async (req: Request, res: Response, next?: any) => {
  let data: any = {};
  const { q, timestamp, download } = req.query;

  try {
    const report = await getReport(q + "", timestamp + "");

    if (report?.website) {
      data = report.website;
    }
  } catch (e) {
    console.error(e);
  }
  if (download) {
    downloadToExcel(req, res, next, data);
  } else {
    res.json(data);
  }
};

export { getWebsite };
