'use client'

import { signOut } from "next-auth/react"

signOut

export default function LogoutBtn() {
    return (<button className="text-sm font-semibold leading-6 text-gray-900" onClick={() => { signOut() }}> Log out
    <span aria-hidden="true">&rarr;</span>
    </button>)
}