import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const TAG_MAP: Record<string, string[]> = {
  homepage: ["homepage", "content"],
  navbar: ["layout", "content"],
  footer: ["layout", "content"],
  themesPage: ["themesPage", "content"],
  processPage: ["processPage", "content"],
  castPage: ["castPage", "content"],
  moviePage: ["moviePage", "content"],
  aboutPage: ["aboutPage", "content"],
  galleryPage: ["galleryPage", "content"],
  contactPage: ["contactPage", "content"],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = request.headers.get("x-sanity-secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const type = body?._type as string;
    const tags = TAG_MAP[type] || ["content"];
    
    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    return NextResponse.json({ 
      revalidated: true, 
      type,
      tags,
      now: Date.now() 
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Revalidation endpoint. Use POST with Sanity webhook.",
    supportedTypes: Object.keys(TAG_MAP)
  });
}
