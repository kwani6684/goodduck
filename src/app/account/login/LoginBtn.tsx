
'use client';
import { signIn } from 'next-auth/react'

export default function LoginBtn() {
    return (<button className="text-sm font-semibold leading-6 text-gray-900" onClick={() => { signIn() }}> Log in
    <span aria-hidden="true">&rarr;</span>
    </button>)
} 