'use client'

import { signOut } from "next-auth/react"

signOut

export default function LogoutBtn() {
    return (<button className="text-sm font-semibold leading-6 text-white " onClick={() => { signOut() }}> 로그아웃
    <span aria-hidden="true">&rarr;</span>
    </button>)
}