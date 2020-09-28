module.exports = {
  theme: {},
  variants: {},
  plugins: [
    require("postcss-import"),
    require("tailwindcss")("./tailwindcss-config.js"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [
          require("@fullhuman/postcss-purgecss")({
            content: ["./src/**/*.{js,jsx,ts,tsx}"],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
