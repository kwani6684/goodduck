
import "./globals.css";

import { Inter } from "next/font/google";
import Link from "next/link";

import DropMenu from "./components/dropmenu";

const inter = Inter({ subsets: ["latin"] });

export interface MenuProps{
  name: string;
  href: string;
}


const navigation:MenuProps[] = [
  { name: "Category", href: "/category" },
  { name: "Write", href: "/write" },
  { name: "Lists", href: "/lists" },
  { name: "Mypage", href: "/mypage" },
];



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
        <nav className=" flex justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </Link>
          </div>
          
          <div className=" flex lg:hidden">
            <DropMenu menu={navigation} />
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        
        {children}
      </body>
    </html>
  );
}
