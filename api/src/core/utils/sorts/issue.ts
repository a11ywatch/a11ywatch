export const issueSort = (a: any, b: any) => {
  if (a.type === "error" && b.type !== "error") {
    return -1;
  }
  if (a.type === "warning" && b.type !== "error") {
    return -2;
  }
  return 0;
};
