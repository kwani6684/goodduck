'use client';
import { signIn } from 'next-auth/react';

export default function LoginBtn() {
  return (
    <button
      className='text-sm font-semibold leading-6 text-white '
      onClick={() => {
        signIn();
      }}
    >
      {' '}
      로그인
      <span aria-hidden='true'>&rarr;</span>
    </button>
  );
}
