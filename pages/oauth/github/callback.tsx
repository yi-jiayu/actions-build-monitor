import { useRouter } from "next/router";
import { useEffect } from "react";
import { useConfig } from "../../../components/ConfigProvider";

export default function OAuthGitHubCallback() {
  const router = useRouter();
  const { code } = router.query;
  const [config, setConfig] = useConfig();

  useEffect(() => {
    if (!code) {
      router.replace("/settings");
      return;
    }
    fetch(`/api/oauth/github/access_token?code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        setConfig({ ...config, token: data.access_token });
        return router.push("/settings");
      });
  }, [router, config, code, setConfig]);

  return <div>Loading...</div>;
}
