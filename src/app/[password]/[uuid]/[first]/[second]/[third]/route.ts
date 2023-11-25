import { getUserConfig } from "@/lib/fetchWebsite";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import url from "url";

export async function GET(request: NextRequest) {
  try {
    const fullUrl = url.parse(request.url);
    const parseUrl = fullUrl.path;

    if (!parseUrl) {
      return NextResponse.json(
        { message: "BadRequest" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const data = await getUserConfig(parseUrl);

    let response = new Response(data, {
      headers: { "Content-Type": "text/html" },
    });

    if (fullUrl.pathname?.endsWith("json")) {
      // const jsonWithoutComments = stripJsonComments(data);
      response = new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
