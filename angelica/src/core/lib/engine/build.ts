/**
 *  Copyright (c) A11yWatch, LLC. and its affiliates.
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 **/

import { scriptBody, scriptDetect } from "./templates";

const buildConfig = {
  scriptEntry: `<script defer>`,
  scriptExit: `</script>`,
  funcHead: `try {
  void function init() {`,
  funcTail: `}();
} catch (e) {
  console.error(e);
}`,
};

interface ScriptBuildProps {
  scriptChildren?: string;
  domain?: string;
  cdnSrc?: string;
}

export const scriptBuild = (
  { scriptChildren, domain, cdnSrc }: ScriptBuildProps,
  cdn: boolean
) => {
  return `${!cdn ? buildConfig.scriptEntry : ""}
${buildConfig.funcHead}
${scriptBody(
  { scriptChildren },
  (cdn && scriptDetect({ domain, cdnSrc })) || ""
)}
${buildConfig.funcTail}
${!cdn ? buildConfig.scriptExit : ""}
`;
};
