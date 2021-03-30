import { UserType, User } from "./user";

export type IssueType = {
  id: number;
  title: string;
  body: string;
  html_url: string;
  state: string;
  user: UserType;
};

export class Issue {
  id?: number;
  title?: string;
  description?: string;
  url?: string;
  state?: string;
  owner?: UserType;
}

export const toIssues = (items: IssueType[]) => {
  return items.map((x: IssueType) => {
    return toIssue(x);
  });
};

export const toIssue = (item: IssueType) => {
  const issue = new Issue();
  const user = new User();

  issue.id = item.id;
  issue.title = item.title;
  issue.url = item.html_url;
  issue.state = item.state;
  issue.description = item.body;

  user.id = item.user.id;
  user.avatar_url = item.user.avatar_url;
  user.name = item.user.login;
  user.type = item.user.type;
  user.url = item.user.html_url;
  issue.owner = user;

  return issue;
};
