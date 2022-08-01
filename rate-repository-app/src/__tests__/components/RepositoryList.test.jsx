/* eslint-disable jest/expect-expect */
import { render, within } from "@testing-library/react-native";

import { RepositoryListContainer } from "../../components/RepositoryList";

const testRepositoryListContainer = (item, repo) => {
  const wrappedItem = within(item);

  expect(wrappedItem.getByText(repo.fullName)).toBeDefined();
  expect(wrappedItem.getByText(repo.description)).toBeDefined();
  expect(wrappedItem.getByText(repo.language)).toBeDefined();
  expect(wrappedItem.getByText(repo.stargazersCount)).toBeDefined();
  expect(wrappedItem.getByText(repo.forksCount)).toBeDefined();
  expect(wrappedItem.getByText(repo.reviewCount)).toBeDefined();
  expect(wrappedItem.getByText(repo.ratingAverage)).toBeDefined();
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 2576,
              stargazersCount: 30903,
              ratingAverage: 90,
              reviewCount: 5,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 89,
              stargazersCount: 2092,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      testRepositoryListContainer(firstRepositoryItem, {
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        stargazersCount: "30903",
        forksCount: "2576",
        reviewCount: "5",
        ratingAverage: "90",
      });

      testRepositoryListContainer(secondRepositoryItem, {
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        stargazersCount: "2092",
        forksCount: "89",
        reviewCount: "3",
        ratingAverage: "72",
      });
    });
  });
});
