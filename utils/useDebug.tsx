import { useRouter } from "next/router";

export default function useDebug() {
  const router = useRouter();
  return router.asPath.includes("debug=true");
  // Query string parameters are only available client-side
  // See: https://nextjs.org/docs/pages/api-reference/functions/use-router#router-object
  // const { debug } = router.query;
  // return debug === "true";
}
