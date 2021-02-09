/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import fetch from "node-fetch";
import { connect } from "@app/database";
import { websiteSearchParams } from "@app/core/utils";

const DEFAULT_RESPONSE = {
  script: null,
  code: 200,
  success: true,
  message: "Script updated",
};

export const ScriptsController = ({ user } = { user: null }) => ({
  getScript: async function (
    {
      pageUrl,
      userId,
      filter,
      noRetries,
    }: {
      pageUrl?: string;
      userId?: number;
      filter?: boolean;
      noRetries?: boolean;
    },
    chain?: boolean
  ) {
    try {
      const [collection] = await connect("Scripts");
      const searchProps = websiteSearchParams({ pageUrl, userId });
      let scripts = await collection.findOne(searchProps);

      if (!scripts && !noRetries) {
        scripts = await collection.findOne({ pageUrl });
      }
      return chain ? [scripts, collection] : scripts;
    } catch (e) {
      console.error(e);
    }
  },
  getScripts: async function ({ userId, pageUrl }) {
    try {
      const [collection] = await connect("Scripts");
      const searchProps = websiteSearchParams({ pageUrl, userId });
      const scripts = await collection.find(searchProps).limit(100).toArray();

      return scripts;
    } catch (e) {
      console.error(e);
    }
  },
  updateScript: async function ({
    userId,
    pageUrl,
    scriptMeta,
    editScript,
    newScript,
  }) {
    const params = {
      userId,
      pageUrl,
    };
    try {
      let [script, collection] = await this.getScript(params, true);
      if (typeof scriptMeta !== "undefined") {
        script.scriptMeta = scriptMeta;
      }
      const data = await fetch(
        `${process.env.PUPPET_SERVICE}/api/updateScript`,
        {
          method: "POST",
          body: JSON.stringify({
            script,
            editScript: !!editScript,
            newScript: newScript,
            url: String(encodeURIComponent(pageUrl)),
            userId: Number(userId),
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data?.status === 200) {
        script = await data.json();
        delete script._id;
        await collection.updateOne(params, {
          $set: script,
        });
      }

      return Object.assign({}, DEFAULT_RESPONSE, {
        script,
      });
    } catch (e) {
      console.error(e);
    }
  },
});
