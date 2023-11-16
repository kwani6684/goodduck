'use client'
import Link from "next/link";
import LoginBtn from "../account/login/LoginBtn";
import LogoutBtn from "../account/login/LogoutBtn";
import DropMenu from "./dropmenu";
import { MenuProps, SessionType } from "../layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import AuthSession from "../AuthSession";
import { useSession } from "next-auth/react";

const navigation: MenuProps[] = [
    { name: '카테고리 추가', href: '/category' },
    { name: '글 목록', href: '/lists' },
];


export default function NavBar() {
    let { data: session } = useSession();
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
                  <Link href={`/mypage/${session?.user.email}`} className='text-sm font-semibold leading-6 text-white hover:text-yellow-900'>
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
              {session?.user  ? (
                <span className='flex items-center'>
                  <div className='flex items-center'>
                    <img src={session?.user.image||'../public/acorn.png'} className='mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[50px] h-[50px]' alt='Avatar' />
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
         
    )
}