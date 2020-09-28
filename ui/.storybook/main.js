/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/preset-typescript",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-links",
  ],
  webpackFinal: (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        require.resolve("style-loader"),
        {
          loader: require.resolve("css-loader"),
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: "[name]__[local]___[hash:base64:5]",
          },
        },
        require.resolve("sass-loader"),
      ],
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [
              require("postcss-import"),
              require("tailwindcss"),
              require("autoprefixer"),
            ],
          },
        },
      ],
      include: path.resolve(__dirname, "./src"),
    });

    return config;
  },
};
