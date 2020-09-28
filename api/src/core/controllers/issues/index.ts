import { removeIssue } from "./remove";
import { addIssue } from "./set";
import { getIssue, getIssues } from "./find";
import { updateIssues } from "./update";

export const IssuesController = ({ user } = { user: null }) => ({
  getIssue,
  getIssues,
  addIssue,
  removeIssue,
  updateIssues,
});
