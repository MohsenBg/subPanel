import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  let url = process.env.DECOY_WEBSITE
    ? process.env.DECOY_WEBSITE
    : "en.wikipedia.org";
  console.log(url);
  if (!url.startsWith("https")) {
    url = "https:\\" + url;
  }
  return NextResponse.redirect(url);
}
