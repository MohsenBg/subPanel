import { redirect } from "next/navigation";
import { headers } from "next/headers";
import url from "url";
export default function NotFound() {
  const headersList = headers();
  const baseUrl = headersList.get("next-url");
  const pathname = baseUrl ? url.parse(baseUrl).pathname : "";

  let redirectUrl = process.env.DECOY_WEBSITE
    ? process.env.DECOY_WEBSITE
    : "en.wikipedia.org";

  redirectUrl += "/" + pathname;

  if (!redirectUrl.startsWith("https")) {
    redirectUrl = "https:\\" + redirectUrl;
  }
  redirect(redirectUrl);
}
