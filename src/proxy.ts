import { NextRequest, NextResponse } from 'next/server'

const OLD_HOSTS = ['lakecomostyle.it', 'www.lakecomostyle.it']

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? ''

  if (OLD_HOSTS.includes(host)) {
    const url = new URL(request.url)
    url.hostname = 'spiesofstyle.com'
    url.protocol = 'https:'
    url.port = ''
    return NextResponse.redirect(url.toString(), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|admin).*)',
  ],
}
