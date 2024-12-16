import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
   const token = await getToken({ 
     req: request, 
     secret: process.env.NEXTAUTH_SECRET 
   });

   const path = request.nextUrl.pathname;

   // เพิ่มเงื่อนไขการตรวจสอบ admin route อย่างชัดเจน
   if (path.startsWith('/admin')) {
     // ถ้าไม่มี token หรือ ไม่ใช่ admin ให้ redirect ไปหน้า login
     if (!token || !token.isAdmin) {
       return NextResponse.redirect(new URL('/work', request.url));
     }
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/admin/:path*'],
};