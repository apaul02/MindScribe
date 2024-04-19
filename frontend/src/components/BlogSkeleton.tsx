import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
  return <div>
     <div className="border border-slate-200 pb-4 border-t-0 border-x-0 p-5 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        <div className="flex justify-center flex-col">
        <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        </div>
        <div className="font-normal text-sm flex flex-col justify-center pl-2 font-extralight ">
          
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="pl-2 flex flex-col justify-center font-light text-sm">
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        </div> 
      </div>
      <div className="text-xl font-semibold pt-2">
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
      </div>
      <div className="text-md font-light">
      <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
      </div>
      <div className="text-slate-500 text-sm font-thin pt-4">
      <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
      </div>
    </div>


  </div>
}