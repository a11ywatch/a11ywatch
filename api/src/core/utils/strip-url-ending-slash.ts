const stripUrlEndingSlash = (url: string): string => {
  let cleanUrlParse = url;

  if (url[url.length - 1] === "/") {
    cleanUrlParse = cleanUrlParse.slice(0, -1);
  }
  return cleanUrlParse;
};

export { stripUrlEndingSlash };
