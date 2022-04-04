import type { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";

async function getAccessToken(code: string) {
  const u = new URL("https://github.com/login/oauth/access_token");
  u.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
  u.searchParams.set("client_secret", process.env.GITHUB_CLIENT_SECRET!);
  u.searchParams.set("code", code);
  const res = await fetch(u.toString(), {
    headers: { accept: "application/json" },
  });
  const data = await res.json();
  if (data.hasOwnProperty("error")) {
    throw data;
  }
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  try {
    const token = await getAccessToken(code as string);
    return res.status(200).json(token);
  } catch (e) {
    return res.status(400).json(e);
  }
}
