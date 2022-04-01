import Layout from "../components/Layout";
import { useConfig } from "../components/ConfigProvider";

export default function Settings() {
  const [config, setConfig] = useConfig();

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
      </div>
    </Layout>
  );
}
