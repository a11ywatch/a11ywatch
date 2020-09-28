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
