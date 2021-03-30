import { UserType, User } from "./user";

export type RepositoryType = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: UserType;
  stargazers_count: string;
  forks_count: string;
  language: string;
};

export class Repository {
  id?: number;
  name?: string;
  url?: string;
  description?: string;
  owner?: UserType;
  stargazers_count?: string;
  forks_count?: string;
  language?: string;
}

export const toRepositories = (items: RepositoryType[]) => {
  return items.map((x: RepositoryType) => {
    return toRepository(x);
  });
};

export const toRepository = (item: RepositoryType) => {
  const repository = new Repository();
  const user = new User();

  repository.id = item.id;
  repository.name = item.name;
  repository.url = item.html_url;
  repository.language = item.language;
  repository.description = item.description;
  repository.forks_count = item.forks_count;
  repository.stargazers_count = item.stargazers_count;

  user.id = item.owner.id;
  user.avatar_url = item.owner.avatar_url;
  user.name = item.owner.login;
  user.type = item.owner.type;
  user.url = item.owner.html_url;
  repository.owner = user;

  return repository;
};
