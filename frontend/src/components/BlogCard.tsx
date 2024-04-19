import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName :string;
  title :string;
  content :string;
  published :string,
  id: number
}


export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  published
}:BlogCardProps) => {
  return<Link to={`/blog/${id}`}> 
    <div className="border border-slate-200 pb-4 border-t-0 border-x-0 p-5 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <Avatar name={authorName} />
        </div>
        <div className="font-normal text-sm flex flex-col justify-center pl-2 font-extralight ">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="pl-2 flex flex-col justify-center font-light text-sm">
          {published}
        </div> 
      </div>
      <div className="text-xl font-semibold pt-2">
        {title}
      </div>
      <div className="text-md font-light">
        {content.slice(0, 100) + "....."}
      </div>
      <div className="text-slate-500 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
    </div>
  </Link>
}

export function Circle( ) {
  return <div className="w-1 h-1 rounded-full bg-slate-400">

  </div>
}

export function Avatar({name, size="small" }: {name : string, size? : "small" | "big"}) {
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-slate-300 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"} `}>
      <span className={`font-light text-black ${size === "small" ? "text-sm": "text-md" } `}>
        {name[0]}
      </span>
  </div>
  
}