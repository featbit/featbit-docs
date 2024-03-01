import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // if(request.nextUrl.pathname.startsWith('/docs/_next/image?url=%2Fdocs%2F_next') === true) {
  //   return NextResponse.rewrite(new URL(request.nextUrl.pathname))
  // }
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL(request.nextUrl.protocol + '//' + request.nextUrl.host + '/docs'));
  }
  if (request.nextUrl.pathname.startsWith('/docs') === false && request.nextUrl.pathname.includes('_next') === false) {
    return NextResponse.rewrite(new URL(request.nextUrl.protocol + '//' + request.nextUrl.host + '/docs' + request.nextUrl.pathname));
  }
}