import { Client } from "@notionhq/client";
import { UpdatePageParameters } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export type SubscriberSource =
  | "Social Media"
  | "Word of Mouth"
  | "Search Engine"
  | "Other";

type SubscriberInfo = {
  source?: SubscriberSource;
  jobTitle?: string;
  industry?: string;
};

export const addSubscriber = async (email: string) => {
  const res = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_WAITLIST_DB_ID as string,
    },
    properties: {
      Email: {
        type: "email",
        email,
      },
    },
  });
  return res;
};

type UpdateProperties = UpdatePageParameters["properties"];

export const updateSubscriber = async (
  id: string,
  info: SubscriberInfo,
) => {
  const properties = {} as UpdateProperties;
  if (info.source) {
    properties!.Source = {
      select: {
        name: info.source,
      },
    };
  }

  if (info.industry) {
    properties!.Industry = {
      rich_text: [
        {
          text: {
            content: info.industry,
          },
        },
      ],
    };
  }

  if (info.jobTitle) {
    properties!["Job Title"] = {
      rich_text: [
        {
          text: {
            content: info.jobTitle,
          },
        },
      ],
    };
  }

  const res = await notion.pages.update({
    page_id: id,
    properties,
  });
  return res;
};
