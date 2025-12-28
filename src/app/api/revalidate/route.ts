import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const TAG_MAP: Record<string, { tags: string[]; paths: string[] }> = {
  homepage: { tags: ["homepage", "content"], paths: ["/"] },
  navbar: { tags: ["layout", "content"], paths: ["/"] },
  footer: { tags: ["layout", "content"], paths: ["/"] },
  themesPage: { tags: ["themesPage", "content"], paths: ["/themes"] },
  processPage: { tags: ["processPage", "content"], paths: ["/process"] },
  castPage: { tags: ["castPage", "content"], paths: ["/cast"] },
  moviePage: { tags: ["moviePage", "content"], paths: ["/movie"] },
  aboutPage: { tags: ["aboutPage", "content"], paths: ["/about"] },
  galleryPage: { tags: ["galleryPage", "content"], paths: ["/gallery"] },
  contactPage: { tags: ["contactPage", "content"], paths: ["/contact"] },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = request.headers.get("x-sanity-secret");

    if (!process.env.SANITY_REVALIDATE_SECRET) {
      console.log("SANITY_REVALIDATE_SECRET not configured");
      revalidatePath("/", "layout");
      return NextResponse.json({ 
        revalidated: true, 
        message: "Revalidated all (no secret configured)",
        now: Date.now() 
      });
    }

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const type = body?._type as string;
    const config = TAG_MAP[type] || { tags: ["content"], paths: ["/"] };
    
    for (const tag of config.tags) {
      revalidateTag(tag);
    }

    for (const path of config.paths) {
      revalidatePath(path);
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ 
      revalidated: true, 
      type,
      tags: config.tags,
      paths: config.paths,
      now: Date.now() 
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    revalidatePath("/", "layout");
    return NextResponse.json({ 
      revalidated: true,
      error: "Error but revalidated anyway",
      now: Date.now()
    });
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  
  if (secret === process.env.SANITY_REVALIDATE_SECRET || !process.env.SANITY_REVALIDATE_SECRET) {
    revalidatePath("/", "layout");
    return NextResponse.json({ 
      revalidated: true,
      message: "Full site revalidated",
      now: Date.now()
    });
  }

  return NextResponse.json({ 
    message: "Revalidation endpoint. Use POST with Sanity webhook or GET with ?secret=",
    supportedTypes: Object.keys(TAG_MAP)
  });
}
