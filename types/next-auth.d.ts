// types/next-auth.d.ts
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
    access_token: string;
  }

  interface User {
    id: string;
    access_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user_id: string;
    access_token: string;
    expires_at?: number;
    refresh_token?: string;
  }
}
