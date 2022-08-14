import { IssueModel } from "../model/issus.model";
import _ from "lodash";
const fs = require("fs/promises");

const dataPath = "./data/issue.json";

const readAllIssue = async (): Promise<IssueModel[]> => {
  try {
    const jsonData = await fs.readFile(dataPath);
    return JSON.parse(jsonData);
  } catch (e) {
    console.log("reading jsonData fail");
    throw e;
  }
};

const createIssue = async (issue: IssueModel) => {
  const issues = await readAllIssue();
  const issuesExist = _.findIndex(issues, { id: issue.id }) >= 0;
  if (issuesExist) {
    return "Issue id already exist";
  } else {
    issues.push(issue);
    await writeIssues(issues);
  }
  return "Create issue success";
};

const updateIssue = async (issue: IssueModel) => {
  const issues = await readAllIssue();
  const matchIssueIndex = _.findIndex(issues, { id: issue.id });
  if (matchIssueIndex >= 0) {
    issues.splice(matchIssueIndex, 1, issue);
    await writeIssues(issues);
    return "Update issue success";
  } else {
    return "Issus not found";
  }
};

const deleteIssue = async (id: string) => {
  console.log(id);
  const issues = await readAllIssue();
  const matchIssueIndex = _.findIndex(issues, { id });
  if (matchIssueIndex >= 0) {
    issues.splice(matchIssueIndex, 1);
    await writeIssues(issues);
    return "Delete issue success";
  } else {
    return "Issue not found";
  }
};

const writeIssues = async (issues: IssueModel[]) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(issues));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { createIssue, updateIssue, readAllIssue, deleteIssue };
