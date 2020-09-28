module.exports = {
  plugins: [
    'autoprefixer',
    'tailwindcss',
    'postcss-flexbugs-fixes',
    'postcss-import',
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: [
                './src/pages/**/*.{js,jsx,ts,tsx}',
                './src/components/**/*.{js,jsx,ts,tsx}',
                './node_modules/@a11ywatch/ui/**/*.{js,jsx,ts,tsx}',
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
              whitelistPatternsChildren: [/monaco-editor/],
            },
          ],
          ['cssnano', { preset: 'default' }],
        ]
      : []),
    'postcss-preset-env',
  ],
}
