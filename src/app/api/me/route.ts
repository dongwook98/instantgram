import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUserByUsername } from '@/service/user';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // next-auth가 요청헤더 쿠키에 있는 토큰을 분석해주는 복잡한 과정을 알아서 해줌
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getUserByUsername(user.username) //
    .then((data) => NextResponse.json(data));
}
