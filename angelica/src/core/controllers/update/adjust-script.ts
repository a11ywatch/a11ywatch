/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { fork } from "child_process";
import { format } from "prettier";
import { skipNavigationMethod, scriptBuild } from "@app/core/lib";
import { sourceBuild } from "@a11ywatch/website-source-builder";
import { log } from "@a11ywatch/log";

export const adjustScript = async ({
  userId,
  url: urlMap,
  script: resolver,
}) => {
  const enabledSkip = resolver?.scriptMeta?.skipContentEnabled;
  const { domain, cdnSourceStripped } = sourceBuild(urlMap);

  try {
    let scriptBody = resolver?.script;

    if (scriptBody) {
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

    const forked = fork(`${__dirname}/cdn_worker`, [], {
      detached: true,
    });

    forked.send({
      cdnSourceStripped,
      scriptBody: scriptBuild(
        {
          scriptChildren: scriptBody
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

    forked.on("message", (message: string) => {
      if (message === "close") {
        forked.kill("SIGINT");
      }
    });
  } catch (e) {
    log(e, { type: "error" });
  }

  return resolver;
};
