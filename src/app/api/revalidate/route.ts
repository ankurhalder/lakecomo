import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = request.headers.get("x-sanity-secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const type = body?._type;

    if (type === "homepage") {
      revalidateTag("homepage", "max");
    } else if (type === "navbar" || type === "footer") {
      revalidateTag("layout", "max");
    } else {
      revalidateTag("content", "max");
    }

    return NextResponse.json({ 
      revalidated: true, 
      type,
      now: Date.now() 
    });
  } catch (error) {
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Revalidation endpoint. Use POST with Sanity webhook." 
  });
}
