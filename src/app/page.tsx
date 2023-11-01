import { MongoClient } from 'mongodb';
import Image from 'next/image';
import { connectDB } from './../util/database';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Category from './components/Category';
import { CategoryType } from './write/page';

export default async function Home() {
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let result = await db.collection('post').find().toArray(); //post collection의 모든데이터를 어레이에 담아줌
  let category:CategoryType[] = await db.collection('category').find().toArray();

  console.log(result);
  return (
    <div>
      <div className='relative w-full py-12 px-12 bg-yellow-900'>
        <div className='relative z-10 text-center py-24'>
          <h1 className='text-white text-center text-6xl font-display font-bold mb-12'>다람쥐굴</h1>
          {/* <Link href="#" className="inline-block bg-yellow-800 text-white uppercase text-sm tracking-widest font-heading px-8 py-4">Shop now</Link> */}
        </div>

        {/* <div className="relative zs-10 mx-auto max-w-4xl flex justify-between uppercase text-white font-heading tracking-widest text-sm">
			<a href="#" className="border-b border-white">Find out more</a>
			<a href="#" className="border-b border-white">Get in touch</a>
		</div> */}

        {/* <img src="https://images.unsplash.com/photo-1490129375591-2658b3e2ee50?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2244&q=80" className="w-full h-full absolute inset-0 object-cover opacity-70" /> */}
      </div>
      <Category category={category} />
      <div className='grid grid-cols-1 sm:grid-cols-2 '>
        <div className='bg-white p-24 flex justify-end items-center'>
          <img
            src='https://images.unsplash.com/photo-1501631259223-89d4e246ed23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1960&q=80'
            className='max-w-md'
          />
        </div>
        
        <div className='bg-gray-100 py-12 px-24 flex justify-start items-center'>
          <div className='max-w-md'>
            <div className='w-24 h-2 bg-yellow-800 mb-4'></div>
            <h2 className='font-display font-bold text-4xl leading-normal mb-6'>
              다람쥐굴엔
              <br />
              <span className='text-yellow-800'>다양한 종류</span>의
              <br /> 먹을거리가 있어요.
            </h2>
            <p className='font-light text-gray-600 mb-6 leading-relaxed'>
              세상에는 다양한 사람이 있는만큼 관심사도 많죠!! <br />
              다람쥐굴에서 관심사를 공유해보세요!!
            </p>
            <Link
              href='/category'
              className='inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-8 hover:bg-yellow-800 hover:text-white'
            >
              카테고리 보러가기
            </Link>
          </div>
        </div>
        <div className='bg-gray-100 py-12 pr-12 flex justify-end items-center'>
          <div className='max-w-md'>
            <div className='w-24 h-2 bg-yellow-800 mb-4 '></div>
            <h2 className='font-display font-bold text-4xl leading-normal  mb-6'>
              다람쥐굴에
              <br />
              <span className='text-yellow-800'>먹을거리</span>를
              <br /> 가져와 주세요.
            </h2>
            <p className='font-light text-gray-600 mb-6 leading-relaxed'>
              다람쥐굴은 여러분들의 노력으로 만들어져요. <br />
              먹을거리를 채워넣고, 카테고리를 추가해주세요!!
            </p>
            <Link
              href='/register'
              className='inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-8 hover:bg-yellow-800 hover:text-white'
            >
              가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
