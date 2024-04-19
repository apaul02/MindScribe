import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const Fullblog = ({blog}: {blog :Blog}) => {
  return<div>
    <Appbar /> 
    <div className="grid grid-cols-12 px-10 py-10">
      <div className="col-span-8">
        <div className="text-5xl font-bold">
          {blog.title}
        </div>
        <div className="pt-5 text-lg text-slate-500">
          Posted on Auguest 24, 2023
        </div>
        <div className="pt-5 text-xl text-slate-700">
        {blog.content}
        </div>
      </div>
      
      <div className="col-span-4">
        <div className="text-lg p-3">
          Author
        </div>
        <div className="flex">
          <Avatar name={blog.author.name || "User"} size="big" />
          <div className="felx flex-col justify-center font-semibold text-xl px-5">
            {blog.author.name || "User"}
          </div>
        </div>
      </div>      
    </div>
  </div>
}