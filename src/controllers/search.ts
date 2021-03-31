import axios from "axios";
import { redisClient } from "../services/redis";
import { Repository, toRepositories } from "../transformers/repository";
import { User, toUsers } from "../transformers/user";
import { Issue, toIssues } from "../transformers/issue";

const allowedSearchType = ["users", "repositories", "issues"];

const searchGithub = async (req: any, res: any) => {
  const searchType = req.query.searchType;
  const searchText = req.query.searchText;

  if (!searchText) {
    return res
      .status(400)
      .send({ code: 400, message: "searchText is required" });
  }

  if (!searchType) {
    return res
      .status(400)
      .send({ code: 400, message: "searchType is required" });
  }

  // check if search type is allowed
  var searchTypeExists = allowedSearchType.includes(searchType.toLowerCase());
  if (!searchTypeExists) {
    return res
      .status(400)
      .send({ code: 400, message: "search type is not allowed" });
  }

  // call Github API
  try {
    const results = await axios.get(
      `${process.env.GITHUB_API_URL}/search/${searchType}?q=${searchText}`
    );

    redisClient.setex(searchText, 7200, JSON.stringify(results.data.items));

    // return the requested entity
    let items: Array<Repository | User | Issue> = [];
    switch (searchType) {
      case "users":
        items = toUsers(results.data.items);
        break;
      case "repositories":
        items = toRepositories(results.data.items);
        break;
      case "issues":
        items = toIssues(results.data.items);
        break;
    }

    res.status(200).json({
      code: 200,
      items,
    });
  } catch (err) {
    res.status(500).send({ code: 500, message: err.message });
  }
};

export default searchGithub;
