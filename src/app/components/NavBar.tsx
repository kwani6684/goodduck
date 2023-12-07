'use client';
import Link from 'next/link';
import LoginBtn from '../account/login/LoginBtn';
import LogoutBtn from '../account/login/LogoutBtn';
import DropMenu from './dropmenu';
import { MenuProps, SessionType } from '../layout';
import AuthSession from '../AuthSession';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Image from 'next/image';

export interface CustomSession extends Session {
  id?: string | null | undefined;
}
const navigation: MenuProps[] = [
  { name: '카테고리', href: '/category' },
  { name: '글 목록', href: '/lists' },
];

export default function NavBar() {
  let { data: session }: { data?: CustomSession | null | undefined; } = useSession();
  
  return (
    <nav className=' flex justify-between items-center bg-yellow-700 p-6 lg:px-8' aria-label='Global'>
      <div className='flex lg:flex-1'>
        <Link href='/' className='-m-1.5 p-1.5'>
          <span className='text-2xl font-semibold leading-6 text-white hover:text-yellow-900'>다람쥐굴</span>
        </Link>
      </div>

      <div className=' flex lg:hidden'>
        <span className='mr-4 font-semibold text-white '>{session?.user?.name}</span>
        <DropMenu menu={navigation} session={session} />
      </div>
      <div className='hidden  lg:flex lg:gap-x-12'>
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-white hover:text-yellow-900'>
            {item.name}
          </Link>
        ))}
        {session?.user ? (
          <div className='hidden  lg:flex lg:gap-x-12'>
            <Link href={`/mypage/${session?.user.email?.substring(0,session?.user.email?.indexOf('@'))}`} className='text-sm font-semibold leading-6 text-white hover:text-yellow-900'>
              마이페이지
            </Link>
            <Link href={'/write'} className='text-sm font-semibold leading-6 text-white hover:text-yellow-900'>
              글 작성
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='hidden lg:flex lg:flex-1 lg:justify-end text-white '>
        {session?.user ? (
          <span className='flex items-center'>
            <div className='flex items-center'>
              <Image
                width={50}
                height={50}
                src={session?.user.image || '../public/acorn.png'}
                className='mx-auto rounded-full shadow-lg dark:shadow-black/20 '
                alt='Avatar'
              />
            </div>
            <span className='font-semibold ml-4 mr-4'>{session?.user?.name}</span>
            <LogoutBtn />
          </span>
        ) : (
          <span>
            <Link href='/register' className='font-semibold mr-4 text-white hover:text-yellow-900 '>
              회원가입
            </Link>
            <LoginBtn />
          </span>
        )}
      </div>
    </nav>
  );
}
