import { NextRequest, NextResponse } from "next/server";
import {
  addSubscriber,
  SubscriberSource,
  updateSubscriber,
} from "@/lib/notion";

export async function POST(req: NextRequest) {
  const res = await req.json();
  const { id } = await addSubscriber(res.email);
  return NextResponse.json({ success: true, id });
}

type UpdateSubscriberBody = {
  id: string;
  referralSource?: SubscriberSource;
  jobTitle?: string;
  industry?: string;
};

export async function PUT(req: NextRequest) {
  const { id, referralSource, jobTitle, industry } =
    (await req.json()) as UpdateSubscriberBody;
  await updateSubscriber(id, {
    source: referralSource,
    jobTitle,
    industry,
  });
  return NextResponse.json({ success: true });
}
