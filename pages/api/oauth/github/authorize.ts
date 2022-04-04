import type { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const u = new URL("https://github.com/login/oauth/authorize");
  u.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
  if (req.query.scope) {
    u.searchParams.set(
      "scope",
      Array.isArray(req.query.scope) ? req.query.scope[0] : req.query.scope
    );
  }
  res.redirect(u.toString());
}
