const fontFamilys = [
  "Roboto",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
];

const colors = {
  main: "grey",
  secondary: "#5c6bc0",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  gray: {
    100: "#f7fafc",
    900: "#1a202c",
  },
};

const theme = {
  colors,
  fontFamily: {
    display: fontFamilys,
    body: fontFamilys,
  },
  textColor: (theme) => theme("colors"),
};

module.exports = {
  theme,
};
