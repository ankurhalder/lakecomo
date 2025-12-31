import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const PATH_MAP: Record<string, string[]> = {
  homepage: ["/"],
  navbar: ["/"],
  footer: ["/"],
  themesPage: ["/themes"],
  castPage: ["/cast"],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = request.headers.get("x-sanity-secret");

    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Revalidation secret not configured" },
        { status: 500 }
      );
    }

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const type = body?._type as string;
    const paths = PATH_MAP[type] || ["/"];
    
    for (const path of paths) {
      revalidatePath(path);
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ 
      revalidated: true, 
      type,
      paths,
      now: Date.now() 
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    revalidatePath("/", "layout");
    return NextResponse.json({ 
      revalidated: true,
      message: "Fallback revalidation",
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
    message: "Revalidation endpoint. Use POST with Sanity webhook or GET with ?secret="
  });
}
