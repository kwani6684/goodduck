"use client";
import Link from "next/link";
import { MenuProps } from "../layout";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import LogoutBtn from "../account/login/LogoutBtn";
import LoginBtn from "../account/login/LoginBtn";

const DropMenu = ({ menu, session }: { menu: MenuProps[]; session: any }) => {
  let [view, setView] = useState(false);

  return (
    <div className={view ? "text-right" : "flex flex-col "}>
      <button
        type="button"
        className={
          view
            ? "border-4 border-yellow-600 -m-2.5 inline-flex justify-end rounded-md p-2.5 text-gray-700"
            : " -m-2.5 inline-flex justify-end rounded-md p-2.5 text-gray-700"
        }
        onClick={() => {
          setView(!view);
        }}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>
      {view && (
        <div className="flex flex-col mt-4 ">
          {menu.map((item) => (
            <Link key={item.name} href={item.href} className="border-b-4 border-yellow-600 text-sm font-semibold leading-6 text-white py-3">
              {item.name}
            </Link>
          ))}
          <span className="border-b-4 border-yellow-600 text-sm font-semibold leading-6 text-white py-3">
            {session ? <LogoutBtn /> : <LoginBtn />}
          </span>
        </div>
      )}
    </div>
  );
};
const MenuList = () => {};
export default DropMenu;
