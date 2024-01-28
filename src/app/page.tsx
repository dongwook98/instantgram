import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

// 홈페이지는 getServerSession으로 로그인한 사용자 정보(session)가 있는지 확인해야하기 때문에 SSR
export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className='w-full flex flex-col md:flex-row max-w-[850px] p-4'>
      <div className='w-full basis-3/4 min-w-0'>
        {/* FollowingBar, PostList는 데이터가 로그인한 유저에 따라 바뀌므로 SSR이나 CSR이 적합 
        구현 계획: 홈페이지와 사이드바 까지만 프리렌더링해서 SSR로 사용자에게 빠르게 보내주고
        FollowingBar, PostList까지 SSR로 하면 과부하가 오기 쉽기 때문에 CSR로 만들자.
        그리고 CSR이여도 Next.js가 최대한 정적인 부분들은 프리렌더링해줌
        */}
        <FollowingBar />
        <PostList />
      </div>
      <div className='basis-1/4 ml-8'>
        <SideBar user={user} />
      </div>
    </section>
  );
}
