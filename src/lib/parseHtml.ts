import * as cheerio from "cheerio";
interface TrafficUsage {
  currentUsage: string;
  maxUsage: string;
  expired: string;
}

export const validUuid = (uuid: string | undefined | null): uuid is string => {
  if (!uuid) return false;

  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(uuid);
};

export const parseTrafficUsage = (html: string): TrafficUsage => {
  const $ = cheerio.load(html);

  const infoBoxText = $(".info-box-text").text().trim().split("Of");
  const currentUsage = infoBoxText[0].trim();
  const maxUsage = infoBoxText[1].trim();

  const expireText = $(".info-box-content").find("div").last().text().trim();
  const expired = expireText.split(": ")[1].trim();

  const result: TrafficUsage = {
    currentUsage,
    maxUsage,
    expired,
  };

  return result;
};

interface Row {
  name: string;
  link: string;
  type: string;
  domain: string;
  protocol: string;
  transport: string;
  security: string;
}

interface ParseResult {
  table: Row[];
}

export const parseConfigs = (html: string): ParseResult => {
  const result: ParseResult = { table: [] };
  const $ = cheerio.load(html);

  $("#all-links")
    .find("tbody tr")
    .each((_, element) => {
      const row: string[] = ["", "", "", "", "", "", ""];
      $(element)
        .find("td")
        .each((index, td) => {
          const text = $(td).text().trim();
          row[index] = text;

          $(td)
            .find("a")
            .each((_, e) => {
              const href = $(e).attr("href");
              if (href) row[row.length - 1] = getPathnameFromUrl(href);
            });
        });
      result.table.push({
        name: row[0],
        type: row[1],
        domain: row[2],
        protocol: row[3],
        transport: row[4],
        security: row[5],
        link: row[6],
      });
    });

  return result;
};
const getPathnameFromUrl = (inputUrl: string | URL): string => {
  const parsedUrl = typeof inputUrl === "string" ? new URL(inputUrl) : inputUrl;
  return inputUrl
    .toString()
    .replace(parsedUrl.protocol + "//" + parsedUrl.hostname, "");
};
