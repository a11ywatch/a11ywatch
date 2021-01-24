/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import { format } from "prettier";
import { skipNavigationMethod, sourceBuild, scriptBuild } from "@app/core/lib";

const forked = fork("./src/workers/cdn_worker.js", [], { detached: true });

export const adjustScript = async ({
  userId,
  url: urlMap,
  script: resolver,
}) => {
  const enabledSkip = resolver?.scriptMeta?.skipContentEnabled;
  const { domain, cdnSourceStripped } = sourceBuild(urlMap);

  try {
    let scriptBody = resolver?.script;

    // NO SKIP BUTTON FOUND, INSERT CUSTOM BTN
    if (!resolver?.issueMeta?.skipContentIncluded) {
      const startOfReplaceScript = scriptBody.indexOf("// SO: SKIP NAVIGATION");
      const endOfReplaceScript = scriptBody.indexOf("// EO: SKIP NAVIGATION");
      if (!enabledSkip) {
        scriptBody =
          scriptBody.substr(0, startOfReplaceScript) +
          scriptBody.substr(
            endOfReplaceScript + "// EO: SKIP NAVIGATION".length
          );
      } else {
        scriptBody = scriptBody.replace(
          "void (function init() {",
          `void (function init() { \n ${skipNavigationMethod}`
        );
      }
    }

    resolver.script = format(scriptBody, {
      semi: true,
      parser: "html",
    });

    const scriptProps = {
      scriptChildren: scriptBody
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
    console.log(e);
  }

  return resolver;
};
