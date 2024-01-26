import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  // 커스텀 SignIn 페이지 설정
  pages: {
    signIn: '/auth/signin',
  },
  // 세션이 생겼을때, callbacks에서 필요한 정보 추가하거나 확인할 수 있음
  callbacks: {
    async session({ session }) {
      console.log(session);
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
        };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
