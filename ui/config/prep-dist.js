const fs = require("fs");
const recast = require("recast");

const distRoot = `${__dirname}/../dist`;

const packageJson = require("../package.json");

delete packageJson.scripts;

const distPackageJson =
  JSON.stringify(
    packageJson,
    (_key, value) => {
      if (typeof value === "string" && value.startsWith("./dist/")) {
        const parts = value.split("/");
        parts.splice(1, 1); // remove dist
        return parts.join("/");
      }
      return value;
    },
    2
  ) + "\n";

// Save the modified package.json to "dist"
fs.writeFileSync(`${distRoot}/package.json`, distPackageJson);
