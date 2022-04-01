import React from "react";
import Layout from "../components/Layout";
import { useConfig } from "../components/ConfigProvider";
import useSWR from "swr";
import ReactTimeAgo from "react-time-ago";
import { graphql } from "@octokit/graphql";
import { Build } from "../config";

type CommitStatusResponse = {
  repository: {
    object: {
      statusCheckRollup: {
        state: "ERROR" | "EXPECTED" | "FAILURE" | "PENDING" | "SUCCESS";
      };
      messageHeadline: string;
      pushedDate: string;
      url: string;
    };
  };
};

type BuildStatusProps = {
  build: Build;
};
const BuildStatus: React.FC<BuildStatusProps> = ({ build }) => {
  const [config] = useConfig();
  const client = graphql.defaults({
    headers: {
      authorization: `token ${config.token}`,
    },
  });

  const fetcher = async (params: Build) => {
    const res = await client<CommitStatusResponse>(
      `
        query commitStatus($owner: String!, $repo: String!, $ref: String!) {
          repository(owner: $owner, name: $repo) {
            object(expression: $ref) {
              ... on Commit {
                statusCheckRollup {
                  state
                }
                messageHeadline
                pushedDate
                url
              }
            }
          }
        }
      `,
      { owner: params.owner, repo: params.repo, ref: params.ref }
    );
    return res.repository.object;
  };
  const { data } = useSWR(config.token && build, fetcher);

  if (!data) {
    return <></>;
  }

  const statusColors = {
    ERROR: "bg-orange-600",
    EXPECTED: "bg-gray-600",
    FAILURE: "bg-red-600",
    PENDING: "bg-lime-400 animate-pulse",
    SUCCESS: "bg-green-600",
  };

  return (
    <a href={data.url} target="_blank" rel="noreferrer">
      <div
        className={`${
          statusColors[data.statusCheckRollup.state]
        } rounded-md h-40 flex flex-col justify-between items-center p-3 text-white font-mono`}
      >
        <div>{`${build.owner}/${build.repo}`}</div>
        <div className="w-full truncate text-center">
          {data.messageHeadline}
        </div>
        <div>
          <ReactTimeAgo date={Date.parse(data.pushedDate)} />
        </div>
      </div>
    </a>
  );
};

export default function Home() {
  const [{ builds }] = useConfig();
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {builds.map((params) => (
          <BuildStatus key={Object.values(params).join("/")} build={params} />
        ))}
      </div>
    </Layout>
  );
}
