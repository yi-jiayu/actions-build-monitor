import Layout from "../components/Layout";
import { useConfig } from "../components/ConfigProvider";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();
  const [config, setConfig] = useConfig();
  const [includePrivateRepos, setIncludePrivateRepos] = useState(false);

  const generateOAuthToken = () => {
    const query = includePrivateRepos ? { scope: "repo" } : {};
    router.push({ pathname: "/api/oauth/github/authorize", query });
  };

  return (
    <Layout>
      <h1 className="font-bold text-4xl">Settings</h1>
      <div className="grid gap-y-3">
        <div>
          <label
            htmlFor="token"
            className="block text-sm font-medium text-gray-700"
          >
            GitHub token
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="token"
              id="token"
              value={config.token}
              onChange={(event) =>
                setConfig({ ...config, token: event.target.value })
              }
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full max-w-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500" id="token-description">
            Use your own personal access token or an automatically generated
            OAuth token.
          </p>
        </div>
        <div>
          <a
            href={
              includePrivateRepos
                ? "/api/oauth/github/authorize?scope=repo"
                : "/api/oauth/github/authorize"
            }
          >
            <div
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={generateOAuthToken}
            >
              Generate OAuth token
            </div>
          </a>
          <div className="mt-3 relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="private"
                name="private"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                checked={includePrivateRepos}
                onChange={(event) =>
                  setIncludePrivateRepos(event.target.checked)
                }
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="private" className="font-medium text-gray-700">
                Include private repositories
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="repositories"
          className="block text-sm font-medium text-gray-700"
        >
          Repositories
        </label>
        <div className="mt-1">
          <textarea
            rows={4}
            name="repositories"
            id="repositories"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full max-w-lg sm:text-sm border-gray-300 rounded-md font-mono"
            value={JSON.stringify(config.builds, undefined, 2)}
            onChange={(event) =>
              setConfig({ ...config, builds: JSON.parse(event.target.value) })
            }
          />
        </div>
      </div>
    </Layout>
  );
}
