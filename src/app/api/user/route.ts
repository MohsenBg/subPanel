import { NextRequest, NextResponse } from "next/server";
import { getUserPanel } from "@/lib/fetchWebsite";
import { HttpStatusCode } from "axios";
import { parseConfigs, parseTrafficUsage, validUuid } from "@/lib/parseHtml";

interface BodyRequest {
  password?: string;
  uuid?: string;
}

export async function POST(request: NextRequest) {
  const body: BodyRequest = await request.json();

  if (!validUuid(body.uuid) || !body.password) {
    return NextResponse.json(
      { message: "BadRequest" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    const html = await getUserPanel(body.password, body.uuid);
    const traffic = parseTrafficUsage(html);
    const configs = parseConfigs(html);

    return NextResponse.json({ traffic, configs });
  } catch (error) {
    return NextResponse.json(
      { message: "Cannot establish connection" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
