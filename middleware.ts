import { auth } from "@/lib/auth"
 
export default auth((req) => {
  const publicRoutes = ['/auth/login', '/auth/register'];
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  
  if (isPublicRoute) {
    return;
  }
  
  return;
})
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}