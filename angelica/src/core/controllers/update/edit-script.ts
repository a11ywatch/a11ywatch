/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import { format } from "prettier";
import { scriptBuild } from "@app/core/lib";
import { sourceBuild } from "@a11ywatch/website-source-builder";

const forked = fork("./src/workers/cdn_worker.js", [], { detached: true });

export const editScript = async ({
  userId,
  url: urlMap,
  script: resolver,
  newScript,
}) => {
  const { domain, cdnSourceStripped } = sourceBuild(urlMap);

  try {
    resolver.script = format(newScript, {
      semi: true,
      parser: "html",
    });

    const scriptProps = {
      scriptChildren: newScript
        .replace("<script defer>", "")
        .replace("</script>", ""),
      domain,
      cdnSrc: cdnSourceStripped,
    };

    forked.send({
      cdnSourceStripped,
      scriptBody: scriptBuild(scriptProps, true),
      domain: domain || resolver?.domain,
    });
  } catch (e) {
    console.error(e);
  }

  return resolver;
};
