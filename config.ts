export type Build = {
  owner: string;
  repo: string;
  ref: string;
};

export type Config = {
  token: string;
  builds: Build[];
};
