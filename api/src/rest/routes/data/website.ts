/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { getReport } from "@app/core/controllers/reports";

const getWebsite = async (req?: any, res?: any) => {
  let data: any = {};

  try {
    const report = await getReport(req?.query?.q, req?.query?.timestamp);

    if (report?.website) {
      data = report.website;
    }
  } catch (e) {
    console.error(e);
  }

  res.json(data);
};

export { getWebsite };
