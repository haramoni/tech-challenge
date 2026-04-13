import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Tenta recuperar o cookie de autenticação
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // 2. Se o usuário NÃO estiver logado e tentar acessar a Home (/) ou qualquer outra interna
  if (!token && pathname !== '/login') {
    // Redireciona para o login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Se o usuário JÁ estiver logado e tentar ir para o /login, manda para a Home
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configuração para o Middleware não rodar em arquivos estáticos (imagens, favicon, etc)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};