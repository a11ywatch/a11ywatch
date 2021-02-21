/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import { format } from "prettier";
import { scriptBuild } from "@app/core/lib";
import { sourceBuild } from "@a11ywatch/website-source-builder";
import { log } from "@a11ywatch/log";

export const editScript = async ({
  userId,
  url: urlMap,
  script: resolver,
  newScript,
}) => {
  const { domain, cdnSourceStripped } = sourceBuild(urlMap);
  const forked = fork(`${__dirname}/cdn_worker`, [], {
    detached: true,
  });
  try {
    resolver.script = format(newScript, {
      semi: true,
      parser: "html",
    });

    forked.send({
      cdnSourceStripped,
      scriptBody: scriptBuild(
        {
          scriptChildren: newScript
            .replace("<script defer>", "")
            .replace("</script>", ""),
          domain,
          cdnSrc: cdnSourceStripped,
        },
        true
      ),
      domain: domain || resolver?.domain,
    });
    forked.unref();
  } catch (e) {
    log(e, { type: "error" });
  }

  return resolver;
};
