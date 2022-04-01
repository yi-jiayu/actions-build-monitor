import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Config } from "../config";

const emptyConfig = {
  token: "",
  builds: [],
};

type ConfigContextType = [
  config: Config,
  setConfig: (newConfig: Config) => void
];

const ConfigContext = createContext<ConfigContextType>([
  emptyConfig,
  (newConfig) => {},
]);

const ConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = useLocalStorage<Config>("config", emptyConfig);

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;
