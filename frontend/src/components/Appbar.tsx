import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
  return <div className="flex justify-between border-b px-10 py-4">
    <Link to={"/blogs"} className="flex justify-center flex-col cursor-pointer font-serif text-xl">
      MindScribe
    </Link>
    <div>
      <Link to={`/publish`}>
        <button type="button" className=" mr-8 text-white bg-green-700 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Create</button>
    </Link>
      <Avatar size={"big"} name="Ankan" />
    </div>
  </div>
}