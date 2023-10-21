"use client";

import Link from "next/link";
import { PostType } from "./page";
import axios from "axios";
export default function ListItem(props: PostType) {
  return (
    <div className="list transition-all duration-700">
      <Link href={`../detail/${props._id}`}>
        <article className="flex group  rounded-lg bg-emerald-100 shadow-lg px-4 pb-4 max-w-xl flex-col hover:bg-emerald-400 hover:shadow-2xl items-start justify-between">
          <div className="relative">
          <p className="mt-5 line-clamp-3 text-sm leading-6  text-gray-600">{props.category}</p>

            <h3 className="mt-3 text-lg font-semibold leading-6  text-gray-900 group-hover:text-gray-600">{props.title}</h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6  text-gray-600">{props.content}</p>
            <p className="mt-3 line-clamp-3 text-sm leading-6  text-gray-800">{props.writer}</p>
            {/* date 추가해야댐 */}
          </div>
        </article>
      </Link>
      <button
        onClick={(e) => {
          const parentElement = e.currentTarget.parentElement;
          fetch("api/deleteContent", { method: "DELETE", body: props._id }).then((response) => {
            if (response.ok) {
              if (parentElement) {
                parentElement.style.opacity = "0";
                setTimeout(() => {
                  parentElement.style.display = "none";
                }, 700);
              }
            }
            else {
              alert("권한이 엄슴")
            }
          });
        }}
      >
        🗑️
      </button>
    </div>
  );
}
